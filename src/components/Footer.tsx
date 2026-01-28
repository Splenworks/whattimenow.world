import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer>
      <div className="mx-auto w-full pt-6 pb-6 space-y-3 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Splenworks Inc.
        </p>
        <p>
          <Link to="/about" className="hover:underline hover:text-gray-700 dark:hover:text-gray-300">
            About
          </Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">•</span>
          <Link to="/privacy" className="hover:underline hover:text-gray-700 dark:hover:text-gray-300">
            Privacy
          </Link>
          <span className="mx-2 text-gray-400 dark:text-gray-600">•</span>
          <Link to="/terms" className="hover:underline hover:text-gray-700 dark:hover:text-gray-300">
            Terms
          </Link>
          {/* <span className="mx-2 text-gray-400 dark:text-gray-600">•</span>
          <Link
            to="https://github.com/Splenworks/whattimenow.world"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-700 dark:hover:text-gray-300"
          >
            Open Source
          </Link> */}
        </p>
      </div>
    </footer>
  )
}
