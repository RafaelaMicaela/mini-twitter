import { useState } from "react";
import { Post } from "../hooks/usePosts";
import { format } from "date-fns";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useDeletePost, useLikePost } from "../hooks/usePosts";
import Modal from "./Modal";
import EditPostForm from "./EditPostForm";
import { Heart } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userId } = useCurrentUser();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: likePost } = useLikePost();

  const isAuthor = userId === post.author.id;

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleLike = () => {
    likePost(post.id);
  };

  return (
    <>
      <div className="p-4 my-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex items-center mb-2">
          <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{post.author.name}</div>
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(post.createdAt), "dd/MM/yyyy HH:mm")}
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{post.content}</p>
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="mt-4 rounded-lg" />
        )}
        <div className="flex items-center mt-4">
          <button onClick={handleLike} className="flex items-center space-x-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500">
            <Heart size={20} />
            <span>{post.likesCount}</span>
          </button>
          {isAuthor && (
            <div className="ml-auto">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-2 py-1 mr-2 text-sm text-white bg-yellow-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-2 py-1 text-sm text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditPostForm post={post} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </>
  );
}
