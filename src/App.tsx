import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Feed,
  VideoDetails,
  ChannelDetails,
  SearchFeed,
  Navbar,
  Sidebar
} from "./components"

const App = () => {

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 p-4">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/video/:id" element={<VideoDetails />} />
              <Route path="/channel/:id" element={<ChannelDetails />} />
              <Route path="/search/:searchQuery" element={<SearchFeed />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App