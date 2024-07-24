import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ThemeContext } from '../contexts/ThemeProvider';
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleCart = item => {
    if(user && user.email){
      const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}
      axios.post('http://localhost:3000/carts', cartItem)
      .then((response) => {
        console.log(response);
        if(response){
          // refetch(); // refetch cart
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item added to cart!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .catch( (error) => {
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 1500
        })
      });
    }
    else{
        Swal.fire({
            title: 'Please login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
  };

  return (
    <div className={`card shadow-xl relative mr-5 md:my-5 ${theme === 'dark' ? 'bg-gradient-to-b from-[#0e0606] from-0% to-[#f5474770] to-100% rounded-2xl p-6' : 'bg-gradient-to-b from-[#E5E5E5] from-0% to-[#f5474746] to-100%'}`}>
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className='w-5 h-7 cursor-pointer' />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt={item.name} className='hover:scale-105 transition-all duration-300 md:h-32 w-32' />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button className="btn bg-yellow hover:bg-yellow text-white border-none" onClick={() => handleCart(item)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
