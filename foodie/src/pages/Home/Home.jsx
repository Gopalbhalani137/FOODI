import { Outlet } from "react-router-dom";
import Banner from "../../components/Banner"
import Categories from "./Categories";
import SpecialDishes from "./SpecialDishes";
import Ourservices from "./Ourservices";
import Testimonials from "./Testimonials";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";
const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${theme === 'dark' ? 'bg-black text-white' : '' }`}>  
      <Banner/>
      <Categories/>
      <SpecialDishes/>
      <Testimonials/>
      <Ourservices/>
    </div>
  );
};

export default Home;
  