import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
      <Outlet />
    </div>
  )
}

export default MainLayout