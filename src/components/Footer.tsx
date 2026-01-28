import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full pt-6 pb-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          <Link to="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Privacy
          </Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">•</span>
          <Link to="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Terms
          </Link>
        </p>
      </div>
    </footer>
  )
}
