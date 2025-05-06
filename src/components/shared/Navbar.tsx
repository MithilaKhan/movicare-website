/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  // const router = useRouter();

  // const profile = {
  //   data: {
  //     profile: "/user1.jpg",
  //     name: "John",
  //   },
  // }  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        //@ts-ignore
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); 


  const category = {
    data: [
      { name: "Accessible Van Rentals", _id: "1" },
      { name: "Custom Route Planning", _id: "2" },
      { name: "Medical & Daily Transport", _id: "3" },
      { name: "Tour & Travel Assistance", _id: "4" },
      { name: "Corporate & Event Transport", _id: "5" },
    ],
  }


  const navOptions = [
    { label: "Home", path: "/" },
    {
      label: "Services",
      subOptions: category?.data?.map((item: { name: string; _id: string }) => ({
        label: item?.name,
        value: item?._id,
      })),
    },
    { label: "About", path: "/about" },
    { label: "Contact ", path: "/contact" },
  ]; 

  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [pathname]); 


  const logoSrc = ["/", "/home", "/services"].includes(pathname) ? "/logo.png" : "/logo2.png";

  return (
    <div className="w-full   absolute top-0 left-0  z-50">

      {
        pathname === "/" || pathname === "/home" ? (
          <div className="bg-[#202020] text-white h-[40px] flex items-center justify-center">
            <div className=" flex items-center justify-between text-[16px]  container ">
              <p className=" flex items-center  gap-1 "> <span className="font-thin tracking-wide">Need Support Call Us: </span> <span> +1 (480) 555-0103 </span>  </p>
              <p className="flex items-center gap-3"> <span className=" text-white font-bold text-[16px] cursor-pointer">En</span> <span className="text-[#FFFFFF]/60 cursor-pointer">Es</span></p>

            </div>
          </div>
        ) : ""
      }

      <div className={`  ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#aababc]" : "text-content2 "}`}>
        <div className="navbar flex  py-6 container  justify-between items-center relative">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden z-50"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <HiX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
          </button>

          {/* Logo */}
          <img src={logoSrc} alt="" className=" w-16 h-16 object-fill" />
          {/* Nav Menu */}
          <div
            ref={menuRef}
            className={`absolute lg:relative top-16 left-0 lg:top-0  lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row 
            ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20" : "bg-[#f0f3f1] "}    lg:rounded-full lg:px-6 shadow-lg lg:shadow-none p-5 lg:p-0 space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 text-[16px] ${isMenuOpen ? "block" : "hidden"
              }`}
          >
            {navOptions.map((option, index) => {
              const isActive = pathname === option.path;
              const isDropdown = !!option.subOptions;

              if (isDropdown) {
                return (
                  <div key={index} className="relative group hidden lg:block">
                    <div
                      className="flex items-center cursor-pointer px-3 py-[14px] rounded-lg"
                      onClick={() => setIsDropdownOpen(prev => !prev)}
                    >
                      <span className={`nav-link ${["/", "/home", "/services"].includes(pathname) ? "text-[#FFFFFF]" : "text-content2"}`}>
                        {option.label}
                      </span>
                      <HiChevronDown
                        className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </div>

                    {/* Dropdown on hover */}
                    <div className={`absolute top-full left-0 mt-2 py-4 px-2 w-[240px] ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20 backdrop-blur-lg border-none drop-shadow-none text-white" : "bg-[#f0f3f1] text-[#4E4E4E] "}    border rounded-md shadow-lg z-50 transition-all duration-300 ${isDropdownOpen ? "block" : "hidden"}`}>
                      {option.subOptions?.map((subOption, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/services`}
                          className="block px-4 py-2.5 text-sm  hover:bg-white hover:text-content3 rounded-full"
                          onClick={() => setIsDropdownOpen(false)} 
                        >
                          {subOption.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={option.path}
                  className={`nav-link flex flex-col items-center justify-center px-3 py-[14px] rounded-lg ${isActive
                    ? ["/", "/home", "/services"].includes(option.path)
                      ? "text-[#FFFFFF]"
                      : "text-content2"
                    : "hover:text-content2"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="nav-icons flex items-center gap-x-4">
            <div>
              {

                // profile?.data ? <div className="flex items-center gap-2" onClick={() => router.push("/brand-home")}>
                //   <img className="lg:w-12 lg:h-12 w-10 h-10 rounded-full" src={profile?.data?.profile} alt="profile" />
                //   <p className={` text-lg lg:block hidden ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-white" : "text-content2 "} `}>{profile?.data?.name}</p>
                // </div> :
                <Link href="/login">
                  <p className=" text-sm font-normal text-content1">Login</p>
                </Link>
              }

            </div>

            {/* reserve your ride   */}
            <div>
              <button className={`text-[14px]  py-3 px-4 rounded-full font-medium  ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#070707] bg-white" : "bg-primary text-white "} `}> Reserve Your Ride </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;