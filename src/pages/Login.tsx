import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, type LoginSchema } from "../hooks/useAuth";
import { Mail, Eye } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate, isPending, error } = useLogin();

  const onSubmit = (data: LoginSchema) => {
    mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        navigate("/");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-twitter-bg)] text-white px-4">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold mb-10 tracking-tight">Mini Twitter</h1>

        {/* Tabs */}
        <div className="w-full flex border-b border-[var(--color-twitter-border)] mb-8">
          <Link
            to="/login"
            className="flex-1 text-center py-3 text-sm font-semibold text-white border-b-2 border-[var(--color-twitter-primary)]"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="flex-1 text-center py-3 text-sm font-semibold text-gray-500 hover:text-gray-300 transition-colors"
          >
            Cadastrar
          </Link>
        </div>

        {/* Welcome Text */}
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold mb-2">Olá, de novo!</h2>
          <p className="text-gray-400 text-sm">Por favor, insira os seus dados para fazer login.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              E-mail
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="Insira o seu e-mail"
                {...register("email")}
                className="w-full pl-3 pr-10 py-2.5 bg-[var(--color-twitter-surface)] border border-[var(--color-twitter-border)] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-twitter-primary)] focus:ring-1 focus:ring-[var(--color-twitter-primary)] transition-colors text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type="password"
                placeholder="Insira a sua senha"
                {...register("password")}
                className="w-full pl-3 pr-10 py-2.5 bg-[var(--color-twitter-surface)] border border-[var(--color-twitter-border)] rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-twitter-primary)] focus:ring-1 focus:ring-[var(--color-twitter-primary)] transition-colors text-sm"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Eye className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error.response?.data?.message || "Ocorreu um erro ao fazer login"}
            </p>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2.5 px-4 bg-[var(--color-twitter-primary)] hover:bg-[var(--color-twitter-primary-hover)] text-white font-semibold rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-twitter-primary)] focus:ring-offset-[var(--color-twitter-bg)] transition-colors disabled:opacity-50 text-sm"
            >
              {isPending ? "Aguarde..." : "Continuar"}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs text-center text-gray-500 px-4">
          Ao clicar em continuar, você concorda com nossos{" "}
          <a href="#" className="underline hover:text-gray-300 transition-colors">Termos de Serviço</a> e{" "}
          <a href="#" className="underline hover:text-gray-300 transition-colors">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
}
