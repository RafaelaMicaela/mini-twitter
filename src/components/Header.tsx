import { Search, LogOut } from "lucide-react";
import { useLogout } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;
  showSearch?: boolean;
}

export default function Header({ search, setSearch, showSearch = true }: HeaderProps) {
  const navigate = useNavigate();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      onError: () => {
        // Fallback in case of server error
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-twitter-bg)] border-b border-[var(--color-twitter-border)]">
      <div className="flex items-center justify-between h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0 flex items-center w-1/4">
          <h1 className="text-xl font-bold text-white tracking-tight">Mini Twitter</h1>
        </div>

        {/* Center: Search */}
        {showSearch && (
          <div className="flex-1 flex justify-center w-2/4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Buscar por post..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-transparent rounded bg-[var(--color-twitter-surface)] text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--color-twitter-primary)] focus:border-transparent transition-all"
              />
            </div>
          </div>
        )}

        {/* Right: Actions */}
        <div className="flex-shrink-0 flex items-center justify-end w-1/4">
          <button
            onClick={handleLogout}
            className="p-2 ml-4 text-gray-400 hover:text-white hover:bg-[var(--color-twitter-surface)] rounded-full transition-colors flex items-center justify-center border border-[var(--color-twitter-border)]"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
