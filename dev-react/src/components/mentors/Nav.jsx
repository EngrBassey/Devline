import React from 'react';
import './mentor.css';
import { TbAlignJustified } from "react-icons/tb";


const Nav = ({OpenSidebar}) => {
    return (
        <div className="nav-bar">
            <div className="menu-icon">
                <TbAlignJustified size={30} className='icon justify-icon' onClick={OpenSidebar} />
            </div>
        </div>
    )
}

export default Nav
