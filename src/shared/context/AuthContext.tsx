import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  user_id: number;
  email: string;
  name: string;
  roles: string[];
  avatar?: string;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const decodeToken = (token: string): { user_id: number } | null => {
  try {
    return jwtDecode<{ user_id: number }>(token);
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async (user_id: number, newToken: string) => {
    try {
      const res = await fetch(`/api/users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar usuário");
      const data = await res.json();

      setUser({
        user_id,
        name: data.name,
        email: data.email,
        roles: data.roles || [],
        avatar: data.avatar,
      });
    } catch (err) {
      console.error(err);
      setUser({ user_id, name: "Usuário", email: "", roles: [] });
    }
  };

  const login = async (newToken: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);

    const decoded = decodeToken(newToken);
    if (decoded?.user_id) {
      await fetchUserData(decoded.user_id, newToken);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      const decoded = decodeToken(storedToken);
      if (decoded?.user_id) {
        fetchUserData(decoded.user_id, storedToken);
      }
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return context;
};
