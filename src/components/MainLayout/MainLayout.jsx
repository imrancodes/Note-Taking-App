import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
        <h1 className='dark:text-white'>Hello</h1>
        <Outlet />
    </div>
  )
}

export default MainLayout