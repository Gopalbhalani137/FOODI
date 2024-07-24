import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthProvider';
// import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeProvider';
const Main = () => {
  const {loading} = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : '' }`}>
      {loading ? (
                <div className="flex justify-center items-center min-h-screen h-10">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div>
                    <Navbar />
                    <div className="min-h-screen pt-1">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )}
      
    </div>
  );
};

export default Main;
