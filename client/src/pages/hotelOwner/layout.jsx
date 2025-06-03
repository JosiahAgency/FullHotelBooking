import React, {useEffect} from 'react'
import Navbar from "../../components/HotelOwner/Navbar.jsx";
import Sidebar from "../../components/HotelOwner/Sidebar.jsx";
import {Outlet} from "react-router-dom";
import {useAppContext} from "../../context/AppContext.jsx";

const Layout = () => {
    const {isOwner, navigate} = useAppContext()

    useEffect(() => {
        if (!isOwner) navigate('/')

    }, [isOwner]);

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
