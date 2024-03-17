import React from 'react';
import '../../mentors/mentor.css';
import { TbAlignJustified } from "react-icons/tb";


const Header = ({ OpenSidebar }) => {
    return (
        <div className="nav-bar">
            <div className="menu-icon">
                <TbAlignJustified size={30} className='icon justify-icon' onClick={OpenSidebar} />
            </div>
        </div>
    )
}

export default Header
