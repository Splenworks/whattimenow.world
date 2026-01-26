import { Link } from "react-router-dom"

export function Privacy() {
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
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
          WhatTimeNow.world is a simple world clock tool.
        </p>
        <div className="mt-6 space-y-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
          <p>
            We do not require user accounts and do not collect personally identifiable information.
          </p>
          <p>
            We may use third-party advertising services such as Google AdSense. These services may
            use cookies or similar technologies to display ads based on visits to this and other
            websites.
          </p>
          <p>
            Google’s use of advertising cookies enables it and its partners to serve ads to users
            based on their visit to this site and/or other sites on the Internet.
          </p>
          <p>Users may opt out of personalized advertising by visiting Google Ads Settings.</p>
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
