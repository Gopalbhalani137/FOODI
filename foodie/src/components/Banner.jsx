import React, { useContext } from 'react';
import image from '../images/bg.png';
import meal1 from '../images/meal1.png';
import meal2 from '../images/meal2.png';
import meal3 from '../images/meal3.png';
import meal4 from '../images/meal4.png';
import '../App.css';
import { ThemeContext } from '../contexts/ThemeProvider';

const Banner = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`relative ${theme === 'dark' ? 'bg-black text-white banner-container.dark ' : 'bg-light text-black banner-container'}`}>
      <div className="pt-32 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        <div className="md:w-1/2 relative com">
          <img src={image} alt="banner" className="w-9/12 mx-auto" />
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative w-full h-full">
              <img src={meal1} alt="meal1" className="absolute top-50 left-28 bottom-4 w-24 h-24 transform -translate-x-12 -translate-y-12 hidden lg:flex transition-transform hover:scale-110 z-10" />
              <img src={meal2} alt="meal2" className="absolute top-22 bottom-4 left-96 w-24 h-24 transform translate-x-12 -translate-y-12 hidden lg:flex transition-transform hover:scale-110 z-10" />
              <img src={meal3} alt="meal3" className="absolute bottom-10 left-44 w-24 h-24 transform -translate-x-12 translate-y-12 hidden lg:flex transition-transform hover:scale-110 z-10" />
              <img src={meal4} alt="meal4" className="absolute bottom-0 right-32 w-24 h-24 hidden lg:flex transform transition-transform hover:scale-110 z-10" />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 space-y-7 px-4">
          <div className="md:text-5xl mx-14 text-4xl font-bold leading-snug">
            Dive into <a className={`${theme==='dark' ? 'text-[#FDC55E]':''}`}>Delights</a> Of Delectable <span className="text-yellow">Food</span>
          </div>
          <p className="text-xl mx-14 my-2">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
          </p>
          <button className="btn bg-yellow px-3 mx-14 font-semibold text-white rounded-full border-none hover:bg-red">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
