import { BackToAppLink } from "../components/BackToAppLink"
import { useScrollToTop } from "../hooks/useScrollToTop"

export function TermsPage() {
  useScrollToTop()

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto w-full max-w-180 px-4 py-10">
        <div className="mb-6">
          <BackToAppLink />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          WhatTimeNow.World provides a simple world clock tool for personal and informational use.
        </p>
        <div className="mt-6 space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
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
