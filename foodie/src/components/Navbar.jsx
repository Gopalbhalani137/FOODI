import React, { useContext, useEffect } from 'react';
import image from '../images/logo.png';
import { FaRegUser, FaToggleOff, FaToggleOn } from "react-icons/fa";
import { useAuth } from '../hooks/useAuth';
import { ThemeContext } from '../contexts/ThemeProvider';
import '../App.css';
import Modal from './Modal';
import Sure from './Sure';
import blacklogo from '../images/blacklogo.png';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useAdmin } from '../hooks/useAdmin';
const Navbar = () => {
    const [isSticky, setSticky] = React.useState(false);
    const [isAdmin]=useAdmin();
    const { user } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [cart,refetch]=useCart();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Proper cleanup
        };
    }, []);

    const navItems = (
        <>
            <li><a href='/' className={`${theme === 'dark' ? 'text-white ' : 'text-black'} hover:bg-yellow`}>Home</a></li>
            <li>
                <details>
                    <summary className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:bg-yellow`}>Menu</summary>
                    <ul className={`${theme === 'dark' ? 'bg-black text-white' : 'text-black'} `}>
                        <li><a href='/menu' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>All</a></li>
                        <li><a href='#' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>Salad</a></li>
                        <li><a href='#' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>Pizza</a></li>
                    </ul>
                </details>
            </li>
            <li>
                <details>
                    <summary className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:bg-yellow`}>Services</summary>
                    <ul className={`${theme === 'dark' ? 'bg-black text-white' : 'text-black'}  p2` }>
                        <li><a href='#' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>Online Order</a></li>
                        <li><a href='#' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>Table Booking</a></li>
                        <li><a href='#' className={`${theme==='dark'?'hover:bg-gray-600':''}`}>Order Tracking</a></li>
                    </ul>
                </details>
            </li>
            <li><a href='#' className={`${theme === 'dark' ? 'text-white' : 'text-black'} hover:bg-yellow`}>Offers</a></li>
        </>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${theme=='dark'?'bg-black' : 'shadow-md bg-base-100 bg-gradient-to-r from-[#c9c7c7] to-[#fb060636]'}`}>
            <div className="py-2">
                <div className="max-w-screen-xl container mx-auto flex justify-between items-center px-4 lg:px-20">
                    <div className="navbar-start flex flex-row">
                        <div className={`dropdown ${theme==='dark' ? 'bg-black text-white' : ''}`}>
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className={`dropdown ${theme==='dark' ? 'bg-black text-white' : ''} menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52`}>
                                {navItems}
                            </ul>
                        </div>
                        <a className="mt-3" href='/'>
                        {
                            theme === 'dark' ? <img src={blacklogo} className="w-20 md:w-32" alt="logo" /> : <img src={image} className="w-20 md:w-32 " alt="logo" />
                        }
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItems}
                        </ul>
                    </div>
                    <div className="navbar-end flex items-center">
                        <button className={`btn btn-ghost btn-circle hidden lg:flex ${theme==='dark'?'text-white' : '' }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <Link to="/cart-page">
                        <div tabIndex={0} className="btn btn-ghost btn-circle mr-1 flex items-center justify-center hidden lg:flex">
                            <div className={`indicator ${theme==='dark'?'text-white' : '' }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{
                                    cart.length || 0}</span>
                            </div>
                        </div>
                        </Link>
                        <button onClick={toggleTheme} className={`btn btn-ghost btn-circle ${theme==='dark'?'text-white' : '' }`}>
                            {theme === 'light' ? <FaToggleOff size={24} /> : <FaToggleOn size={24} />}
                        </button>
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        {user.photoURL ? (
                                            <img src={user.photoURL} alt="avatar" className="rounded-full w-full h-full" />
                                        ) : (
                                            <img
                                                alt="Tailwind CSS Navbar component"
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        )}
                                    </div>
                                </div>
                               {
                                isAdmin==false ?(
                                    <ul tabIndex={0} className={`menu dropdown-content w-52 ${theme==='dark' ? 'bg-black text-white' : 'bg-white'} `}>
                                    <li><a href='/profile'>Profile</a></li>
                                    <li><a href='/order' >Order</a></li>
                                    <li>
                                        <div className='dropdown dropdown-end'>
                                            <a href="" className="">Setting</a>
                                        </div>
                                        
                                    </li>
                                    <li><button onClick={() => document.getElementById("my_modal_6").showModal()}>Logout</button></li>
                                </ul>
                                ):(
                                    <ul tabIndex={0} className={`menu dropdown-content w-52 ${theme==='dark' ? 'bg-black text-white' : 'bg-white'} `}>
                                    <li><a href='/profile'>Profile</a></li>
                                    <li><a href='/order' >Order</a></li>
                                    <li>
                                        <div className='dropdown dropdown-end'>
                                            <a href="" className="">Setting</a>
                                        </div>
                                        
                                    </li>
                                    <li><a href='/dashboard' >Dashboard</a></li>
                                    <li><button onClick={() => document.getElementById("my_modal_6").showModal()}>Logout</button></li>
                                </ul>
                                )
                               }
                            </div>
                        ) : (
                            <button
                                onClick={() => document.getElementById("my_modal_5").showModal()}
                                className="btn flex items-center gap-2 rounded-full px-6 bg-yellow hover:bg-red text-white border-none"
                            >
                                <FaRegUser /> Login
                            </button>
                        )}
                        <Sure />
                        <Modal />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
