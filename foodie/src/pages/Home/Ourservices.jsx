import React from "react";
import img1 from "../../images/icon1.png";
import img2 from "../../images/icon2.png";
import img3 from "../../images/icon3.png";
import img4 from "../../images/icon4.png";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeProvider";
const serviceLists = [
    {id:1, title: "Catering", des: "Delight your guests with our flavors and  presentation", img: `${img1}`},
    {id:2, title: "Fast delivery", des: "We deliver your order promptly to your door", img: `${img2}`},
    {id:3, title: "Online Ordering", des: "Explore menu & order with ease using our Online Ordering n", img: `${img3}`},
    {id:4, title: "Gift Cards", des: "Give the gift of exceptional dining with Foodi Gift Cards", img: `${img4}`},
]
const OurServices = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`section-container my-20 ${theme === 'dark' ? 'bg-black text-white' : '' }`}>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <div className="md:w-1/2 mx-10 md:ml-20">
          <div className="text-left md:w-4/5 ">
            <p className="subtitle">Our Story & Services</p>
            <h2 className="title">Our Culinary Journey And Services</h2>
            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button className="bg-green font-semibold btn bg-yellow hover:bg-red text-white px-8 py-3 rounded-full border-none">
              Explore
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-green cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200 md:mr-8">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className="text-[#90BD95]">{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};
export default OurServices;