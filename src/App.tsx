import { HashRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SongList } from './pages/SongList'
import { SongDetail } from './pages/SongDetail'
import { SongEdit } from './pages/SongEdit'
import { Rooms } from './pages/Rooms'
import { RoomEdit } from './pages/RoomEdit'
import { Proposals } from './pages/Proposals'
import { Events } from './pages/Events'
import { Setlists } from './pages/Setlists'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/songs" element={<SongList />} />
        <Route path="/songs/:id" element={<SongDetail />} />
        <Route path="/songs/:id/edit" element={<SongEdit />} />
        <Route path="/songs/new" element={<SongEdit />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id/edit" element={<RoomEdit />} />
        <Route path="/rooms/new" element={<RoomEdit />} />
        <Route path="/proposals" element={<Proposals />} />
        <Route path="/events" element={<Events />} />
        <Route path="/setlists" element={<Setlists />} />
      </Routes>
    </HashRouter>
  )
}
