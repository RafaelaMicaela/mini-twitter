import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { z } from "zod";

export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    name: string;
  };
  createdAt: string;
  likesCount: number;
};

type GetPostsResponse = {
  posts: Post[];
  totalPages: number;
};

const getPosts = async (page = 1, search = "") => {
  const token = localStorage.getItem("token");
  const response = await api.get<GetPostsResponse>("/posts", {
    params: {
      page,
      search,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const usePosts = (page = 1, search = "") => {
  return useQuery({
    queryKey: ["posts", page, search],
    queryFn: () => getPosts(page, search),
  });
};

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

const createPost = async (data: CreatePostSchema) => {
  const token = localStorage.getItem("token");
  const response = await api.post("/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => {
      const token = localStorage.getItem("token");
      return api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

const updatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().url().optional().or(z.literal("")),
});

export type UpdatePostSchema = z.infer<typeof updatePostSchema>;

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      postId,
      data,
    }: {
      postId: string;
      data: UpdatePostSchema;
    }) => {
      const token = localStorage.getItem("token");
      return api.put(`/posts/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: string) => {
      const token = localStorage.getItem("token");
      return api.post(
        `/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
