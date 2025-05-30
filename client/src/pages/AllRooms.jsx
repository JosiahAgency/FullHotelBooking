import React from 'react'
import Title from "../components/Title.jsx";
import {assets, facilityIcons, roomsDummyData} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";
import StarRating from "../components/StarRating.js";
import Checkbox from "../components/Checkbox.jsx";
import RadioButton from "../components/RadioButton.jsx";

const AllRooms = () => {
    const navigate = useNavigate()
    const [showFilters, setShowFilters] = React.useState(false);

    const roomTypes = [
        'Single Room',
        'Double Room',
        'Luxury Room',
        'Family Suite'
    ]

    const priceRanges = [
        '0 to 500',
        '500 to 1000',
        '1000 to 2000',
        '2000 to 3000',
    ]

    const sortOptions = [
        'Price Low to High',
        'Price High to Low',
        'Newest First'
    ]

    return (
        <div
            className='flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between pt-28 md:pt-35 px-8 md:px-26 lg:px-30'>
            <div className={``}>
                <Title title={'Hotel Rooms'}
                       subTitle={'Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories'}
                       align='left'/>
                {roomsDummyData.map((room) => (
                    <div key={room._id}
                         className={`flex gap-8 flex-col md:flex-row items-start py-10 border-b border-gray-300 last:pb-30 last:border-0`}>
                        <img src={room.images[0]} alt={room.hotel.name} title='View Room Details'
                             onClick={() => {
                                 navigate(`/rooms/${room._id}`);
                                 scrollTo(0, 0)
                             }}
                             className={` max-h-64 object-cover rounded-xl shadow-lg cursor-pointer md:w-1/2`}/>
                        <div className={`md:w-1/2 flex flex-col gap-2`} onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            scrollTo(0, 0)
                        }}>
                            <p className={`text-gray-500`}>{room.hotel.city}</p>
                            <p className={`text-gray-800 text-3xl playfair-font cursor-pointer`}>{room.hotel.name}</p>
                            <div className={`flex items-center`}>
                                <StarRating rating={room.hotel.rating}/>
                                <p className={`ml-2`}>200++ reviews</p>
                            </div>
                            <div className={`flex items-center gap-1 text-gray-500 mt-2 text-sm`}>
                                <img src={assets.locationIcon} alt='location' className={`h-4 w-4`}/>
                                <span>{room.hotel.address}</span>
                            </div>
                            <div className={`flex flex-wrap items-center gap-4 mt-4 mb-6`}>
                                {room.amenities.map((amenity, i) => (
                                    <div key={i}
                                         className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70`}>
                                        <img src={facilityIcons[amenity]} alt={amenity} className={`h-5 w-5`}/>
                                        <p className={`text-xs`}>{amenity}</p>
                                    </div>
                                ))}
                            </div>
                            <p className={`text-xl font-medium text-gray-700`}>Kes {room.pricePerNight} /Night</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={`border-gray-300 bg-white w-80 border text-gray-600 max-lg:mb-8 min-lg:mt-16`}>
                <div
                    className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${showFilters && 'border-b'}`}>
                    <p className={`uppercase text-base font-medium text-gray-800`}>filters</p>
                    <div className={`text-xs cursor-pointer`}>
                        <span className={`uppercase lg:hidden`}
                              onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'Hide' : 'Show'}</span>
                        <span className={`uppercase hidden lg:block`}>clear</span>
                    </div>
                </div>
                <div
                    className={`${showFilters ? 'h-auto' : 'h-0 lg:h-auto'}  overflow-hidden transition-all duration-700`}>
                    <div className={`px-5 pt-5`}>
                        <p className={`capitalize font-medium text-gray-800 pb-2`}>popular filters</p>
                        {roomTypes.map((room, i) => (
                            <Checkbox key={i} label={room}/>
                        ))}
                    </div>
                    <div className={`px-5 pt-5`}>
                        <p className={`capitalize font-medium text-gray-800 pb-2`}>price range</p>
                        {priceRanges.map((price, i) => (
                            <Checkbox key={i} label={`Kes ${price}`}/>
                        ))}
                    </div>
                    <div className={`px-5 pt-5 pb-7`}>
                        <p className={`capitalize font-medium text-gray-800 pb-2`}>sort by</p>
                        {sortOptions.map((options, i) => (
                            <RadioButton key={i} label={options}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AllRooms
