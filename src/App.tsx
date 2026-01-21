import { ScrollableReel } from "./components/ScrollableReel";

const cities = [
  { id: "la", label: "LA", tz: "America/Los_Angeles" },
  { id: "nyc", label: "NYC", tz: "America/New_York" },
  { id: "lon", label: "London", tz: "Europe/London" },
  // { id: "par", label: "Paris", tz: "Europe/Paris" },
  { id: "sel", label: "Seoul", tz: "Asia/Seoul" },
];

export default function App() {
  return (
    <div className="min-h-screen flex justify-left md:justify-center">
      <ScrollableReel cities={cities} stepMinutes={15} totalHours={48} />
    </div>
  );
}
