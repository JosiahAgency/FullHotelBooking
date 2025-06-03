import React from 'react'
import Hero from "../components/Hero.jsx";
import FeaturedDestinations from "../components/FeaturedDestinations.jsx";
import ExclusiveOffers from "../components/ExclusiveOffers.jsx";
import UserTestimonals from "../components/UserTestimonals.js";
import NewsLetter from "../components/NewsLetter.jsx";
import RecommendedHotels from "../components/RecommendedHotels.jsx";

const Home = () => {
    return (
        <>
            <Hero/>
            <RecommendedHotels/>
            <FeaturedDestinations/>
            <ExclusiveOffers/>
            <UserTestimonals/>
            <NewsLetter/>
        </>
    )
}
export default Home
