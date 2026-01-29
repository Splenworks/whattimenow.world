import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { PrivacyPage } from "./pages/Privacy"
import { TermsPage } from "./pages/Terms"
import { AboutPage } from "./pages/About"
import { TimeReelRoutePage } from "./pages/TimeReelRoute"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/*" element={<TimeReelRoutePage />} />
    </Routes>
  )
}
