import React from 'react'
import {assets} from "../assets/assets.js";

const Footer = () => {
    return (
        <footer className="bg-[#F6F9FC] px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    <img className="h-9 invert"
                         src={assets.logo}
                         alt="logo"
                    />
                    <p className="mt-6 text-sm">
                        Discover the world's most extraodinary places to stay, from boutique hotels to luxury villas and private islands.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        {/*<h2 className="font-semibold mb-5 text-gray-800">QuickStay</h2>*/}
                        <ul className="text-sm space-y-2">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p>+254 796 411 983</p>
                            <p>mwandajosiah@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2025 © Josiah Agency. All Right Reserved.
            </p>
        </footer>
    )
}
export default Footer
