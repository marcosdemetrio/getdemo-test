import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DemoList from './pages/DemoList'
import DemoViewer from './pages/DemoViewer'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DemoList />} />
        <Route path="/demo/:demoId" element={<DemoViewer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
