import { Route, Routes } from "react-router-dom"
import { LowercaseUrlGuard } from "./components/LowercaseUrlGuard"
import { HomePage } from "./pages/Home"

export default function App() {
  return (
    <LowercaseUrlGuard>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </LowercaseUrlGuard>
  )
}
