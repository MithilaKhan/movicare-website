"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LuMessageSquareText, LuTicket } from 'react-icons/lu';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { RxPerson } from 'react-icons/rx';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [

        {
            key: "/current-booking",
            icon: <LuTicket style={{ height: "34px", width: "24px", color: pathname === "/current-booking" ? "#07AFF8" : "#606060" }}/>,
            label: "Current Booking"
        },
        {
            key: "/booking-history",
            icon: <AiOutlineFieldTime style={{ height: "34px", width: "24px", color: pathname === "/booking-history" ? "#07AFF8" : "#606060" }} />,
            label: "Booking History"
        },
        {
            key: "/account-information",
            icon: <RxPerson style={{ height: "34px", width: "24px", color: pathname === "/account-information" ? "#07AFF8" : "#606060" }} />,
            label: "Account Information"
        },
        {
            key: "/review-feedback",
            icon: <LuMessageSquareText style={{ height: "34px", width: "24px", color: pathname === "/review-feedback" ? "#07AFF8" : "#606060" }} />,
            label: "Reviews & Feedback"
        },
    ];

    return (
        <div className="h-full ">
            <div className="flex flex-col h-full lg:mt-0 mt-5 ">

                {/* Menu items */}
                <div className="flex-1">
                    {menuItems.map((item) => (
                        <Link href={item.key} key={item.key}>
                            <div className={`flex items-center 
                                border-b border-[#E7E7E7] ps-[60px] 
                                  gap-2 p-2 rounded-md   py-[14px] hover:bg-gray-100 ${pathname === item.key ? 'bg-blue-50' : ''}`}>
                                <span>{item.icon}</span>                            
                                    <span className={`text-sm  font-normal ${pathname === item.key ? "text-[#07AFF8]" : "text-[#606060]"}`}>
                                        {item.label}
                                    </span>                              
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;