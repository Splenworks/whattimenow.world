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
        "cursor-pointer inline-flex items-center gap-1 rounded-md px-2 py-1",
        "text-xs font-semibold tracking-wide text-gray-600 uppercase",
        "hover:bg-gray-100 hover:text-gray-900",
        "focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:outline-none",
        className,
      )}
    >
      <span>Now</span>
      <ArrowRight size={12} className="text-gray-400" />
    </button>
  )
}
