import axios from 'axios';
import {createContext, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser, useAuth} from "@clerk/clerk-react"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const currency = import.meta.env.VITE_CURRENCY || "Kes ";
    const navigate = useNavigate()
    const {user} = useUser()
    const {token} = useAuth()

    const [isOwner, setIsOwner] = useState(false)
    const [showHotelRegistration, setShowHotelRegistration] = useState(false)

    const fetchUser = async () => {
        try {
            const data = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${await token()}`,
                }
            })
            if (data.success) {
                setIsOwner(data.role === 'hotelOwner')

            }

        } catch (e) {
            console.log(e)
        }
    }

    const value = {
        currency,
        navigate,
        user,
        token,
        isOwner,
        setIsOwner,
        showHotelRegistration,
        setShowHotelRegistration, axios
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
