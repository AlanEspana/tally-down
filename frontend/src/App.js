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
    // BrowserRouter sets up the router for the app
    // Routes contains all the route definitions
    // Route index is default page no matter not having a url path
    // Route with path="*" catches undefined paths
    // https://www.youtube.com/watch?v=TWz4TjSssbg
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-timer" element={<AddTimer />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
