import { DEFAULT_CITIES } from "./lib/time"
import { useNow } from "./hooks/useNow"
import { TimeColumn } from "./components/TimeColumn"

export default function App() {
  const now = useNow(1000)

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <div className="mx-auto max-w-5xl px-4 py-7">
        <header className="pb-4">
          <div className="text-base font-semibold tracking-tight">whattimenow.world</div>
          <div className="mt-1 text-sm text-gray-500">Slot-style world clock (MVP foundation)</div>
        </header>

        <main className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {DEFAULT_CITIES.map((city) => (
            <TimeColumn key={city.id} city={city} now={now} />
          ))}
        </main>

        <footer className="pt-5 text-xs text-gray-500">
          Next: slot reels + add/remove cities + time conversion
        </footer>
      </div>
    </div>
  )
}
