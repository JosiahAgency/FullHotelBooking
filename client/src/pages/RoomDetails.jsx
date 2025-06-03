import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import {assets, roomCommonData} from "../assets/assets.js";
import StarRating from "../components/StarRating.js";
import {useAppContext} from "../context/AppContext.jsx";

const RoomDetails = () => {
    const {id} = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const {rooms, currency, getToken, axios, navigate, toast} = useAppContext()
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [guests, setGuestNumber] = useState(1);
    const [isAvailable, setIsAvailable] = useState(false);

    const checkRoomAvailability = async () => {
        try {
            if (checkInDate >= checkOutDate) {
                toast.error('Check In Date should be before the Check Out Date');
                return
            }
            const {data} = await axios.post('/api/bookings/check-availability', {room: id}, checkInDate, checkOutDate)

            if (data.success) {
                if (data.isAvailable) {
                    setIsAvailable(true);
                    toast.success('Room is Available');
                } else {
                    setIsAvailable(false)
                    toast.error('Room is Not Available');
                }
            } else {
                toast.error(data.message);
            }

        } catch (e) {
            toast.error(e.message)
        }
    }

    const handleSubmission = async (e) => {
        try {
            e.preventDefault();
            if (!isAvailable) {
                return checkRoomAvailability()
            } else {
                const {data} = await axios.post('/api/bookings/book', {
                    room: id,
                    checkInDate,
                    checkOutDate,
                    guests,
                    paymentMethod: "Mpesa"
                }, {headers: {Authorization: `Bearer ${await getToken()}`}})

                if (data.success) {
                    toast.success(data.message);
                    navigate("/my-bookings")
                    scrollTo(0, 0)
                } else {
                    console.log(data.message)
                    toast.error(data.message);
                }
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        const room = rooms.find(room => room._id === id)
        room && setRoom(room);
        room && setMainImage(room.images[0]);
    }, [rooms]);

    return room && (
        <div className={`py-28 md;py-35 px-4 md:px-16 lg;px-24 xl:px-32`}>
            <div className={`flex gap-2 flex-col md:flex-row items-start md:items-center`}>
                <h1 className={`text-3xl md:text-4xl playfair-font`}>{room.hotel.name}
                    <span className={`text-sm`}> ({room.roomType})</span>
                </h1>
                <p className={`text-xs py-1.5 px-3 text-white bg-orange-600 rounded-full`}>15% OFF</p>
            </div>
            <div className={`flex items-center gap-1 mt-2`}>
                <StarRating/>
                <p className={`ml-2`}>123+ Reviews</p>
            </div>
            <div className={`flex items-center gap-1 text-gray-500 mt-2`}>
                <img src={assets.locationIcon} alt='location' className={``}/>
                <span>{room.hotel.address}</span>
            </div>
            <div className={`flex flex-col lg:flex-row mt-6 gap-6`}>
                <div className={`lg:w-1/2  w-full`}>
                    <img src={mainImage} alt={room.hotel.name} className={`w-full rounded-xl object-cover shadow-lg`}/>
                </div>
                <div className={`grid grid-cols-2 gap-4 lg:w-1/2 w-full`}>
                    {room?.images.length > 1 && room.images.map((image, i) => (
                        <img src={image} alt='room image' key={i}
                             className={`w-full rounded-xl shadow-md cursor-pointer object-cover ${mainImage === image && 'outline-3 outline-orange-600'}`}
                             onClick={() => {
                                 setMainImage(image)
                             }}
                        />
                    ))}
                </div>
            </div>
            <div className={`flex flex-col md:flex-row md:justify-between mt-10`}>
                <div className={`flex flex-col`}>
                    <h1 className={`text-3xl md:text-4xl playfair-font`}>Experience Luxury like never before</h1>
                    <div className={`flex flex-wrap items-center mt-3 mb-6 gap-4`}>
                        {room.amenities.map((amenity, i) => (
                            <div className={`flex-items-center gap-2 px-3 py-2 rounded-lg bg-gray-100`} key={i}>
                                <p className={`text-sm`}>{amenity}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className={`text-2xl font-medium`}>{currency} {room.pricePerNight} /Night</p>
            </div>
            <form onSubmit={handleSubmission}
                  className={`flex flex-column md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl`}>
                <div
                    className={`flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500`}>
                    <div className={`flex flex-col`}>
                        <label htmlFor={`checkindate`} className={`font-medium`}>Check-in</label>
                        <input onChange={(e) => setCheckInDate(e.target.value)}
                               min={new Date().toISOString().split('T')[0]}
                               className={`w-full outline-none mt-1.5 py-2 px-3 rounded border border-gray-300`}
                               type='date' id='checkindate' placeholder={`Check-In`} required/>
                    </div>
                    <div className={`w-px h-15 bg-gray-300/70 max-md:hidden`}/>
                    <div className={`flex flex-col`}>
                        <label htmlFor={`checkoutdate`} className={`font-medium`}>Check-Out</label>
                        <input onChange={(e) => setCheckOutDate(e.target.value)} min={checkInDate}
                               disabled={!checkInDate}
                               className={`w-full outline-none mt-1.5 py-2 px-3 rounded border border-gray-300`}
                               type='date' id='checkoutdate' placeholder={`Check-Out`} required/>
                    </div>
                    <div className={`w-px h-15 bg-gray-300/70 max-md:hidden`}/>
                    <div className={`flex flex-col`}>
                        <label htmlFor={`guests`} className={`font-medium`}>Guests</label>
                        <input onChange={(e) => setGuestNumber(e.target.value)} value={guests}
                               className={`max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none`}
                               type='number' id='guests' placeholder={`1`} required/>
                    </div>
                </div>
                <button type={"submit"}
                        className={`bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer`}>
                    {isAvailable ? 'Book Now' : 'Check Availability'}
                </button>
            </form>
            <div className={`mt-25 space-y-4`}>
                {roomCommonData.map((data, i) => (
                    <div key={i} className={`flex items-start gap-2`}>
                        <img src={data.icon} alt={`${data.title}-icon`} className={`w-6.5`}/>
                        <div className={``}>
                            <p className={`text-base`}>{data.title}</p>
                            <p className={`text-gray-500`}>{data.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <p className={`max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500`}>
                    Guests will be allocated
                    on the ground floor according to availability.
                    You get a comfortable Two bedroom apartment has a true city feeling. The
                    price quoted is for two guest, at the guest slot please mark the number of
                    guests to get the exact price for groups. The Guests will be allocated
                    ground floor according to availability. You get the comfortable two bedroom
                    apartment that has a true city feeling.</p>
            </div>
            <div className={`flex flex-col items-start gap-4`}>
                <div className={`flex gap-4`}>
                    <img src={room.hotel.owner.image} alt='host' className={`h-14 w-14 md:h-18 md:w-18 rounded-full`}/>
                    <div>
                        <p className={`text-lg md:text-xl`}>Host By: {room.hotel.name}</p>
                        <div className={`flex items-center mt-1`}>
                            <StarRating/>
                            <p className={`ml-2`}>456+ Reviews</p>
                        </div>
                    </div>
                </div>
                <button
                    className={`px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer`}>
                    Contact Now
                </button>
            </div>
        </div>
    )
}
export default RoomDetails
