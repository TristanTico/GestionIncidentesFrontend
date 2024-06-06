import React, { useEffect, createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { login, recargarToken } from "../api/auth.api";

interface Usuario {
  ct_correo: string;
  ct_clave: string;
}

interface AuthContextProps {
  usuario: Usuario | null;
  signin: (usuario: Usuario) => Promise<any>;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  nombrePrueba: string;
  correo : string
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [nombrePrueba, setNombrePrueba] = useState("");
  const [correo, setCorreo] = useState("");

  const signin = async (usuario: Usuario): Promise<any> => {
    try {
      const res = await login(usuario);
      console.log(res);
      setUsuario(res.data);
      setNombrePrueba(res.data.nombre);
      setCorreo(res.data.correo);
      setIsAuthenticated(true);
      console.log("Login isAuthenticated: ", isAuthenticated);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkLogin = async (): Promise<void> => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await recargarToken(token);
        if (!res.data) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
          setUsuario(res.data);
          console.log("Token refresh response: ", res.data);
          setNombrePrueba(res.data.nombre);
          setCorreo(res.data.correo);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUsuario(null);
    setIsAuthenticated(false);
    setNombrePrueba("");
    setCorreo("");
  };

  return (
    <AuthContext.Provider
      value={{
        signin,
        usuario,
        isAuthenticated,
        loading,
        logout,
        nombrePrueba,
        correo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
