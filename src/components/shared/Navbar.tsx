"use client"
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef, useEffect, useContext } from "react";
import { HiChevronDown, HiOutlineMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NavbarMobile from "./NavbarMobile";
import Image from "next/image";
import { useGetServicesQuery } from "@/redux/features/others/services/servicesSlice";
import { userContext } from "@/helpers/UserProvider";
import { imageUrl } from "@/redux/base/baseApi";
import { FaHome } from "react-icons/fa";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [language, setLanguage] = useState<string | null>("es")
  const router = useRouter()
  const { data: services } = useGetServicesQuery(undefined);
  const userContextValue = useContext(userContext);
  const user = userContextValue?.user;
  const image = user?.image?.startsWith("https") ? user?.image : `${imageUrl}${user?.image}`

  // for translate  

  useEffect(() => {
    const storedLanguage = Cookies.get("currentLanguage");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);


  // Switch Language Function
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



  const toggleDropdown = (index: number) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const menuRef = useRef(null);
  const pathname = usePathname();


  const category = {
    data: (services ?? []).map((item: { name: string; _id: string }) => ({
      name: item.name,
      _id: item._id,
    })),
  };

  const navOptions = [
    {
      label: (
        <span className="flex items-center gap-1">
          <FaHome className="text-lg" />
        </span>
      ), path: "/"
    },
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


  const handleServiceClick = (id: string) => {
    router.push(`/services?scrollTo=${id}`);
  };


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
              <div className=" flex items-center gap-1 "> <p className="font-thin tracking-wide">Need Support Call Us: </p> <a
                href="tel:+50660191762"
                target="_blank"
                className=" cursor-pointer" > +506 6019-1762 </a>  </div>

              <p className="flex items-center gap-3"> <span className={`  lg:text-[16px] text-xs cursor-pointer 
              ${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("en")}>En</span> <span className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es</span></p>
            </div>
          </div>
        ) : ""
      }

      <div className={`${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#aababc]" : "text-content2 "}`}>
        <div className="navbar flex lg:pt-6 lg:pb-6 pt-0 pb-5 lg:px-1  container justify-between lg:items-center items-center relative">


          {/* Logo */}
          <img src={logoSrc} alt="" onClick={() => router.push("/")} className=" w-16 h-16 object-fill cursor-pointer" />

          {/* Nav Menu for Large Devices */}
          <div ref={menuRef} className={`absolute lg:relative top-16 left-0 lg:top-0 lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20" : "bg-[#f0f3f1] "} lg:rounded-full lg:px-6 shadow-lg lg:shadow-none p-5 lg:p-0 space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 text-[16px] ${isMenuOpen ? "block" : "hidden"}`}>
            {navOptions.map((option, index) => {
              const isActive = pathname === option.path;
              const isDropdown = !!option.subOptions;

              if (isDropdown) {
                return (
                  <div key={index} className="relative group hidden lg:block" onMouseEnter={() => setIsDropdownOpen(true)}
                  // onMouseLeave={() => setIsDropdownOpen(false)} 
                  >
                    <div
                      className="flex items-center cursor-pointer px-3 py-[14px] rounded-lg"
                      onClick={() => setIsDropdownOpen(prev => !prev)}
                    >
                      <span className={`nav-link ${["/services"].includes(pathname) ? "text-[#FFFFFF]" : "text-content2"}`}>
                        {option.label}
                      </span>
                      <HiChevronDown
                        className={`ml-1 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </div>

                    {/* Dropdown on hover */}
                    <div className={`absolute top-full left-0 mt-2 py-4 px-2 w-[240px] ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "bg-[#000000]/20 backdrop-blur-lg border-none drop-shadow-none text-white" : "bg-[#f0f3f1] text-[#4E4E4E] "} border rounded-md shadow-lg z-50 transition-all duration-300 cursor-pointer ${isDropdownOpen ? "block" : "hidden"}`}>
                      {option.subOptions?.map((subOption: { value: string, label: string }, subIndex) => (
                        <div
                          key={subIndex}
                          className="block px-4 py-2.5 text-sm hover:bg-white hover:text-content3 rounded-full cursor-pointer"
                          onClick={() => { handleServiceClick(subOption.value); setIsDropdownOpen(false) }}
                        >
                          {subOption.label}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={option.path}
                  className={`nav-link flex flex-col items-center justify-center px-3 py-[14px] rounded-lg cursor-pointer ${isActive ? ["/", "/home", "/services"].includes(option.path) ? "text-[#FFFFFF]" : "text-content1" : "text-content2"}`}
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
            <HiOutlineMenuAlt3 size={30} className={`${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-white" : "text-content3 "} cursor-pointer `} />
          </button>

          {/* Right Icons */}
          <div className="nav-icons lg:flex items-center gap-x-4  hidden ">
            {
              user ? <div
                // href="/account-information"  

                className="flex items-center gap-2 h-[55px] px-2 rounded-md cursor-pointer  transition"
              >
                <Image
                  src={image}
                  alt={'User Profile'}
                  width={44}
                  height={44}
                  className="rounded-full h-11 w-11 object-cover cursor-pointer"
                />
                <h2 className={` text-[16px] font-medium ${pathname === "/services" ? "text-white" : "text-content1"}`}>
                  {user?.name}
                </h2>
              </div> :
                <Link href="/login">
                  <p className={`text-sm font-normal ${pathname === "/services" ? "text-white" : "text-content1"} `}>Login</p>
                </Link>
            }

            <div>
              <a className={`text-[14px] py-3 px-4 rounded-full font-medium cursor-pointer  ${pathname === "/" || pathname === "/home" || pathname === "/services" ? "text-[#070707] bg-white" : "bg-primary text-white"}`}
                // onClick={() => router.push("/select-service")} 
                href="https://wa.me/50660191762"
                target="_blank"
                rel="noopener noreferrer"
              >Reserve Your Ride</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <NavbarMobile toggleDropdown={toggleDropdown} drawerVisible={drawerVisible} openDropdowns={openDropdowns} navOptions={navOptions} setDrawerVisible={setDrawerVisible} pathname={pathname} handleServiceClick={handleServiceClick} />
    </div>
  );
};

export default Navbar;
