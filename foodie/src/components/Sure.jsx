import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { ThemeContext } from '../contexts/ThemeProvider';
const Sure = () => {
    const  {logout} = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const handlelogout = () => {
        logout().then(() => {
            console.log("logout success");
        }
        ).catch((error) => {
            console.log(error);
        });
    }
  return (
    
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
        
        <dialog id="my_modal_6" className={`modal modal-bottom sm:modal-middle`}>
        <div className={`modal-box  ${theme==='dark'?'bg-[#0b0707] text-white ':'bg-white text-black'}`}>
            <p className="py-4">Are you sure want to logout?</p>
            <div className="modal-action">
            <form method="dialog" className='space-x-2'>
                {/* if there is a button in form, it will close the modal */}
                <button className="btn hover:border-black">No</button>
                <button className="btn hover:border-black" onClick={handlelogout}>Yes</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
  )
}

export default Sure
