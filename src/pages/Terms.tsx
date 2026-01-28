import { Link } from "react-router-dom"

export function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to app
          </Link>
        </div>
        <h1 className="text-3xl font-semibold">Terms of Service</h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          WhatTimeNow.world provides a simple world clock tool for personal and informational use.
        </p>
        <div className="mt-6 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
          <p>
            By using this site, you agree to use it lawfully and not to attempt to disrupt or
            interfere with its operation.
          </p>
          <p>
            The service is provided "as is" without warranties of any kind. We may update or change
            the service at any time.
          </p>
          <p>
            This site may display third-party advertisements, which are governed by those providers'
            terms and policies.
          </p>
          <p>
            If you have questions, reach out at{" "}
            <a
              href="mailto:roylory@gmail.com"
              className="underline decoration-gray-300 underline-offset-2 hover:text-gray-900 dark:hover:text-gray-100"
            >
              roylory@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
