import { FooterLink } from "./FooterLink"

export function Footer() {
  return (
    <footer className="mt-2 border-t border-gray-200 bg-gray-100/80 dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto w-full p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()}{" "}
          <FooterLink to="https://splenworks.com" target="_blank" rel="noopener noreferrer">
            Splenworks
          </FooterLink>{" "}
          Inc.
        </p>
      </div>
    </footer>
  )
}
