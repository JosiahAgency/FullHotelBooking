import {assets} from "../assets/assets.js";


const StarRating = ({rating}) => {
    return (
        <>
            {Array(5).fill('').map((_, i) => (
                <img src={rating > i ? assets.starIconFilled : assets.starIconOutlined}
                     alt='staricon' className={`h-4.5 w-4.5`}/>
            ))}
        </>
    )
}
export default StarRating
