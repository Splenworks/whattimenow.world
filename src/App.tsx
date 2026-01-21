import { TimeReel } from "./components/TimeReel";
import type { City } from "./types/city";

const baseCities: City[] = [
  { id: "la", label: "LA", tz: "America/Los_Angeles", utcOffset: "-08:00" },
  { id: "nyc", label: "NYC", tz: "America/New_York", utcOffset: "-05:00" },
  { id: "lon", label: "London", tz: "Europe/London", utcOffset: "+00:00" },
  { id: "sel", label: "Seoul", tz: "Asia/Seoul", utcOffset: "+09:00" },
];

const now = new Date();
const getUtcOffset = (timeZone: string) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  }).formatToParts(now);
  const tzPart = parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT";

  if (tzPart === "GMT" || tzPart === "UTC") return "+00:00";
  const match = tzPart.match(/GMT([+-]\d{1,2})(?::(\d{2}))?/);
  if (!match) return "+00:00";

  const sign = match[1].startsWith("-") ? "-" : "+";
  const hours = Math.abs(parseInt(match[1], 10));
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  return `${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
};

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
const localCity: City = {
  id: "local",
  label: "Local",
  tz,
  utcOffset: getUtcOffset(tz),
}

const cities = [localCity, ...baseCities.filter((city) => city.tz !== tz)];

export default function App() {
  return (
    <div className="min-h-screen flex justify-left md:justify-center">
      <TimeReel cities={cities} stepMinutes={15} totalHours={48} />
    </div>
  );
}
