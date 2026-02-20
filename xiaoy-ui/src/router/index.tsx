import { Routes, Route } from 'react-router-dom'
import { UserInfoPage, Home, NotFound, Courses, Life, Reviews, ChatPage , AdminLocations , AdminCourses , AdminDishs , AdminCourseComments} from '../pages'
import ReviewInfo from '../pages/ReviewInfo'
import { Layout } from '../components'
import Canteen from '../pages/Canteen'
import Admin from '../pages/Admin/Admin'
import Container from '../components/Container'
import SchoolBus from '../pages/SchoolBus'
import AdminUsers from '../pages/Admin/AdminUsers'
// ...existing code...

function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/life" element={<Life />} />
         <Route path="/reviews" element={<Container />} >
          <Route index element={<Reviews />} /> 
          <Route path="info/:id?" element={<ReviewInfo />} /> 
        </Route> 
        <Route path="/canteen" element={<Canteen />} />
        <Route path="/schoolbus" element={<SchoolBus />} />
        {/* <Route path="/reviews" element={<Reviews />} /> */}
        <Route path="/userinfo" element={<UserInfoPage />} />
      </Route>
      {/* 管理员管理系统路由 */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<AdminUsers />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="locations" element={<AdminLocations />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="dishs" element={<AdminDishs />} /> {/* 这里需要替换成 AdminDishs 组件 */}
        <Route path="coursecomments" element={<AdminCourseComments />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
