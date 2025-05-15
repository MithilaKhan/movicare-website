'use client';

import { Select } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { IoIosArrowDown } from 'react-icons/io';

const ProfileNavbar = () => {
  const router = useRouter();
  const profileData = {
    name: 'John Doe',
    email: 'B2DyY@example.com',
  };
  const [language, setLanguage] = useState<string | null>("en")

  // for translate  

  useEffect(() => {
    const storedLanguage = Cookies.get("currentLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);


  // Switch Language Function
  const switchLanguage = (lang: string) => {
    // Store selected language in cookies
    Cookies.set("currentLanguage", lang, { expires: 30 });

    // Correctly set the Google Translate cookie (googtrans)
    const googleTransValue = `/en/${lang}`;

    // Remove any existing "googtrans" cookies before setting a new one
    document.cookie =
      "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    // after add domain 
    // document.cookie =
    //   "googtrans=; domain=.1plus1dating.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Replace with your actual domain

    // Now, set the new "googtrans" cookie
    document.cookie = `googtrans=${googleTransValue}; path=/; max-age=${30 * 24 * 60 * 60
      }`;

    // for domain 
    // document.cookie = `googtrans=${googleTransValue}; domain=.1plus1dating.com; path=/; max-age=${
    //   30 * 24 * 60 * 60
    // };`;

    // Update state
    setLanguage(lang);

    // Reload the page to apply the translation
    window.location.reload();
  };




  const handleSelectLanguage = (value: string) => {
    switchLanguage(value);
  };

  return (
    <div className="w-full h-[100px] bg-white overflow-hidden border-b border-gray-200 ">
      <div className="flex items-center justify-between h-full px-[60px]">
        <img src="/logo2.png" alt="" onClick={() => router.push("/")} className=" w-16 h-16 object-fill cursor-pointer" />

        <div className="flex items-center gap-3 h-full">
          {/* Language Selector */}
          <Select
            style={{ width: 140, height: 50, border: 'none' }}
            bordered={false}
            value={language}
            onChange={handleSelectLanguage} 
            suffixIcon={<IoIosArrowDown size={18} />}
          >
            <Select.Option value="en">
              <div className="flex items-center ">
                <img
                  src="/englend.jpg"
                  alt="English Flag"
                  className="mr-2 rounded-full w-8 h-8"
                />
                <span className='text-[16px] font-medium'> English </span>
              </div>
            </Select.Option>
            <Select.Option value="es">
              <div className="flex items-center">
                <img
                  src="/spain.jpg"
                  alt="Swedish Flag"
                  className="mr-2 rounded-full w-8 h-8"
                />
                <span className='text-[16px] font-medium'> Spanish </span>

              </div>
            </Select.Option>
          </Select>

          {/* Profile Section */}
          <Link
            href="/settings"
            className="flex items-center gap-2 h-[55px] px-2 rounded-md hover:bg-gray-100 transition"
          >
            <Image
              src="/user1.jpg"
              alt={profileData?.name || 'User Profile'}
              width={50}
              height={50}
              className="rounded-full"
            />
            <h2 className="text-black text-[16px] font-semibold">
              {profileData?.name || 'Guest'}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavbar;
