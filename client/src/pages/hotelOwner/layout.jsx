import React from 'react'
import Navbar from "../../components/HotelOwner/Navbar.jsx";
import Sidebar from "../../components/HotelOwner/Sidebar.jsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={`flex flex-col h-screen`}>
            <Navbar/>
            <div className={`h-full flex`}>
                <Sidebar/>
                <div className={`flex-1 p-4 pt-10 md:px-10 h-full`}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
export default Layout
