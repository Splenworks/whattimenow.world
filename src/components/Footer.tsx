import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="mt-4 border-t border-gray-100 dark:border-gray-800">
      <div className="mx-auto w-full space-y-6 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
            Popular time comparisons
          </h2>
          <ul className="flex flex-wrap justify-center gap-2">
            <li>
              <Link
                to="/los-angeles/seoul"
                className="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
              >
                Los Angeles • Seoul
              </Link>
            </li>
            <li>
              <Link
                to="/new-york/paris"
                className="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
              >
                New York • Paris
              </Link>
            </li>
            <li>
              <Link
                to="/san-francisco/tokyo/singapore"
                className="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
              >
                San Francisco • Tokyo • Singapore
              </Link>
            </li>
            <li>
              <Link
                to="/london/mumbai/dubai"
                className="rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-600 transition hover:border-gray-300 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-gray-100"
              >
                London • Mumbai • Dubai
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 text-sm justify-center md:items-center">
          <p className="space-x-4">
            <Link
              to="/about"
              className="hover:text-gray-700 hover:underline dark:hover:text-gray-300"
            >
              About
            </Link>
            <Link
              to="/privacy"
              className="hover:text-gray-700 hover:underline dark:hover:text-gray-300"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="hover:text-gray-700 hover:underline dark:hover:text-gray-300"
            >
              Terms
            </Link>
            <Link
              to="https://github.com/Splenworks/whattimenow.world"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-gray-700 dark:hover:text-gray-300"
            >
              Open Source
            </Link>
          </p>
          <p>&copy; {new Date().getFullYear()} <Link to="https://splenworks.com" target="_blank" className="hover:underline hover:text-gray-700 dark:hover:text-gray-300">Splenworks</Link> Inc.</p>
        </div>
      </div>
    </footer>
  )
}
