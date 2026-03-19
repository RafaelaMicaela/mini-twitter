import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import { useState } from "react";
import CreatePostForm from "../components/CreatePostForm";
import Header from "../components/Header";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePosts(page, search);

  return (
    <div className="min-h-screen bg-[var(--color-twitter-bg)] text-white">
      <Header search={search} setSearch={setSearch} />
      
      <main className="max-w-2xl mx-auto pt-6 px-4 pb-20">
        <CreatePostForm />

        {/* Posts Status */}
        {isLoading && <p className="text-gray-400 mt-4 text-center">Carregando posts...</p>}
        {error && <p className="text-red-500 mt-4 text-center">Erro ao carregar posts</p>}

        {/* Posts Feed */}
        <div className="mt-6 flex flex-col gap-4">
          {data?.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {data?.totalPages && data.totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 mr-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors focus:outline-none"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => {
              if (p === 1 || p === data.totalPages || (p >= page - 1 && p <= page + 1)) {
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all focus:outline-none ${
                      page === p
                        ? "bg-[var(--color-twitter-primary)] text-white shadow-[0_0_12px_rgba(8,160,247,0.5)]"
                        : "text-gray-400 hover:text-white hover:bg-[var(--color-twitter-surface)]"
                    }`}
                  >
                    {p}
                  </button>
                );
              }
              if (p === page - 2 || p === page + 2) {
                return (
                  <span key={p} className="text-gray-600 px-1">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="p-2 ml-2 text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors focus:outline-none"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
