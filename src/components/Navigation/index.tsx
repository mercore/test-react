import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Auth, Tasks } from '../../pages'

export const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  )
}