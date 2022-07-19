import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title : 'Home',
        path : '/',
        icon : <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title : 'Candy',
        path : '/candy',
        icon : <IoIcons.IoLogoGameControllerB />,
        cName: 'nav-text'
    },
    {
        title : 'Logout',
        path : '/logout',
        icon : <AiIcons.AiOutlineLogout />,
        cName: 'nav-text'
    }
]