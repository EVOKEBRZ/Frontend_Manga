import { Routes, Route } from 'react-router-dom'
import Mangas from './Pages/Mangas'
import Home from './Pages/Home'
import AddManga from './Pages/AddManga'
import AddChapter from './Pages/AddChapter'
import AddPages from './Pages/AddPages'
import Header from './components/Header'
import MangaDetails from './Pages/MangaDetails'

export function App() {
  return (
      <>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/mangas" element={<Mangas/>}/>
      <Route path="/mangas/add" element={<AddManga/>}/>
      <Route path="/chapters/add" element={<AddChapter/>}/>
      <Route path="/pages/add" element={<AddPages/>}/>
      <Route path='/mangas/details:id' element= {<MangaDetails/>}/>
      <Route path= '/*'element = {<Home/>}/>
    </Routes>
    </>
  )
}

export default App