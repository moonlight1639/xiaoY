
import { Outlet } from 'react-router-dom'

function Container() {
  return (
    <div style={{width: "100%", height: "100%"}}>
        <Outlet />
    </div>
  )
}

export default Container