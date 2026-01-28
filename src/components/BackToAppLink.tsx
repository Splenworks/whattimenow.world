import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export function BackToAppLink() {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
    >
      <ArrowLeft
        size={14}
        className="text-gray-500 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-100"
      />
      Back to app
    </Link>
  )
}
