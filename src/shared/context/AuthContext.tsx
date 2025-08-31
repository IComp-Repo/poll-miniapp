import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  user_id: number;
  email: string;
  roles: string[];
}

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, refresh_token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode<User>(token);
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

  const login = (newToken: string, refresh_token: string) => {
    sessionStorage.setItem("token", newToken);
    sessionStorage.setItem("refresh_token", refresh_token);
    setToken(newToken);
    const decoded = decodeToken(newToken);
    if (decoded) setUser(decoded);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refresh_token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      const decoded = decodeToken(storedToken);
      if (decoded) setUser(decoded);
    } else {
      const storedRefreshToken = sessionStorage.getItem("refresh_token");
      if (storedRefreshToken) {
        fetch("auth/token/refresh/", {
          method: "POST",
          body: JSON.stringify({ refresh_token: storedRefreshToken }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.token) login(data.token, storedRefreshToken);
            else logout();
          })
          .catch(() => logout());
      } else {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        const decoded = decodeToken(token);
        if (decoded) setUser(decoded);
        else logout();
      }
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
