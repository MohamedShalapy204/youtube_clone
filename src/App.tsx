import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Feed,
  VideoDetails,
  ChannelDetails,
  PlaylistDetails,
  SearchFeed,
  Navbar,
  Footer,
  BottomNav
} from "./components"

const App = () => {

  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 transition-all duration-300 min-w-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/channel/:id" element={<ChannelDetails />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
            <Route path="/search/:searchQuery" element={<SearchFeed />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App