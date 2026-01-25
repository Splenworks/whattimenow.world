import { ArrowRight } from "lucide-react"
import { twMerge } from "tailwind-merge"

type NowButtonProps = {
  onClick: () => void
  className?: string
}

export function NowButton({ onClick, className }: NowButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={twMerge(
        "-mr-1 inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1",
        "text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-300",
        "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100",
        "duration-1600ms transition-opacity ease-in-out",
        "focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none dark:focus-visible:ring-gray-600",
        className,
      )}
    >
      <span>Now</span>
      <ArrowRight size={12} className="text-gray-400 dark:text-gray-500" />
    </button>
  )
}
