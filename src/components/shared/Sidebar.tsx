"use client"

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LuMessageSquareText, LuTicket } from 'react-icons/lu';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { RxPerson } from 'react-icons/rx';
import { MdLogout } from 'react-icons/md';

const menuItems = [
  {
    key: "/current-booking",
    icon: <LuTicket style={{ height: "34px", width: "24px" }} />,
    label: "Current Booking"
  },
  {
    key: "/booking-history",
    icon: <AiOutlineFieldTime style={{ height: "34px", width: "24px" }} />,
    label: "Booking History"
  },
  {
    key: "/account-information",
    icon: <RxPerson style={{ height: "34px", width: "24px" }} />,
    label: "Account Information"
  },
  {
    key: "/reviews-feedback",
    icon: <LuMessageSquareText style={{ height: "34px", width: "24px" }} />,
    label: "Reviews & Feedback"
  },
];

const Sidebar = () => {
  const pathname = usePathname();  
  const  router =  useRouter();

  const handleLogOut = () => {
    localStorage.removeItem("userEmail"); 
    router.push("/login");

  };

  return (
    <div className="h-full">
      <div className="flex flex-col h-full mt-5 lg:mt-0">
        <div className="flex-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.key;

            return ( 
              <Link href={item.key} key={item.key}>
                <div className="border-b border-[#E7E7E7] p-2 ps-[30px] h-[70px] flex items-center">
                  <div
                    className={`
                      flex items-center gap-2 ps-4 text-sm font-normal
                      ${isActive ? 'bg-primary text-white p-2 w-[250px] rounded-xl me-5' : 'text-[#606060]'}
                      hover:bg-primary hover:text-white hover:p-2 hover:ps-4 hover:rounded-xl hover:me-5 hover:w-[250px]
                    `}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                </div>
              </Link>
            );
          })} 

        </div> 
        <div className=' text-[16px] text-[#FF2F2F] flex items-center gap-1 font-medium ps-[40px] pb-10 cursor-pointer ' onClick={handleLogOut}> <span> <MdLogout size={22} /> </span> <span>Log Out  </span></div>
      </div>
    </div>
  );
};

export default Sidebar;
