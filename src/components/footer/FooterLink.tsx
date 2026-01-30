import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type FooterLinkProps = {
  to: string
  target?: string
  rel?: string
  children: React.ReactNode
  className?: string
}

export function FooterLink({ to, target, rel, children, className }: FooterLinkProps) {
  return (
    <Link
      to={to}
      target={target}
      rel={rel}
      className={twMerge(
        "text-sm text-gray-600 hover:text-gray-700 hover:underline dark:text-gray-400 dark:hover:text-gray-300",
        className,
      )}
    >
      {children}
    </Link>
  )
}
