'use client';

import { Select } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { IoIosArrowDown } from 'react-icons/io';
import SidebarForMobile from './SidebarForMobile';
import { RxHamburgerMenu } from 'react-icons/rx';
import { userContext } from '@/helpers/UserProvider';
import { imageUrl } from '@/redux/base/baseApi';

const ProfileNavbar = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<string | null>("es")
  const [drawerVisible, setDrawerVisible] = useState(false);
  const userContextValue = useContext(userContext)
  const user = userContextValue?.user


  useEffect(() => {
    const storedLanguage = Cookies.get("currentLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);


  const switchLanguage = (lang: string) => {
    Cookies.set("currentLanguage", lang, {
      expires: 30,
      domain: "www.movicare.cr",
      secure: true,
      sameSite: "Lax",
    });

    setLanguage(lang);

    window.location.hash = `#googtrans/en/${lang}`;

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };


  const handleSelectLanguage = (value: string) => {
    switchLanguage(value);
  };

  return (
    <div className="w-full lg:h-[100px] h-20 bg-white overflow-hidden border-b border-gray-200 ">
      <div className="flex items-center justify-between h-full lg:px-[60px] px-5">

        <div className=' flex items-center gap-2'>
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden z-50  pb-2"
            onClick={() => setDrawerVisible(true)} // Open Drawer on mobile
          >
            <RxHamburgerMenu size={22} className={`text-content3 cursor-pointer `} />
          </button>
          <img src="/logo2.png" alt="" onClick={() => router.push("/")} className=" lg:w-16 lg:h-16 w-14 h-14 object-fill cursor-pointer" />

        </div>


        <div className="flex items-center gap-3 h-full">
          {/* Language Selector */}
          <Select
            style={{ width: 140, height: 50, border: 'none' }}
            variant="borderless"
            value={language}
            onChange={handleSelectLanguage}
            suffixIcon={<IoIosArrowDown size={18} />}
          >
            <Select.Option value="en">
              <div className="flex items-center ">
                <img
                  src="/englend.jpg"
                  alt="English Flag"
                  className="mr-2 rounded-full lg:w-8 lg:h-8 w-6 h-6"
                />
                <span className='lg:text-[16px] text-sm font-medium'> English </span>
              </div>
            </Select.Option>
            <Select.Option value="es">
              <div className="flex items-center">
                <img
                  src="/spain.jpg"
                  alt="Swedish Flag"
                  className="mr-2 rounded-full lg:w-8 lg:h-8 w-6 h-6"
                />
                <span className='lg:text-[16px] text-sm font-medium'> Spanish </span>

              </div>
            </Select.Option>
          </Select>

          {/* Profile Section */}
          <div className=' lg:block hidden'>
            <Link
              href="/account-information"
              className="flex items-center gap-2 h-[55px] px-2 rounded-md hover:bg-gray-100 transition"
            >
              <Image
                src={user?.image?.startsWith("https") ? user?.image : `${imageUrl}${user?.image}`}
                alt={""}
                width={50}
                height={50}
                className="rounded-full"
              />
              <h2 className="text-black text-[16px] font-semibold">
                {user?.name}
              </h2>
            </Link>

          </div>
        </div>
      </div>
      <SidebarForMobile drawerVisible={drawerVisible} setDrawerVisible={setDrawerVisible} />
    </div>
  );
};

export default ProfileNavbar;
