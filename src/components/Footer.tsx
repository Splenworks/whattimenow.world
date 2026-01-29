import { Link } from "react-router-dom"
import { PillLink } from "./PillLink"

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
              <PillLink to="/los-angeles/seoul">Los Angeles • Seoul</PillLink>
            </li>
            <li>
              <PillLink to="/new-york/paris">New York • Paris</PillLink>
            </li>
            <li>
              <PillLink to="/san-francisco/tokyo/singapore">
                San Francisco • Tokyo • Singapore
              </PillLink>
            </li>
            <li>
              <PillLink to="/london/mumbai/dubai">London • Mumbai • Dubai</PillLink>
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
