import axiosInstance from "./axios";

interface Usuario {
  ct_correo: string;
  ct_clave: string;
}

export const login = async (usuario: Usuario) => {
  return await axiosInstance.post("/login", usuario);
};

export const recargarToken = async (token?: string) =>
  axiosInstance.get("/verify");

export const getDatosUsuario = async () => axiosInstance.get("/profile");

export const logoutRequest = async () => axiosInstance.post("/logout");
