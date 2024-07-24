import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { FaCartPlus, FaEdit, FaLocationArrow, FaQuestionCircle, FaShoppingBag, FaUsers } from "react-icons/fa";
import { RiMenuAddFill } from "react-icons/ri";
import logo from '../images/logo.png'
import Signup from '../components/Signup'
import { useAuth } from '../hooks/useAuth';
import { useAdmin } from '../hooks/useAdmin';
const sharedLinks = (
    <>
    <li className='mt-3'>
        <Link to="/">
            <MdDashboard />Home
        </Link>
    </li>
    <li>
        <Link    to="">
            <FaCartPlus />Menu
        </Link>
    </li>
    <li>
        <Link to="">
            <FaLocationArrow />Order Tracking
        </Link>
    </li>
    <li >
        <Link to="">
            <FaQuestionCircle />Customer report
        </Link>
    </li>
    </>
);
const DashBoardlayout = () => {
  const { loading }=useAuth();
  const [isAdmin,isAdminLoading] = useAdmin();
  // const isAdmin = true;
  return (
    <div>
      {
        isAdmin ? (<div className="drawer sm:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className='flex items-center justify-between mx-4 '>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden ">
                <MdDashboard />
                </label>
                <button className="btn bg-yellow flex items-center gap-2 rounded-full px-6 text-white sm:hidden">
                Logout
                </button>
            </div>
            <div className='mt-5 md:mt-2 mx-4'>
              <Outlet/>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay">
            </label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                 <Link to="/dashboard" className='flex justify-start mb-3'>
                 <img src={logo} className='h-8 w-20'></img>
                 <div className="badge bg-[#8F00FF] text-white">Admin</div>
                 </Link>
                </li>
              <li>
                
                    
                 <Link to="/dashboard" className='mt-3'><MdDashboard />Dashboard</Link>
                </li>
                <li>
              <Link to=""><FaShoppingBag />
              Manage Booking</Link>
              </li>
              <li>
              <Link to="add-menu">
              <RiMenuAddFill />
        Add Menu</Link>
              </li>
              <li>
              <Link to="/dashboard/manage-items">
                <FaEdit/>Manage Items</Link>
              </li>
              <li>
              <Link to="/dashboard/users"><FaUsers />
              All Users</Link>
              </li>
                {/* sharedLinks
                 */}
                 {
                      sharedLinks
                 }
            </ul>
          </div>
        </div>):(
          <Signup/>
        )
      }
    </div>
  )
}

export default DashBoardlayout
