import {assets, testimonials} from "../assets/assets.js";
import StarRating from "./StarRating";

const TestimonialCards = () => {
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-20 pt-20">
            {testimonials.map((testimonial) => (
                <div key={testimonial._id}
                     className="text-sm w-80 border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
                    <div className="flex flex-col items-center px-5 py-4 relative">
                        <img className="h-24 w-24 absolute -top-14 rounded-full"
                             src={testimonial.image}
                             alt={testimonial.name}/>
                        <div className="pt-8 text-center">
                            <h1 className="text-lg font-medium text-gray-800">{testimonial.name}</h1>
                            <p className="text-gray-800/80">{testimonial.address}</p>
                        </div>
                    </div>
                    <p className="text-gray-500 px-6 text-center">{testimonial.review}</p>
                    <div className="flex justify-center pt-4">
                        <div className="flex gap-0.5">
                            <StarRating rating={testimonial.rating}/>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
export default TestimonialCards
