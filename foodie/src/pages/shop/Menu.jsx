import React, { useEffect, useState, useContext } from 'react';
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
import { ThemeContext } from '../../contexts/ThemeProvider';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/menu');
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredItems(menu);
      return;
    }
    const newItems = menu.filter((item) => item.category === category);
    setFilteredItems(newItems);
    setCurrentPage(1); // Reset to the first page on filtering
  };

  const sortItems = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
    setCurrentPage(1); // Reset to the first page on sorting
  };

  const handleSortChange = (option) => {
    sortItems(option);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="banner-container relative">
        <div className="py-48 flex flex-col md:flex-row-reverse justify-center items-center gap-8">
          <div className="space-y-7 px-4 text-center">
            <div className="md:text-5xl mx-14 text-4xl font-bold leading-snug">
              For the <a className={`${theme === 'dark' ? 'text-[#FDC55E]' : ''}`}>Love</a> of Delicious <span className="text-yellow">Food</span>
            </div>
            <p className="text-xl text-[#4A4A4A] mx-14 my-2 md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Relienas and more for a moderate cost
            </p>
            <button className="btn bg-yellow px-3 mx-14 font-semibold text-white rounded-full border-none hover:bg-red">
              Order Now
            </button>
          </div>
        </div>
      </div>
      {/* menu shop section */}
      <div className="section-container mx-8">
        {/* filtering and sorting */}
        <div className='gap-3 my-10'>
          <button
            onClick={() => filterItems('all')}
            className={`text-sm ${selectedCategory === 'all' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => filterItems('salad')}
            className={`ml-2 text-sm md:ml-5 ${selectedCategory === 'salad' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            Salad
          </button>
          <button
            onClick={() => filterItems('pizza')}
            className={`ml-2 text-sm md:ml-5 ${selectedCategory === 'pizza' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            Pizza
          </button>
          <button
            onClick={() => filterItems('soup')}
            className={`ml-2 text-sm md:ml-5 ${selectedCategory === 'soup' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            Soup
          </button>
          <button
            onClick={() => filterItems('dessert')}
            className={`ml-2 text-sm md:ml-5 ${selectedCategory === 'dessert' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            Desserts
          </button>
          <button
            onClick={() => filterItems('drinks')}
            className={`ml-2 text-sm md:ml-5 ${selectedCategory === 'drinks' ? 'font-bold border-b-2 border-yellow' : ''}`}
          >
            Drinks
          </button>
        </div>
        <div className="flex justify-end mb-4 rounded-sm">
          <div className="bg-black p-2">
            <FaFilter className="text-white h-4 w-4" />
          </div>
          <select
            id="sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className="bg-black text-white px-2 py-1 rounded-sm"
          >
            <option value="default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
        {/* products card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center my-8">
          {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200'} ${
                currentPage === index + 1 ? "bg-green text-yellow" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
