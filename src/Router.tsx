import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/Defaultlayout/index'
import { Home } from './pages/home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Route>
    </Routes>
  )
}
