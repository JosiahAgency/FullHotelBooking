import React from 'react'
import {Link} from "react-router-dom";
import {assets} from "../assets/assets.js";

const HotelCard = ({room, index, currency}) => {
    return (
        <Link
            className={`relative max-w-70 w-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]`}
            to={'/rooms/' + room._id} onClick={() => scrollTo(0, 0)} key={room._id}>
            <img src={room.images[0]} alt={room.hotel.name} />
            {index % 2 === 0 &&
                <p className={`px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full`}>
                    Best Seller
                </p>
            }
            <div className={`p-4 pt-5`}>
                <div className={`flex items-center justify-between`}>
                    <p className={`text-gray-800 font-medium text-xl playfair-font`}>
                        {room.hotel.name}
                    </p>
                    <div className={`flex items-center gap-2`}>
                        <img src={assets.starIconFilled} alt='star' className={``}/> 4.3
                    </div>
                </div>
                <div className={`flex items-center gap-1 text-sm`}>
                    <img src={assets.locationIcon} alt='location' className={``}/>
                    <span>{room.hotel.address}</span>
                </div>
                <div className={`flex items-center justify-between mt-4`}>
                    <p>
                        <span className={`text-xl text-gray-800`}>{currency} {room.pricePerNight}</span>
                        /Night
                    </p>
                    <button
                        className={`px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer`}>Book
                        Now
                    </button>
                </div>
            </div>
        </Link>
    )
}
export default HotelCard
