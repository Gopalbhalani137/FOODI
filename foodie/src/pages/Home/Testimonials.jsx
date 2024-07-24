/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { FaStar } from "react-icons/fa";
import chef from "../../images/chef.png";
import testimonial1 from "../../images/testimonial1.png";
import testimonial2 from "../../images/testimonial2.png";
import testimonial3 from "../../images/testimonial3.png";
const Testimonials = () => {
  return (
    <div className="section-container mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 hidden md:flex">
          <img src={chef} alt="" />
        </div>
        <div className="md:w-1/2 mx-10">
          <div className="text-left md:w-4/5 my-10">
            <p className="subtitle text-yellow">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I recently dined at your restaurant and wanted to share my experience. The food was absolutely delicious, and I was impressed by the freshness of the ingredients. Each dish was bursting with flavor, and the portion sizes were perfect. The service was quick and efficient, and the staff was incredibly friendly and welcoming.”
            </blockquote>
           
           {/* avater */}

           <div className="flex items-center gap-4 flex-wrap">
           <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src={testimonial1} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src={testimonial2} />
                </div>
              </div>
              <div className="avatar">
                <div className="w-12 cursor-pointer">
                  <img src={testimonial3} />
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h5 className="text-lg font-semibold">Customer Feedback</h5>
              <div className="flex items-center gap-2"><FaStar className="text-yellow-400"/> <span className="font-medium">4.9</span> <span className="text-[#807E7E]">(18.6k Reviews)</span></div>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;