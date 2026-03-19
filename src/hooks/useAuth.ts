import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { z } from "zod";
import { AxiosError } from "axios";

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

const registerUser = async (data: RegisterSchema) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const useRegister = () => {
  return useMutation<unknown, AxiosError<{ message: string }>, RegisterSchema>({
    mutationFn: registerUser,
  });
};

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginSchema = z.infer<typeof loginSchema>;

const loginUser = async (data: LoginSchema) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const useLogin = () => {
  return useMutation<
    { token: string },
    AxiosError<{ message: string }>,
    LoginSchema
  >({
    mutationFn: loginUser,
  });
};

export const useLogout = () => {
  const token = localStorage.getItem("token");
  return useMutation<unknown, AxiosError<{ message: string }>>({
    mutationFn: () =>
      api.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ),
  });
};
