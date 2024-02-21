import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it.

const Header = ({ onModal }) => {
  const handleOpenModal = () => {
    onModal(true)
  }
  return (
    <div className='h-24 sticky z-50 top-0 left-0 bg-white flex items-center text-xl justify-between md:px-10 shadow-sm'>
      <div className='pl-2'>
        <Link to="/seller">
          <img
            src="mainlogo.png"
            alt="Logo"
            className="h-16"
          />
        </Link>
      </div>
      <div>
        <ul className='flex items-center justify-center gap-5'>
          <li>
            <Link to="/Vendors/Login">Login</Link>
          </li>
          <li className='bg-orange-500 hover:bg-orange-600 text-white font-medium text-xl py-3 md:py-5 px-5 md:px-10 rounded-full transition duration-300'>
            <a href='#form' onClick={handleOpenModal}>Start Selling</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
