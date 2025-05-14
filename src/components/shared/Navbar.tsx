/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useEffect } from "react";
import { HiChevronDown, HiOutlineMenuAlt3 } from "react-icons/hi";
import { Drawer } from 'antd'; // Import Drawer from Ant Design
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5"; 
import Cookies from "js-cookie"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});  
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
    document.cookie = `googtrans=${googleTransValue}; path=/; max-age=${
      30 * 24 * 60 * 60
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
 


  const toggleDropdown = (index: number) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const menuRef = useRef(null);
  const pathname = usePathname();

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

  const logoSrc = ["/", "/home", "/services"].includes(pathname) ? "/logo.png" : "/logo2.png";

  return (
    <div className="w-full absolute top-0 left-0 z-50">
      {
        pathname === "/" || pathname === "/home" ? (
          <div className="bg-[#202020] text-white h-[40px] flex items-center justify-center">
            <div className=" flex items-center justify-between lg:text-[16px] text-xs container ">
              <p className=" flex items-center gap-1 "> <span className="font-thin tracking-wide">Need Support Call Us: </span> <span> +1 (480) 555-0103 </span>  </p>
              <p className="flex items-center gap-3"> <span className={`  lg:text-[16px] text-xs cursor-pointer 
              ${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("en")}>En</span> <span className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es</span></p>
            </div>
          </div>
        ) : ""
      }

      <div className={`${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#aababc]" : "text-content2 "}`}>
        <div className="navbar flex py-6 container justify-between lg:items-center items-center relative">


          {/* Logo */}
          <img src={logoSrc} alt="" className=" w-16 h-16 object-fill" />

          {/* Nav Menu for Large Devices */}
          <div ref={menuRef} className={`absolute lg:relative top-16 left-0 lg:top-0 lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20" : "bg-[#f0f3f1] "} lg:rounded-full lg:px-6 shadow-lg lg:shadow-none p-5 lg:p-0 space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 text-[16px] ${isMenuOpen ? "block" : "hidden"}`}>
            {navOptions.map((option, index) => {
              const isActive = pathname === option.path;
              const isDropdown = !!option.subOptions;

              if (isDropdown) {
                return (
                  <div key={index} className="relative group hidden lg:block"   onMouseEnter={() => setIsDropdownOpen(true)}
  // onMouseLeave={() => setIsDropdownOpen(false)} 
  >
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
                    <div className={`absolute top-full left-0 mt-2 py-4 px-2 w-[240px] ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20 backdrop-blur-lg border-none drop-shadow-none text-white" : "bg-[#f0f3f1] text-[#4E4E4E] "} border rounded-md shadow-lg z-50 transition-all duration-300 ${isDropdownOpen ? "block" : "hidden"}`}>
                      {option.subOptions?.map((subOption, subIndex) => (
                        <Link
                          key={subIndex}
                          href={`/services`}
                          className="block px-4 py-2.5 text-sm hover:bg-white hover:text-content3 rounded-full"
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
                  className={`nav-link flex flex-col items-center justify-center px-3 py-[14px] rounded-lg ${isActive ? ["/", "/home", "/services"].includes(option.path) ? "text-[#FFFFFF]" : "text-content2" : "hover:text-content2"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
 

           {/* Mobile menu toggle */}
           <button
            className="lg:hidden z-50  pb-2"
            onClick={() => setDrawerVisible(true)} // Open Drawer on mobile
          >
            <HiOutlineMenuAlt3 size={30} className={`${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-white" : "text-content3 "} cursor-pointer `}  />
          </button> 

          {/* Right Icons */}
          <div className="nav-icons lg:flex items-center gap-x-4  hidden ">
            <Link href="/login">
              <p className=" text-sm font-normal text-content1">Login</p>
            </Link>
            <div>
              <button className={`text-[14px] py-3 px-4 rounded-full font-medium ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#070707] bg-white" : "bg-primary text-white"}`}>Reserve Your Ride</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="flex items-center justify-between">
            <img src="/logo.png" alt="" className=" w-16 h-16 object-fill" />
            <p> <IoCloseSharp onClick={() => setDrawerVisible(false)} size={24} color="#fff"  className="cursor-pointer" /> </p>
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
                          <Link key={subIndex} href="/services" onClick={() => setDrawerVisible(false)}>
                            <div className="py-2 text-[#FFFFFF]/60 text-lg">{subOption.label}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={index} href={option.path} onClick={() => setDrawerVisible(false)}>
                  <div className={`py-3 px-4 text-2xl font-light border-b border-[#4E4E4E] pb-6 ${isActive ? "text-[#FFFFFF]" : "text-[#FFFFFF]/60"}`}>
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
    </div>
  );
};

export default Navbar;
