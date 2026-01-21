import { TimeReel } from "./components/TimeReel";
import { baseCities } from "./lib/cities";
import type { City } from "./types/city";

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
