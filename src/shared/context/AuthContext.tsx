import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
    user_id: number;
    email: string;
    roles: string[];
};

type AuthContextType = {
    token: string | null;
    user: User | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const decodeToken = (token: string): User | null => {
    try {
        return jwtDecode<User>(token);
    } catch (error) {
        console.error("Erro ao decodificar token:", error);
        return null;
    }
};

const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = jwtDecode<{ exp: number }>(token);
        return !exp || exp * 1000 < Date.now();
    } catch (error) {
        console.error("Erro ao verificar expiração do token:", error);
        return true;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken && !isTokenExpired(storedToken)) {
            const decoded = decodeToken(storedToken);
            if (decoded) {
                setToken(storedToken);
                setUser(decoded);
            } else {
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (newToken: string) => {
        if (!isTokenExpired(newToken)) {
            localStorage.setItem("token", newToken);
            setToken(newToken);
            const decoded = decodeToken(newToken);
            if (decoded) {
                setUser(decoded);
            } else {
                logout();
            }
        } else {
            console.warn("Token recebido já está expirado.");
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

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
