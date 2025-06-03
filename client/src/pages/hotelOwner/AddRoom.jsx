import React, {useState} from 'react'
import Title from "../../components/Title.jsx";
import {assets} from "../../assets/assets.js";
import {useAppContext} from "../../context/AppContext.jsx";
import {toast} from "react-hot-toast";

const AddRoom = () => {
    const {getToken, axios} = useAppContext()

    const [loading, isLoading] = useState(false)
    const [image, setImage] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })
    const [input, setInput] = useState({
        roomType: '',
        pricePerNight: 0,
        amenities: {
            'Free Wifi': false,
            'Free Breakfast': false,
            'Room Service': false,
            'Mountain View': false,
            'Pool Access': false,
        },
    })

    const handleSubmission = async (e) => {
        e.preventDefault()

        if (!input.roomType || !input.pricePerNight || !input.amenities || !Object.values(image).some(images => images)) {
            toast.error('Please fill in all fields')
        }
        isLoading(true)

        try {
            const formData = new FormData()
            formData.append('roomType', input.roomType)
            formData.append('pricePerNight', input.pricePerNight)
            const amenities = Object.keys(input.amenities).filter(amenity => input.amenities[amenity])
            formData.append('amenities', JSON.stringify(amenities))
            Object.keys(image).forEach((key) => {
                image[key] && formData.append(`images`, image[key])
            })

            const {data} = await axios.post('/api/rooms', formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            console.log(data)

            if (data.success) {
                toast.success(data.message)
                setInput({
                    roomType: '',
                    pricePerNight: 0,
                    amenities: {
                        'Free Wifi': false,
                        'Free Breakfast': false,
                        'Room Service': false,
                        'Mountain View': false,
                        'Pool Access': false,
                    },
                })
                setImage({
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                })
            } else {
                toast.error(data.message)
            }

        } catch (e) {
            toast.error(e.message)

        } finally {
            isLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmission}>
            <Title align='left' font={`Overpass`} title={`Add Room`}
                   subTitle={`Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.`}/>
            <p className={`text-gray-800 mt-10`}>Images</p>
            <div className={`grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap`}>
                {Object.keys(image).map((key) => (
                    <label htmlFor={`roomImage ${key}`} key={key}>
                        <img src={image[key] ? URL.createObjectURL(image[key]) : assets.uploadArea} alt=''
                             className={`max-h-13 cursor-pointer opacity-80`}/>
                        <input type={`file`} accept={`image/*`} id={`roomImage ${key}`} hidden
                               onChange={e => setImage({...image, [key]: e.target.files[0]})}/>
                    </label>
                ))}
            </div>
            <div className={`w-full flex max-sm:flex-col sm:gap-4 mt-4`}>
                <div className={`flex-1 max-w-48`}>
                    <p className={`text-gray-800 mt-4`}>Room Type</p>
                    <select value={input.roomType} onChange={e => setInput({...input, roomType: e.target.value})}
                            className={`border opacity-70 border-gray-300 mt-1 rounded p-2 w-full`}>
                        <option>Select Room Type</option>
                        <option value='Single Bed'>Single Bed</option>
                        <option value='Double Bed'>Double Bed</option>
                        <option value='Luxury Room'>Luxury Room</option>
                        <option value='Family Suite'>Family Suite</option>
                    </select>
                </div>
                <div className={``}>
                    <p className={`text-gray-800 mt-4`}>Price <span className={`text-xs`}>/Night</span></p>
                    <input type='number' placeholder='0' className={`border border-gray-300 mt-1 rounded p-2 w-24`}
                           onChange={e => setInput({...input, pricePerNight: e.target.value})}/>
                </div>
            </div>
            <p className={`text-gray-800 mt-4`}>Amenities</p>
            <div className={`flex flex-col flex-wrap mt-1 text-gray-400 max-w-sm`}>
                {Object.keys(input.amenities).map((amenity, index) => (
                    <div key={index}>
                        <input type='checkbox' id={`amenity ${index + 1}`} checked={input.amenities[amenity]}
                               onChange={() => setInput({
                                   ...input,
                                   amenities: {...input.amenities, [amenity]: !input.amenities[amenity]}
                               })}
                        />
                        <label htmlFor={`amenity ${index + 1}`}> {amenity}</label>
                    </div>
                ))}
            </div>
            <button disabled={loading}
                    className={`bg-primary text-white px-8 py-2 mt-8 cursor-pointer rounded`}>{loading ? 'Adding...' : 'Add Room'}</button>
        </form>
    )
}
export default AddRoom
