import React, {useEffect} from 'react'
import Title from "../../components/Title.jsx";
import {assets} from "../../assets/assets.js";
import {useAppContext} from "../../context/AppContext.jsx";

const Dashboard = () => {
    const {currency, axios, getToken, user, toast} = useAppContext()
    const [dashboardData, setDashboardData] = React.useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    })

    const fetchDashboardData = async () => {
        try {
            const {data} = await axios.get(`/api/bookings/hotel`, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
        } catch (e) {
            toast.error(e.message)
        }
    }

    useEffect(() => {
        if (user) {
            fetchDashboardData()
        }
    }, [user]);

    return (
        <div>
            <Title align='left' title='Dashboard'
                   subTitle='Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.'
                   font='Overpass'/>
            <div className={`flex gap-4 my-8`}>
                <div className={`bg-primary/3 border border-primary/10 rounded flex p-4 pr-8`}>
                    <img src={assets.totalBookingIcon} alt='totalbookingicon' className={`max-sm:hidden h-10`}/>
                    <div className={`flex flex-col sm:ml-4 font-medium`}>
                        <p className={`text-orange-500 text-lg`}>Total Bookings</p>
                        <p className={`text-neutral-400 text-base`}>{dashboardData.totalBookings}</p>
                    </div>
                </div>
                <div className={`bg-primary/3 border border-primary/10 rounded flex p-4 pr-8`}>
                    <img src={assets.totalRevenueIcon} alt='total revenue icon' className={`max-sm:hidden h-10`}/>
                    <div className={`flex flex-col sm:ml-4 font-medium`}>
                        <p className={`text-orange-500 text-lg`}>Total Revenue</p>
                        <p className={`text-neutral-400 text-base`}>{currency} {dashboardData.totalRevenue}</p>
                    </div>
                </div>
            </div>
            <h2 className={`text-xl text-blue-950/70 font-medium mb-5`}>Recent Bookings</h2>
            <div className={`w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll`}>
                <table className={`w-full`}>
                    <thead className={`bg-gray-50`}>
                    <tr>
                        <th className={`py-3 px-4 text-gray-800 font-medium`}>User Name</th>
                        <th className={`py-3 px-4 text-gray-800 font-medium max-sm:hidden `}>Room Name</th>
                        <th className={`py-3 px-4 text-gray-800 font-medium text-center`}>Total Amount</th>
                        <th className={`py-3 px-4 text-gray-800 font-medium text-center`}>Payment Status</th>

                    </tr>
                    </thead>
                    <tbody className={`text-sm`}>
                    {dashboardData.bookings.map((booking, i) => (
                        <tr key={i}>
                            <td className={`py-3 px-4  text-gray-700 border-t border-gray-300`}>{booking.user.username}</td>
                            <td className={`py-3 px-4  text-gray-700 border-t border-gray-300 max-sm:hidden`}>{booking.room.roomType}</td>
                            <td className={`py-3 px-4  text-gray-700 border-t border-gray-300 text-center`}>{currency} {booking.totalPrice}</td>
                            <td className={`py-3 px-4 border-t border-gray-300 flex`}>
                                <button
                                    className={`py-1 px-3 text-xs rounded-full mx-auto ${booking.isPaid ? 'bg-green-300 text-green-700' : 'bg-amber-300 text-amber-700'}`}>
                                    {booking.isPaid ? 'Completed' : 'Pending'}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Dashboard
