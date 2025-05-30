import React from 'react'
import BookForm from "./BookForm.jsx";

const Hero = () => {
    return (
        <div
            className={`flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url('/src/assets/heroImage.png')] bg-no-repeat bg-cover bg-center h-screen w-full`}>
            <p className={`capitalize bg-[#49B9FF]/50 px-3.5 pt-1 rounded-full mt-20`}>The Ultimate hotel experience</p>
            <h1 className={`capitalize playfair-font text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4`}>Discover
                your perfect gateway destination</h1>
            <p className={`max-w-130 mt-2 text-sm mdd:text-base`}>Unparalleled luxury and comfort await at the world's
                most exclusive hotels and resorts. Start your
                journey
                today.
            </p>
            <div>
                <BookForm className={`mt-8`}/>
            </div>
        </div>
    )
}
export default Hero
