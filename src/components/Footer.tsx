import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full pt-6 pb-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          <Link to="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  )
}
