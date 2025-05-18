/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoCloseSharp } from "react-icons/io5";
import { Drawer } from 'antd';
import Link from "next/link";
import { MdLogout } from 'react-icons/md';
import { usePathname, useRouter } from "next/navigation";
import { LuMessageSquareText, LuTicket } from 'react-icons/lu';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { RxPerson } from 'react-icons/rx';


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

const SidebarForMobile = ({
    drawerVisible,
    setDrawerVisible,
}: {
    drawerVisible: boolean,
    setDrawerVisible: (open: boolean) => void,
}) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogOut = () => {
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <img src="/logo.png" alt="logo" className="w-14 h-14 object-fill cursor-pointer" onClick={() => router.push("/")} />
                    <IoCloseSharp onClick={() => setDrawerVisible(false)} size={24} color="#fff" className="cursor-pointer" />
                </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width="90%"
            style={{ backgroundColor: "#202020" }}
            className="relative"
        >
            <div>
                <div className="flex flex-col">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.key;

                        return (
                            <Link href={item.key} key={item.key}  onClick={() => setDrawerVisible(false)}>
                                <div className="border-b border-[#363636]  h-[70px] flex items-center">
                                    <div
                                        className={`
                      flex items-center gap-2  text-sm font-normal
                      ${isActive ? ' text-white font-semibold' : 'text-white/60'}
                       hover:text-white hover:font-semibold
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

                <div className="absolute bottom-0">

                    <div
                        className="text-[16px] text-[#FF2F2F] flex items-center gap-1 font-medium  pb-10 cursor-pointer"
                        onClick={handleLogOut}
                    >
                        <MdLogout size={22} />
                        <span>Log Out</span>
                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default SidebarForMobile;
