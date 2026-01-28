export function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-180 px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">About WhatTimeNow</h1>
        <p className="mt-2 text-sm text-gray-600">
          A simple tool for comparing time across multiple cities at a glance.
        </p>
      </header>

      <section className="space-y-4 text-[15px] leading-7 text-gray-800">
        <p>
          <span className="font-medium">WhatTimeNow</span> is a simple tool for comparing time
          across multiple cities at a glance.
        </p>
        <p>
          It is designed for people who regularly coordinate across time zones—remote teams,
          international families, and frequent travelers—who want to understand time differences
          visually without doing mental calculations or switching between multiple pages.
        </p>
      </section>

      <hr className="my-10 border-gray-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Why this exists</h2>
        <div className="space-y-4 text-[15px] leading-7 text-gray-800">
          <p>
            Time zone differences are easy to calculate but surprisingly hard to{" "}
            <span className="font-medium">feel</span>.
          </p>
          <p>
            Many existing tools focus on single conversions or present time as static numbers. In
            practice, planning across regions often involves questions like:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-gray-800">
            <li>What time will this be later today?</li>
            <li>Who will be asleep or working?</li>
            <li>How do multiple cities line up over the course of a day?</li>
          </ul>
          <p>
            WhatTimeNow approaches this as a visual comparison problem rather than a numeric one,
            prioritizing clarity, speed, and ease of use.
          </p>
        </div>
      </section>

      <hr className="my-10 border-gray-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">What it does</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800">
          <li>Compare current time across multiple cities simultaneously</li>
          <li>Visualize past and future time differences throughout the day</li>
          <li>Share a specific time comparison via a simple URL</li>
          <li>Work without accounts or setup</li>
        </ul>
      </section>

      <hr className="my-10 border-gray-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">What it doesn’t do</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800">
          <li>Track users</li>
          <li>Require sign-ups</li>
          <li>Store personal data</li>
          <li>Perform background data collection</li>
        </ul>
        <p className="text-[15px] leading-7 text-gray-800">
          The tool is intentionally lightweight and focused.
        </p>
      </section>

      <hr className="my-10 border-gray-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Philosophy</h2>
        <p className="text-[15px] leading-7 text-gray-800">
          WhatTimeNow is built as an independent utility with an emphasis on:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-7 text-gray-800">
          <li>Clear visual representation</li>
          <li>Minimal interface and distractions</li>
          <li>Fast loading and predictable behavior</li>
        </ul>
        <p className="text-[15px] leading-7 text-gray-800">
          It aims to be a practical, everyday tool rather than a full-featured scheduling platform.
        </p>
      </section>

      <hr className="my-10 border-gray-200" />

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Contact</h2>
        <p className="text-[15px] leading-7 text-gray-800">
          For questions or feedback, you can reach out at:{" "}
          <a
            className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-700"
            href="mailto:contact@whattimenow.world"
          >
            contact@whattimenow.world
          </a>{" "}
          <span className="text-gray-600">(replace if needed)</span>
        </p>

        <p className="text-[15px] leading-7 text-gray-800">
          For legal information, please refer to the Privacy Policy and Terms of Service linked
          below.
        </p>

        <nav className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm">
          <a
            className="text-gray-700 underline underline-offset-4 hover:text-gray-900"
            href="/privacy"
          >
            Privacy
          </a>
          <a
            className="text-gray-700 underline underline-offset-4 hover:text-gray-900"
            href="/terms"
          >
            Terms
          </a>
        </nav>
      </section>
    </main>
  )
}
