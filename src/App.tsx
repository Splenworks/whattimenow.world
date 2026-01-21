import { ScrollableReel } from "./components/ScrollableReel";
import type { City } from "./types/city";

const baseCities: City[] = [
  { id: "la", label: "LA", tz: "America/Los_Angeles" },
  { id: "nyc", label: "NYC", tz: "America/New_York" },
  { id: "lon", label: "London", tz: "Europe/London" },
  { id: "sel", label: "Seoul", tz: "Asia/Seoul" },
];

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localCity: City = {
  id: "local",
  label: "Local",
  tz,
}

const cities = [localCity, ...baseCities.filter((city) => city.tz !== tz)];

export default function App() {
  return (
    <div className="min-h-screen flex justify-left md:justify-center">
      <ScrollableReel cities={cities} stepMinutes={15} totalHours={48} />
    </div>
  );
}
