import { XIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"

type CloseButtonProps = {
  onClick: () => void
  className?: string
}

export function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "absolute top-1 right-2 cursor-pointer rounded-md p-1",
        "text-gray-500 transition hover:bg-white hover:text-gray-700 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200",
        "pointer-events-none opacity-0",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-600",
        className,
      )}
    >
      <XIcon size={12} />
    </button>
  )
}
