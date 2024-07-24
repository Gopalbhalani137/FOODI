import React from 'react';
import '../../App.css';
import img1 from '../../images/img1.png';
import img2 from '../../images/img2.png';
import img3 from '../../images/img3.png';
import img4 from '../../images/img4.png';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';

const categoriesItems = [
  {
    id: 1,
    title: "Main dish",
    des: "(86 dishes)",
    image: img1,
  },
  {
    id: 2,
    title: "Breakfast",
    des: "(12 dishes)",
    image: img2,
  },
  {
    id: 3,
    title: "Dessert",
    des: "(48 Desserts)",
    image: img3,
  },
  {
    id: 4,
    title: "Browse all",
    des: "(255 items)",
    image: img4,
  },
];

const Categories = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div>
      <div className={`section-container pt-16 text-center ${theme === 'dark' ? 'bg-black text-white' : '' }`}>
        <h1 className={`subtitle ${theme==='dark' ? 'text-white':''}`}>
          Customer Favourites
        </h1>
        <h2 className="title">
          Popular Categories
        </h2>
        {/* categories */}
        <div className='px-3'> 
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8 mt-8">
          {categoriesItems.map((item) => (
            <div key={item.id} className={`text-center shadow-lg px-5 w-64 mx-auto cursor-pointer hover:-translate-y-4 transition-transform duration-300 h-auto ${theme==='dark' ? 'bg-gradient-to-b from-[#0e0606] from-0% to-[#f5474770] to-100% rounded-2xl p-6' : 'bg-gradient-to-b from-[#E5E5E5] from-0% to-[#f5474746] to-100% rounded-2xl p-6'}`}>
              <div className="flex w-full mx-auto justify-center items-center">
              <img src={item.image} alt={item.title} className=' p-5 rounded-full w-36 h-36' />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.des}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Categories;
