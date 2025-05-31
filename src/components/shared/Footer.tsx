"use client";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie"; 
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const router = useRouter(); 
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
  


  return (
    <div className="bg-black lg:h-[510px] lg:pb-0 pb-5" style={{
      backgroundImage: `url('/footerbg.svg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover',

    }}>

      <div className=" flex lg:flex-row flex-row lg:items-center items-start justify-between pt-[56px]  text-white container mx-auto gap-8">
        <div className="lg:w-[45%] w-full space-y-5 flex flex-col items-start lg:gap-[50px] gap-5">

          <div className="">
            <h1 className="lg:text-[14px] text-[12px] font-normal lg:mb-6 mb-2 text-[#a0a2a1]">Contact us</h1>
            <ul className="space-y-4 lg:text-[16px] text-sm text-white font-normal">
              <p className=" " >+1 (480) 555-0103</p>
              <p className=" ">Hello@Movicare.com</p>
            </ul>
          </div>

          <div className="">
            <h1 className="lg:text-[14px] text-[12px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Location</h1>
            <ul className="space-y-4 lg:text-[16px] text-sm text-white font-normal">
              <p className=" tracking-wide" >2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
            </ul>
          </div>

          <div className="flex lg:flex-row flex-row items-center justify-between lg:gap-[96px] gap-0">
            <div className=" w-full">
              <h1 className="lg:text-[14px] text-[12px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Follow us</h1>
              <div className="flex gap-5">

                <div className="lg:p-2 p-1  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaFacebook size={25} />
                </div>

                <div className="lg:p-2 p-1  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaInstagram size={25} />
                </div>

                <div className="lg:p-2 p-1   rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaLinkedin size={25} />
                </div>

              </div>
            </div>

            <div className=" w-full lg:block hidden">
              <h1 className="text-[14px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Let’s chat</h1>
              <div className="flex gap-5">

                <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <PhoneCall size={25} />
                </div>

                <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaTelegramPlane size={25} />
                </div>


                <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaWhatsapp size={25} />
                </div>

              </div>
            </div>

          </div>


        </div>

        <div className="lg:w-[45%] w-full space-y-5 flex flex-col lg:items-center lg:gap-[50px] ">

          <div>
            <h1 className="lg:text-[14px] text-[12px] font-normal mb-6 lg:mt-0 mt-0 text-[#a0a2a1]">Navigation</h1>
            <ul className="lg:space-y-4 space-y-3 lg:text-[16px] text-sm text-white font-normal">
              <p className="cursor-pointer  " onClick={() => router.push("/terms")} >Terms & Conditions</p>
              <p className="cursor-pointer  " onClick={() => router.push("/services")} >Transport Services</p>
              <p className="cursor-pointer  " onClick={() => router.push("/services")} >Activities & Tours</p>
              <p className="cursor-pointer  " onClick={() => router.push("/")} >Rates & Booking</p>
              <p className="cursor-pointer  " onClick={() => router.push("/privacy")} >Privacy Policy</p>
              <p className="cursor-pointer  " onClick={() => router.push("/about")} >About us</p>

            </ul>
          </div>

          <div className=" w-full block lg:hidden">
            <h1 className="text-[14px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Let’s chat</h1>
            <div className="flex gap-5">

              <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                <PhoneCall size={25} />
              </div>

              <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                <FaTelegramPlane size={25} />
              </div>


              <div className="p-2  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                <FaWhatsapp size={25} />
              </div>

            </div>
          </div>

          <div className="lg:flex hidden  justify-between lg:ms-24  gap-[96px]">
            <p className=" text-sm text-[#a0a2a1]"> © 2025 — Movicare </p>
            <p className=" flex items-center gap-3  text-sm text-[#a0a2a1] ">  <span className={`${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"} cursor-pointer`} onClick={() => switchLanguage("en")}>En </span> <span  className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es </span></p>
          </div>
        </div>
      </div> 

<div className="block lg:hidden"> 
      <div className=" flex   justify-between lg:ms-24  gap-[96px] px-2 mt-5 py-3">
        <p className=" text-sm text-[#a0a2a1]"> © 2025 — Movicare </p>
         <p className=" flex items-center gap-3  text-sm text-[#a0a2a1] ">  <span className={`${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"} cursor-pointer`} onClick={() => switchLanguage("en")}>En </span>  <span  className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es </span></p>
      </div>

</div>

    </div>
  );
};

export default Footer; 