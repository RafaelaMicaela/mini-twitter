import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import { useState } from "react";
import CreatePostForm from "../components/CreatePostForm";
import ThemeSwitcher from "../components/ThemeSwitcher";

export default function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, error } = usePosts(page, search);
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    });
  };

  return (
    <div className="container p-4 mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Home</h1>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>

      <CreatePostForm />

      <div className="my-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 dark:text-gray-100"
        />
      </div>

      {isLoading && <p className="text-gray-900 dark:text-gray-100">Loading posts...</p>}
      {error && <p className="text-red-500">Error loading posts</p>}

      <div>
        {data?.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-between my-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-900 dark:text-gray-100">Page {page} of {data?.totalPages}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === data?.totalPages}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
