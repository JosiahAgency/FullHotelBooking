import axios from 'axios';
import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser, useAuth} from "@clerk/clerk-react"
import {toast} from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY || "Kes ";
    const navigate = useNavigate()
    const {user} = useUser()
    const {getToken} = useAuth()

    const [isOwner, setIsOwner] = useState(false)
    const [showHotelRegistration, setShowHotelRegistration] = useState(false)
    const [searchCities, setSearchCities] = useState([])
    const [rooms, setRooms] = useState([])

    const fetchRooms = async () => {
        try {
            const {data} = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        fetchRooms()
    }, [])

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                }
            })
            if (data.success) {
                setIsOwner(data.role === 'hotelOwner')
                setSearchCities(data.recentSearchedCities)
            } else {
                setTimeout(() => {
                    fetchUser()
                }, 5000)
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchUser()
        }
    }, [user]);

    const value = {
        currency,
        navigate,
        user,
        getToken,
        isOwner, setIsOwner,
        showHotelRegistration, setShowHotelRegistration,
        axios,
        searchCities, setSearchCities,
        toast,
        rooms, setRooms
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
