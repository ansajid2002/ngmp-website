import React, { useState } from 'react'
import Header from '../Header'
import SellerForm from './SellerForm'
import { IoMdPeople } from 'react-icons/io'
import { RiLockPasswordLine, RiVolumeOffVibrateFill, RiWallet2Line } from 'react-icons/ri'
import { FcCustomerSupport } from 'react-icons/fc'
import { FaChevronRight } from 'react-icons/fa'
import { Modal } from 'antd'
import FAQ from './Faqs'

const SellerLanding = () => {
  const [onModal, setModal] = useState(false)
  const styling = {
    backgroundImage: "url('https://static-assets-web.flixcart.com/fk-sp-static/images/prelogin/banner/Desktop_sell.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }

  const data = [
    {
      id: 1,
      icon: <IoMdPeople />,
      label: "Thousand+ Nile Customers",
    },
    {
      id: 2,
      icon: <RiWallet2Line />,
      label: "7* days secure & regular payments",
    },
    {
      id: 3,
      icon: <RiVolumeOffVibrateFill />,
      label: "Low cost of doing business",
    },
    {
      id: 4,
      icon: <FcCustomerSupport />,
      label: "One click Seller Support",
    },
    {
      id: 5,
      icon: <RiLockPasswordLine />,
      label: "Access to The Big Billion Days & more",
    },
  ]

  const handleModal = (modal) => {
    setModal(modal)
  }
  return (
    <div >
      <Header onModal={handleModal} />
      <div className='flex flex-col gap-5 py-14 md:py-20 px-5 md:px-8 font-medium' style={styling}>
        <ul className='flex items-center justify-start gap-1 text-gray-500 '>
          <li>Home</li>
          <FaChevronRight size={10} />
          <li>Sell Online</li>
        </ul>
        <h1 className='text-xl sm:text-2xl md:w-full w-1/2 md:text-5xl' >Sell Online With Nile Market-place</h1>
        <p className='w-full md:w-1/2'>Whether you are already a successful business person or have a great idea and a passion to sell, you are just a few steps away from selling on Nile Market-place</p>
      </div>

      <div className='px-2 py-20 md:px-10'>
        <ul className=' flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between'>
          {
            data?.map((item) => (
              <li key={item.id} className='p-3 md:p-10 w-[50%] md:w-full flex items-center gap-2 justify-center flex-col'>
                <span className='text-2xl md:text-7xl text-orange-400'>{item.icon}</span>
                <span className='text-base md:text-xl font-medium text-center text-gray-500'>{item.label}</span>
              </li>
            ))
          }
        </ul>
      </div>
      <div className='px-10 py-20'>
        <FAQ />
      </div>
      <div className='py-10 px-5 md:py-24 md:px-2' id='form'>
        <Modal
          visible={onModal}
          width={1200}
          footer={null}
          onCancel={() => setModal(false)}
          maskClosable={false}
          title={'Create Vendor Account'}
        >

          <SellerForm onModal={handleModal} />
        </Modal>
      </div>
    </div>
  )
}

export default SellerLanding