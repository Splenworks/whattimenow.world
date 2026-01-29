import { PlusIcon } from "lucide-react"
import { twMerge } from "tailwind-merge"

type AddButtonProps = {
  onClick: () => void
  className?: string
}

export function AddButton({ onClick, className }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "cursor-pointer rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 dark:focus-visible:ring-gray-600",
        className,
      )}
    >
      <PlusIcon size={16} />
    </button>
  )
}
