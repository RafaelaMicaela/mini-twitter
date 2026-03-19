import { useState } from "react";
import type { Post } from "../hooks/usePosts";
import { format } from "date-fns";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useDeletePost, useLikePost } from "../hooks/usePosts";
import Modal from "./Modal";
import EditPostForm from "./EditPostForm";
import { Heart, Edit2, Trash2 } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { userId } = useCurrentUser();
  const { mutate: deletePost } = useDeletePost();
  const { mutate: likePost } = useLikePost();

  const isAuthor = userId === post.author.id;
  const username = `@${post.author.name.toLowerCase().replace(/\s/g, '')}`;

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleLike = () => {
    likePost(post.id);
  };

  return (
    <>
      <div className="p-4 bg-[var(--color-twitter-surface)] border border-[var(--color-twitter-border)] rounded-xl flex flex-col hover:border-gray-700 transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm">
            <span className="font-bold text-white">{post.author.name}</span>
            <span className="text-gray-500">{username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {format(new Date(post.createdAt), "dd/MM/yyyy")}
            </span>
          </div>

          {/* Actions for Author */}
          {isAuthor && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-gray-500 hover:text-white p-1 rounded-full hover:bg-[var(--color-twitter-bg)] transition-colors"
                title="Editar post"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-[var(--color-twitter-bg)] transition-colors"
                title="Excluir post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <h3 className="text-base font-bold text-white mb-2">{post.title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed max-w-none break-words mb-4 whitespace-pre-wrap">
          {post.content}
        </p>

        {/* Image */}
        {post.imageUrl && (
          <div className="mb-4 rounded-xl overflow-hidden border border-[var(--color-twitter-border)]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover max-h-[400px]" />
          </div>
        )}

        {/* Footer (Like button) */}
        <div className="flex items-center">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 group focus:outline-none"
          >
            <div className="p-1.5 rounded-full group-hover:bg-red-500/10 transition-colors">
              <Heart
                className={`w-5 h-5 transition-colors ${
                  post.likesCount > 0
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500 group-hover:text-red-500"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditPostForm post={post} onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </>
  );
}
