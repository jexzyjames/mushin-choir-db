import { FaMoon, FaSun } from "react-icons/fa6";
import useTheme from "../context/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="flex h-10 shrink-0 items-center justify-center gap-2 border border-[#C9A24B]/40 px-3 text-[#C9A24B] transition-colors hover:bg-[#C9A24B]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B]"
    >
      {theme === "dark" ? (
        <FaSun aria-hidden="true" />
      ) : (
        <FaMoon aria-hidden="true" />
      )}
      <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-[0.12em] sm:inline">
        {nextTheme} mode
      </span>
    </button>
  );
}
