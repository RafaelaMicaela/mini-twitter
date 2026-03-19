import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreatePost, CreatePostSchema } from "../hooks/usePosts";

const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
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
      className="p-4 my-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Create a new post</h3>
      <div className="mt-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.title && (
          <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          {...register("content")}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.content && (
          <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>
      <div className="mt-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Image URL (optional)
        </label>
        <input
          id="imageUrl"
          type="text"
          {...register("imageUrl")}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        {errors.imageUrl && (
          <p className="mt-2 text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isPending ? "Creating post..." : "Create post"}
        </button>
      </div>
    </form>
  );
}
