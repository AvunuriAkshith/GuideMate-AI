import { useTheme }
from "../context/ThemeContext";

export default function ThemeToggle(){

    const {
        darkMode,
        toggleTheme
    } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition"
        >

            {
                darkMode
                ? "☀ Light"
                : "🌙 Dark"
            }

        </button>
    );
}