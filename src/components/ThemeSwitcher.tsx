import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("ThemeSwitcher must be used within a ThemeProvider");
  }

  const { theme, toggleTheme } = context;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 rounded-full hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
