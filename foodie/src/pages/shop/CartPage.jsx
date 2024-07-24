import React, { useEffect, useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeProvider';
import useCart from '../../hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import axios from "axios";

const CartPage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  console.log(cart)
  const [cartItems, setCartItems] = useState([]);
  // console.log(cartItems)

  // Calculate the total price for each item in the cart
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  // Handle quantity increase
  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:3000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });
      await refetch();

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Handle quantity decrease
  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:3000/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
  // delete an item
  const handleDelete =   (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/carts/${item._id}`).then(response => {
          if (response) {
            refetch();
             Swal.fire("Deleted!", "Your file has been deleted.", "success");
           }
        })
        .catch(error => {
          console.error(error);
        });
      }
    });
  };
  return (
    <div className='pt-20'>
      <div className={`relative ${theme === 'dark' ? 'bg-black text-white ' : 'bg-light text-black '}`}>
        <div className="pt-20 flex flex-col items-center">
          <div className="space-y-14">
            <div className="md:text-5xl px-24 md:mx-14 text-4xl font-bold leading-snug">
              Items Added to the <span className='text-yellow'>Cart</span>
            </div>
            <div>
              <div className={`overflow-x-auto ${theme === 'dark' ? 'bg-black text-white' : ''}`}>
                <table className="table">
                  {/* head */}
                  <thead className={`bg-yellow text-white rounded-sm ${theme === 'dark' ? 'bg-black' : ''}`}>
                    <tr>
                      <th>#</th>
                      <th>Food</th>
                      <th>Item name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* rows */}
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={item.image} // Assuming item has an 'image' field
                                  alt="Avatar"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td> 
                          <button className='font-medium btn btn-xs' onClick={()=>{handleDecrease(item)}}>-</button>
                          <input type="number" className="w-10 mx-2 text-center overflow-hidden appearance-none bg-none text-black"value={item.quantity} onChange={()=>console.log(item.quantity)}/>
                          <button className='font-medium btn btn-xs' onClick={()=>{handleIncrease(item)}}>+</button>
                         </td>
                        
                        <td>{(item.price)}</td>
                        <th>
                          <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(item)}>
                            <FaTrash />
                          </button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                
                </table>
              </div>
            </div>
            <div className='flex flex-col md:flex-row '>
              <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name : {user.displayName }</p>
              <p>Email : {user.email.toUpperCase()}.</p>
              <p>UserId : {user.uid}</p>
              </div>
              <div className="md-1/2 space-y-3 ">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items : {
                cart.reduce((acc, item) => acc + item.quantity, 0)
}</p>
              <p>Total Price : {
                cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
            }</p>
              <button className='btn bg-yellow border-none text-white hover:bg-red'>Process Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
