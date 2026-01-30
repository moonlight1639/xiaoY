import { Routes, Route } from 'react-router-dom'
import { Home, About, NotFound, Courses, Life, Reviews, ChatPage } from '../pages'
import ReviewInfo from '../pages/ReviewInfo'
import { Layout } from '../components'
import Container from '../components/Container'
import Canteen from '../pages/Canteen'
import Admin from '../pages/Admin'
// ...existing code...

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/life" element={<Life />} />
         <Route path="/reviews" element={<Container />} >
          <Route index element={<Reviews />} /> 
          <Route path="info" element={<ReviewInfo />} /> 
        </Route> 
        <Route path="/canteen" element={<Canteen />} />
        {/* <Route path="/reviews" element={<Reviews />} /> */}
      </Route>
      {/* 管理员管理系统路由 */}
      <Route path="/admin" element={<Admin />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
