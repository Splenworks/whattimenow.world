import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/Home"
import { PrivacyPage } from "./pages/Privacy"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  )
}
