/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoCloseSharp } from "react-icons/io5";
import { Drawer } from 'antd';
import { HiChevronDown } from "react-icons/hi";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "@/helpers/UserProvider";
import Image from "next/image";
import { imageUrl } from "@/redux/base/baseApi";

const NavbarMobile = ({ toggleDropdown, drawerVisible, openDropdowns, navOptions, setDrawerVisible, pathname, handleServiceClick }: {
    toggleDropdown: (index: number) => void,
    drawerVisible: boolean, openDropdowns: { [key: number]: boolean },
    navOptions: {
        label: string | JSX.Element | undefined,
        path?: string | undefined,
        subOptions?: { label: string, value: string }[] | undefined
    }[],
    setDrawerVisible: (open: boolean) => void, pathname: string,
    handleServiceClick: (id: string) => void
}) => {

    const userContextValue = useContext(userContext);
    const user = userContextValue?.user;
    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <img src="/logo.png" alt="" className=" w-12 h-12 object-fill" />
                    <p> <IoCloseSharp onClick={() => setDrawerVisible(false)} size={20} color="#fff" className="cursor-pointer" /> </p>
                </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width="90%"
            style={{ backgroundColor: "#202020" }}
            className=" relative"
        >
            <div className="flex flex-col ">
                <div className=" flex flex-col ">
                    {navOptions.map((option: { label: string | JSX.Element | undefined, path?: string, subOptions?: { label: string, value: string }[] | undefined }, index: number) => {
                        const isActive = pathname === option.path;
                        const isDropdown = !!option.subOptions;
                        const isOpen = openDropdowns[index]; // Check if this dropdown is open

                        if (isDropdown) {
                            return (
                                <div key={index} className="border-b border-[#4E4E4E] pb-4 py-3 px-4">
                                    <div
                                        className={`cursor-pointer flex items-center justify-between text-lg font-normal ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"}`}
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        <span>{option.label}</span>
                                        <span>
                                            <HiChevronDown
                                                className={`ml-1 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </span>
                                    </div>
                                    {isOpen && (
                                        <div className="py-4">
                                            {option.subOptions?.map((subOption, subIndex) => (
                                                <p key={subIndex} onClick={() => { handleServiceClick(subOption.value); setDrawerVisible(false) }}>
                                                    <div className="py-2 text-[#FFFFFF]/60 text-lg">{subOption.label}</div>
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link key={index} href={option.path ?? "/"} onClick={() => setDrawerVisible(false)}>
                                <div className={`py-3 px-4 text-lg font-normal cursor-pointer border-b border-[#4E4E4E] pb-6 ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"}`}>
                                    {option.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className=" absolute bottom-6  w-[90%]">
                    <div className="w-full">

                        <a className={`text-[14px] py-3 w-full mb-4   rounded-full  font-medium text-[#070707] bg-white `}
                            href="https://wa.me/50660191762"
                            target="_blank"
                            rel="noopener noreferrer"
                        >Reserve Your Ride</a>
                        {
                            user ? (
                                <div
                                    // href="/account-information"
                                    className="flex items-center justify-center gap-2 h-[48px] px-2  cursor-pointer  transition border border-white rounded-full"
                                >
                                    <Image
                                        src={user?.image?.startsWith("http") ? user?.image : `${imageUrl}${user?.image}`}
                                        alt={'User Profile'}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <h2 className={` text-[16px] font-medium text-white text-center  `}>
                                        {user?.name}
                                    </h2>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <p className=" text-[16px] font-normal text-white text-center mt-3">Login</p>
                                </Link>
                            )
                        }


                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default NavbarMobile;