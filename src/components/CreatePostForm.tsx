import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePost, type CreatePostSchema } from "../hooks/usePosts";
import { Image as ImageIcon } from "lucide-react";

const createPostSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  content: z.string().min(1, "O conteúdo é obrigatório"),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
});

export default function CreatePostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });
  const { mutate, isPending } = useCreatePost();

  const onSubmit = (data: CreatePostSchema) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-[var(--color-twitter-surface)] border border-[var(--color-twitter-border)] rounded-xl flex flex-col"
    >
      <input
        type="text"
        placeholder="Título do post"
        {...register("title")}
        className="w-full bg-transparent text-white font-bold placeholder-gray-500 outline-none mb-2"
      />
      {errors.title && (
        <p className="text-xs text-red-500 mb-2">{errors.title.message}</p>
      )}

      <textarea
        placeholder="E aí, o que está rolando?"
        {...register("content")}
        className="w-full bg-transparent text-gray-300 text-sm placeholder-gray-500 outline-none resize-none min-h-[60px]"
      />
      {errors.content && (
        <p className="text-xs text-red-500 mb-2">{errors.content.message}</p>
      )}

      <div className="w-full h-px bg-[var(--color-twitter-border)] my-3"></div>

      <div className="flex items-center justify-between w-full">
        <div className="flex-1 flex items-center pr-4">
          <ImageIcon className="h-5 w-5 text-[var(--color-twitter-primary)] mr-2 shrink-0" />
          <input
            type="text"
            placeholder="URL da imagem (opcional)"
            {...register("imageUrl")}
            className="w-full bg-transparent text-xs text-gray-400 placeholder-gray-600 outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-1.5 shrink-0 bg-[var(--color-twitter-primary)] hover:bg-[var(--color-twitter-primary-hover)] text-white text-sm font-bold rounded-full disabled:opacity-50 transition-colors"
        >
          {isPending ? "..." : "Postar"}
        </button>
      </div>
      {errors.imageUrl && (
        <p className="mt-2 text-xs text-red-500">{errors.imageUrl.message}</p>
      )}
    </form>
  );
}
