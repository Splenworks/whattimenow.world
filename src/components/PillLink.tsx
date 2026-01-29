import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type PillLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
}

export function PillLink({ to, children, className }: PillLinkProps) {
  return (
    <Link
      to={to}
      className={twMerge(
        "rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100",
        className,
      )}
    >
      {children}
    </Link>
  )
}
