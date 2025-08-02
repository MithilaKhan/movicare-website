"use client";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const router = useRouter();
  const [language, setLanguage] = useState<string | null>("es")


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
              <p className=" " >+506 6019-1762</p>
              <p className=" "> info@movicare.cr</p>
            </ul>
          </div>

          <div className="">
            <h1 className="lg:text-[14px] text-[12px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Location</h1>
            <ul className="space-y-4 lg:text-[16px] text-sm text-white font-normal">
              <p className=" tracking-wide" >San José, Costa Rica</p>
            </ul>
          </div>

          <div className="flex lg:flex-row flex-row items-center justify-between lg:gap-[96px] gap-0">
            <div className=" w-full">
              <h1 className="lg:text-[14px] text-[12px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Follow us</h1>
              <div className="flex gap-5">

                <a
                  href="https://www.facebook.com/profile.php?id=61577617058298"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="lg:p-2 p-1  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white cursor-pointer">
                    <FaFacebook size={25} />
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/movicare.cr?igsh=MWFxNWQ3bWtya3FhZg%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="lg:p-2 p-1  rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white cursor-pointer">
                    <FaInstagram size={25} />
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/company/movicare-cr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="lg:p-2 p-1   rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                    <FaLinkedin size={25} />
                  </div>
                </a>

              </div>
            </div>

            <div className="w-full lg:block hidden">
              <h1 className="text-[14px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Let’s chat</h1>
              <div className="flex gap-5">
                {/* Phone Call Link */}
                <a href="tel:+50660191762" aria-label="Call us">
                  <div className="p-2 rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                    <PhoneCall size={25} />
                  </div>
                </a>

                {/* WhatsApp Link */}
                <a
                  href="https://wa.me/50660191762"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <div className="p-2 rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                    <FaWhatsapp size={25} />
                  </div>
                </a>
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
              <p className="cursor-pointer  " suppressHydrationWarning onClick={() => router.push("/privacy")} > {"privacy policy".charAt(0).toUpperCase() + "privacy policy".slice(1)}</p>
              <p className="cursor-pointer  " onClick={() => router.push("/about")} >About us</p>

            </ul>
          </div>

          <div className="w-full block lg:hidden">
            <h1 className="text-[14px] font-normal lg:mb-6 mb-3 text-[#a0a2a1]">Let’s chat</h1>
            <div className="flex gap-5">
              {/* Phone Call Link */}
              <a href="tel:+50660191762" aria-label="Call us">
                <div className="p-2 rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <PhoneCall size={25} />
                </div>
              </a>

              {/* WhatsApp Link */}
              <a
                href="https://wa.me/50660191762"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
              >
                <div className="p-2 rounded-full border border-[#a0a2a1] lg:w-[50px] w-10 h-10 lg:h-[50px] flex items-center justify-center text-white">
                  <FaWhatsapp size={25} />
                </div>
              </a>
            </div>
          </div>

          <div className="lg:flex hidden  justify-between lg:ms-24  gap-[96px]">
            <p className=" text-sm text-[#a0a2a1]"> © 2025 — Movicare </p>
            <p className=" flex items-center gap-3  text-sm text-[#a0a2a1] ">  <span className={`${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"} cursor-pointer`} onClick={() => switchLanguage("en")}>En </span> <span className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es </span></p>
          </div>
        </div>
      </div>

      <div className="block lg:hidden">
        <div className=" flex   justify-between lg:ms-24  gap-[96px] px-2 mt-5 py-3">
          <p className=" text-sm text-[#a0a2a1]"> © 2025 — Movicare </p>
          <p className=" flex items-center gap-3  text-sm text-[#a0a2a1] ">  <span className={`${language === "en" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"} cursor-pointer`} onClick={() => switchLanguage("en")}>En </span>  <span className={`text-[#FFFFFF]/60 cursor-pointer ${language === "es" ? "font-bold text-white" : " text-[#FFFFFF]/60 font-normal"}`} onClick={() => switchLanguage("es")}>Es </span></p>
        </div>

      </div>

    </div>
  );
};

export default Footer; 