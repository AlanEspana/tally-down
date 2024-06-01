/*
  Modified by: Alan Espana
  CS 232 - Capstone II
  Final Project App - Tally Down
  Last updated: 5/29/2024
*/

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import AddTimer from './pages/AddTimer'
import NoPage from './pages/NoPage'

export default function App() {
  return (
    // Route index is default page no matter not having a url path
    // Route with path="*" is for when the other paths are not there
    // https://www.youtube.com/watch?v=TWz4TjSssbg
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-timer" element={<AddTimer />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
