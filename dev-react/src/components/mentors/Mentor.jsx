import { useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import Nav from './Nav';
import './mentor.css';

const Mentor = () => {

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-container'>
            <Nav OpenSidebar={OpenSidebar} />
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
            <Main />
        </div>
    )
}

export default Mentor
