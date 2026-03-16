import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  Feed,
  VideoDetails,
  ChannelDetails,
  PlaylistDetails,
  SearchFeed,
  Navbar,
  Footer,
  BottomNav,
  Explore,
  Themes,
  Library,
  PlaylistPlayer,
  Create,
  ScrollToTop
} from "./components"

const App = () => {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-black min-h-screen flex flex-col overflow-x-hidden pb-24">
        <Navbar />
        <main className="flex-1 transition-all duration-300 min-w-0 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetails />} />
            <Route path="/channel/:id" element={<ChannelDetails />} />
            <Route path="/playlist/:id" element={<PlaylistDetails />} />
            <Route path="/video/:videoId/playlist/:playlistId" element={<PlaylistPlayer />} />
            <Route path="/search/:searchQuery" element={<SearchFeed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/themes" element={<Themes />} />
            <Route path="/library" element={<Library />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </main>
        <Footer />
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}

export default App