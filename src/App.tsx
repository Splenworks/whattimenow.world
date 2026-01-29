import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { PrivacyPage } from "./pages/Privacy"
import { TermsPage } from "./pages/Terms"
import { AboutPage } from "./pages/About"
import { WorldTimePage } from "./pages/WorldTime"
import { LowercaseUrlGuard } from "./components/LowercaseUrlGuard"

export default function App() {
  return (
    <LowercaseUrlGuard>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<WorldTimePage />} />
      </Routes>
    </LowercaseUrlGuard>
  )
}
