import { BackToAppLink } from "../components/BackToAppLink"
import { useScrollToTop } from "../hooks/useScrollToTop"

export function AboutPage() {
  useScrollToTop()

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <div className="mx-auto w-full max-w-180 px-4 py-10">
        <div className="mb-6">
          <BackToAppLink />
        </div>

        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">About WhatTimeNow.World</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A simple tool for comparing time across multiple cities at a glance.
          </p>
        </header>

        <section className="space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
          <p>
            <span className="font-medium">WhatTimeNow.World</span> is a simple tool for comparing
            time across multiple cities at a glance.
          </p>
          <p>
            It is designed for people who regularly coordinate across time zones—remote teams,
            international families, and frequent travelers—who want to understand time differences
            visually without doing mental calculations or switching between multiple pages.
          </p>
        </section>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Why this exists</h2>
          <div className="space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            <p>
              Time zone differences are easy to calculate but surprisingly hard to{" "}
              <span className="font-medium">feel</span>.
            </p>
            <p>
              Many existing tools focus on single conversions or present time as static numbers. In
              practice, planning across regions often involves questions like:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-gray-800 dark:text-gray-200">
              <li>What time will this be later today?</li>
              <li>Who will be asleep or working?</li>
              <li>How do multiple cities line up over the course of a day?</li>
            </ul>
            <p>
              WhatTimeNow.World approaches this as a visual comparison problem rather than a numeric
              one, prioritizing clarity, speed, and ease of use.
            </p>
          </div>
        </section>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">What it does</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            <li>Compare current time across multiple cities simultaneously</li>
            <li>Visualize past and future time differences throughout the day</li>
            <li>Share a specific time comparison via a simple URL</li>
            <li>Work without accounts or setup</li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">What it doesn’t do</h2>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            <li>Track users</li>
            <li>Require sign-ups</li>
            <li>Store personal data</li>
            <li>Perform background data collection</li>
          </ul>
          <p className="text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            The tool is intentionally lightweight and focused.
          </p>
        </section>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Philosophy</h2>
          <p className="text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            WhatTimeNow.World is built as an independent utility with an emphasis on:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            <li>Clear visual representation</li>
            <li>Minimal interface and distractions</li>
            <li>Fast loading and predictable behavior</li>
          </ul>
          <p className="text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            It aims to be a practical, everyday tool rather than a full-featured scheduling
            platform.
          </p>
        </section>

        <hr className="my-10 border-gray-200 dark:border-gray-800" />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
          <p className="text-[15px] leading-7 text-gray-800 dark:text-gray-200">
            For questions or feedback, you can reach out at:{" "}
            <a
              className="text-gray-900 underline underline-offset-4 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
              href="mailto:roylory@gmail.com"
            >
              roylory@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
