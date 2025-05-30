import Title from './Title'
import TestimonialCards from "./TestimonialCards";

const UserTestimonals = () => {
    return (
        <div className={`flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30`}>
            <Title title='What our guests say'
                   subTitle={"Discover why discerning travelers consistently shoose QuickStay for their exclusive and luxurious accomoodations around the world."} key={``} font={`D`}/>
            <div>
                <TestimonialCards/>
            </div>
        </div>
    )
}
export default UserTestimonals
