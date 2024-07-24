import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import menu from '../../data/menu.json';
import Cards from '../../components/Cards';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';
const SpecialDishes = () => {
    const [recipes, setRecipes] = useState([]);
    const { theme } = useContext(ThemeContext);
    useEffect(() => {
        const fetchData = () => {
            if (menu && menu.meals) {
                const specials = menu.meals.filter((item) => item.category === "popular");
                setRecipes(specials);
            } else {
                console.error("Menu data is not available or structured incorrectly.");
            }
        };

        fetchData();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className={`section-container mt-20 ${theme === 'dark' ? 'bg-black text-white' : '' }`}>
            <div className="text-left mx-16">
                <p className="subtitle">Special Dishes</p>
                <h2 className="title md:w-[520px]">Standout Dishes from our Menu</h2>
            </div>
            <div className="slider-container mt-10">
                <Slider {...settings} className='mx-9'>
                    {recipes.length > 0 ? recipes.map((item, i) => (
                        <Cards item={item} key={i} />
                    )) : <div>Loading...</div>}
                </Slider>
            </div>
        </div>
    );
};

export default SpecialDishes;
