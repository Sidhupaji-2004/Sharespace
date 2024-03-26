import Bottombar from '../components/ui/shared/Bottombar';
import LeftSidebar from '../components/ui/shared/LeftSidebar';
import TopBar from '../components/ui/shared/TopBar';

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <TopBar />
      <LeftSidebar />

      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>

      <Bottombar />
    </div>
  )
}

export default RootLayout