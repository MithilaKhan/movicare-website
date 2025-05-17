/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoCloseSharp } from "react-icons/io5";
import { Drawer } from 'antd';
import { HiChevronDown } from "react-icons/hi";
import Link from "next/link";

const NavbarMobile = ({ toggleDropdown, drawerVisible, openDropdowns, navOptions, setDrawerVisible, pathname, handleServiceClick }: {
    toggleDropdown: (index: number) => void,
    drawerVisible: boolean, openDropdowns: { [key: number]: boolean },
    navOptions: {
        label: string,
        path?: string | undefined,
        subOptions?: { label: string, value: string }[] | undefined
    }[],
    setDrawerVisible: (visible: boolean) => void, pathname: string,
    handleServiceClick: (id: string) => void
}) => {


    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <img src="/logo.png" alt="" className=" w-16 h-16 object-fill" />
                    <p> <IoCloseSharp onClick={() => setDrawerVisible(false)} size={24} color="#fff" className="cursor-pointer" /> </p>
                </div>
            }
            placement="left"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            width="90%"
            style={{ backgroundColor: "#202020" }}
            className=" relative"
        >
            <div className="flex flex-col ">
                <div className=" flex flex-col ">
                    {navOptions.map((option, index) => {
                        const isActive = pathname === option.path;
                        const isDropdown = !!option.subOptions;
                        const isOpen = openDropdowns[index]; // Check if this dropdown is open

                        if (isDropdown) {
                            return (
                                <div key={index} className="border-b border-[#4E4E4E] pb-4 py-3 px-4">
                                    <div
                                        className={`cursor-pointer flex items-center justify-between text-2xl font-light ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"}`}
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
                            <Link key={index}  href={option.path} onClick={() => setDrawerVisible(false)}>
                                <div className={`py-3 px-4 text-2xl font-light cursor-pointer border-b border-[#4E4E4E] pb-6 ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"}`}>
                                    {option.label}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className=" absolute bottom-4  ">
                    <div className="w-[300px]">

                        <button className={`text-[14px] py-3 w-full   rounded-full  font-medium text-[#070707] bg-white `}>Reserve Your Ride</button>

                        <Link href="/login">
                            <p className=" text-[16px] font-normal text-white text-center mt-5">Login</p>
                        </Link>

                    </div>
                </div>

            </div>
        </Drawer>
    );
};

export default NavbarMobile;