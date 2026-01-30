import { PillLink } from "../ui/PillLink"
import { FooterLink } from "../FooterLink"

export function Footer() {
  return (
    <footer className="mt-4 border-t border-gray-200 bg-gray-100/80 dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto w-full space-y-6 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="space-y-3">
          <h2 className="text-xs font-semibold tracking-wide text-gray-600 uppercase dark:text-gray-400">
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
        <div className="flex flex-col justify-center gap-1 md:flex-row md:items-center md:gap-4">
          <p className="space-x-4">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/terms">Terms</FooterLink>
            <FooterLink
              to="https://github.com/Splenworks/whattimenow.world"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Source
            </FooterLink>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()}{" "}
            <FooterLink to="https://splenworks.com" target="_blank" rel="noopener noreferrer">
              Splenworks
            </FooterLink>{" "}
            Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
