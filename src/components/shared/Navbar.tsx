"use client"
import { useState, useRef } from "react";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CmnButton from "./CmnButton";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter(); 

  const profile = {
    data: {
      profile: "/user1.jpg",
      name: "John",
    },
  }
  const navOptions = [
    { label: "Home", path: "/" },
    { label: "I'm a Brand", path: "/brand" },
    { label: "I'm a Creator", path: "/creator" },
    { label: "Contact Us", path: "/contact" },
  ]; 



  return (
    <div className="  w-full text-[#aababc] absolute top-0 left-0  z-50 ">
      <div className="navbar flex  py-6 container  justify-between items-center relative">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden z-50"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <HiX size={30} /> : <HiOutlineMenuAlt3 size={30} />}
        </button>

        {/* Logo */}
       <img src="/logo.png" alt="" className=" w-16 h-16" />
        {/* Nav Menu */}
        <div
          ref={menuRef}
          className={`absolute lg:relative top-16 left-0 lg:top-0  lg:left-auto w-full lg:w-auto lg:flex flex-col lg:flex-row bg-[#224e54] lg:rounded-full lg:px-6 shadow-lg lg:shadow-none p-5 lg:p-0 space-y-4 lg:space-y-0 lg:space-x-6 transition-all duration-300 z-50 text-[16px] ${isMenuOpen ? "block" : "hidden"
            }`}
        >
          {navOptions.map((option, index) => {
            if (!option.path) {
            
              return (
                <div
                  key={index}
                  className="nav-link flex items-center justify-center flex-col px-3 "
                >
                  {option.label}
                </div>
              );
            }
            
            return (
              <Link key={index} href={option.path}

                className={`nav-link flex flex-col items-center justify-center px-3 py-[14px] rounded-lg ${pathname === option.path
                    ? "text-[#FFFFFF]"
                    : "hover:text-[#FFFFFF]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {option.label}

              </Link>
            );
          })}
        </div>

        {/* Right Icons */}
        <div className="nav-icons flex gap-4">  
            <div> 
          {  

profile?.data ? <div className="flex items-center gap-2" onClick={()=>router.push("/brand-home")}> 
 <img className="lg:w-12 lg:h-12 w-10 h-10 rounded-full" src={profile?.data?.profile} alt="profile" /> 
 <p className="text-white text-lg lg:block hidden">{profile?.data?.name}</p>
</div> :  <Link href="/login">
            <CmnButton className=" py-3 px-8 rounded-xl font-medium">Login</CmnButton>
          </Link>
          }

            </div> 
 
          {/* reserve your ride   */}
            <div> 
  <button className="text-[14px] text-[#070707] bg-white py-3 px-4 rounded-full font-medium"> Reserve Your Ride </button>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;