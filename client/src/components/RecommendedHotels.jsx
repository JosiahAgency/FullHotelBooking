import React, {useEffect, useState} from 'react'
import HotelCard from "./HotelCard.jsx";
import Title from "./Title.jsx";
import {useAppContext} from "../context/AppContext.jsx";

const RecommendedHotels = () => {
    const {rooms, currency, searchCities} = useAppContext()
    const [recommendedHotels, setRecommendedHotels] = useState([])

    const filterHotels = async () => {
        const filteredHotels = rooms.slice().filter(room => searchCities.includes(room.hotel.city))
        setRecommendedHotels(filteredHotels)
    }

    useEffect(() => {
        filterHotels()
    }, [rooms, searchCities])

    return recommendedHotels.length > 0 && (
        <div className={`flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20`}>
            <Title title='Recommended Hotels'
                   subTitle='Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.'/>
            <div className={`flex flex-wrap items-center justify-center gap-6 mt-20`}>
                {recommendedHotels.slice(0, 4).map((room, i) => (
                    <HotelCard room={room} key={room._id} index={i} currency={currency}/>
                ))}
            </div>

        </div>

    )
}
export default RecommendedHotels
