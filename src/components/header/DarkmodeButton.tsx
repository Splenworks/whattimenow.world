import { MoonIcon, SunIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { useDarkmode } from "../../hooks/useDarkmode"

type DarkmodeButtonProps = {
  className?: string
}

export function DarkmodeButton({ className }: DarkmodeButtonProps) {
  const { darkMode, toggleDarkMode } = useDarkmode()
  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className={twMerge(
        "cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus-visible:ring-gray-600",
        className,
      )}
    >
      {darkMode ? <SunIcon size={16} /> : <MoonIcon size={16} />}
    </button>
  )
}
