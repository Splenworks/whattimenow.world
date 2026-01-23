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
        "cursor-pointer rounded-md absolute top-1 right-2 p-1",
        "text-gray-400 transition hover:bg-white hover:text-gray-700",
        "pointer-events-none opacity-0",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        "focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-gray-300",
        className,
      )}
    >
      <XIcon size={12} />
    </button>
  )
}
