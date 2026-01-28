import { Link } from "react-router-dom"
import { useScrollToTop } from "../hooks/useScrollToTop"

export function PrivacyPage() {
  useScrollToTop()

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto w-full max-w-180 px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            ← Back to app
          </Link>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          WhatTimeNow.World is a simple world clock tool.
        </p>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
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
              className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
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
