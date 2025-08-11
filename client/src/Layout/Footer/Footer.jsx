import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
    const Links = [
        {
            title: 'Company',
            links: [
                { name: 'Home', link: "/" },
                { name: 'About Us', link: "/about-us" },
                { name: 'Contact Us', link: "/contact-us" },
                { name: 'Movies', link: "/movies" },
            ]
        },
        {
            title: 'Top Categories',
            links: [
                { name: 'Action', link: "#" },
                { name: 'Romantic', link: "#" },
                { name: 'Drama', link: "#" },
                { name: 'Historical', link: "#" },
            ]
        },
        {
            title: 'My Account',
            links: [
                { name: 'Dashboard', link: "/dashboard" },
                { name: 'My Favorite', link: "/favorite" },
                { name: 'Profile', link: "/profile" },
                { name: 'Change Password', link: "/password" },
            ]
        }
    ];

    return (
        <div className="bg-dry py-12 text-white">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7">
                    {Links.map((link, index) => (
                        <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3 pb-6">
                            <h3 className="text-lg lg:leading-7 font-semibold mb-4">{link.title}</h3>
                            <ul className="text-sm flex flex-col space-y-3">
                                {link.links.map((text, index) => (
                                    <li key={index} className="hover:underline transition-all duration-200 ease-in-out">
                                        <Link to={text.link} className="text-white hover:text-yellow-400">
                                            {text.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="pb-6 col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-start justify-start">
                        <Link to="/">
                            <img 
                                src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747808765/14344421-e223-43e7-9a46-072d81888d2f.png-removebg-preview_amakim.png" 
                                alt="Logo" 
                                className="w-15 object-contain mb-4 transition-all duration-300 ease-in-out hover:scale-105"
                            />
                        </Link>
                        <p className="text-sm text-white mt-3 leading-6">
                            <span>280 An Dương Vương, Phường 3, Quận 5, TP. Hồ Chí Minh</span>
                            <br />
                            <span>Hotline: 0941983908</span>
                            <br />
                            <span>Email: DVP@gmail.com</span>
                        </p>
                        <div className="flex space-x-4 mt-6">
                            <a href="#" className="text-white hover:text-blue-600 transition-all duration-200 ease-in-out">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-pink-600 transition-all duration-200 ease-in-out">
                                <FaInstagram size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-blue-400 transition-all duration-200 ease-in-out">
                                <FaTwitter size={24} />
                            </a>
                            <a href="#" className="text-white hover:text-blue-700 transition-all duration-200 ease-in-out">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center py-6 mt-6 border-t border-gray-700">
                <p className="text-sm text-white">© 2025 DVP. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;
