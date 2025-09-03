import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  user_id: number;
  email: string;
  name: string;
  roles: string[];
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, name?: string, email?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

/*const decodeToken = (token: string): { user_id: number } | null => {
  try {
    return jwtDecode<{ user_id: number }>(token);
  } catch {
    return null;
  }
};*/

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

  const decodeToken = (t: string): { user_id: number; email?: string; name?: string } | null => {
    try { return jwtDecode(t); } catch { return null; }
  };

  const login = async (newToken: string, name?: string, email?: string) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);

  const decoded = decodeToken(newToken);
    if (decoded?.user_id) {
      setUser({
        user_id: decoded.user_id,
        name: name ?? decoded.name ?? "Usuário",
        email: email ?? decoded.email ?? "",
        roles: [],
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    if (stored && !isTokenExpired(stored)) {
      setToken(stored);
      const d = decodeToken(stored);
      if (d?.user_id) {
        setUser({
          user_id: d.user_id,
          name: d.name ?? "Usuário",
          email: d.email ?? "",
          roles: [],
        });
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
