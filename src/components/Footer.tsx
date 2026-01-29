import { Link } from "react-router-dom"
import { PillLink } from "./PillLink"

export function Footer() {
  return (
    <footer className="mt-4 border-t border-gray-200 bg-gray-100/80 dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto w-full space-y-6 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
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
        <div className="flex flex-col justify-center gap-1 text-sm md:flex-row md:items-center md:gap-4">
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
              className="hover:text-gray-700 hover:underline dark:hover:text-gray-300"
            >
              Open Source
            </Link>
          </p>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link
              to="https://splenworks.com"
              target="_blank"
              className="hover:text-gray-700 hover:underline dark:hover:text-gray-300"
            >
              Splenworks
            </Link>{" "}
            Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
