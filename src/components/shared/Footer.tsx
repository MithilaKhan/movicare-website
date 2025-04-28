"use client";
import { PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTelegramPlane,
    FaWhatsapp,
  } from "react-icons/fa";

const Footer = () => { 
  const router = useRouter();
    return (
        <div className="bg-black lg:h-[510px] lg:pb-0 pb-5"  style={{
            backgroundImage: `url('/footerbg.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
            backgroundColor: "#ffe6f7"
        }}> 

        <div className=" flex lg:flex-row flex-col items-center justify-between pt-[56px]  text-white container mx-auto"> 
            <div className="lg:w-[45%] w-full space-y-5 flex flex-col items-start gap-[50px]">  

             <div className="">
     <h1 className="text-[14px] font-normal mb-6 text-[#a0a2a1]">Contact us</h1>
   <ul className="space-y-4 text-[16px] text-white font-normal">
     <p className=" " >+1 (480) 555-0103</p>
     <p className=" ">Hello@Movicare.com</p>
   </ul>
</div> 

             <div className="">
     <h1 className="text-[14px] font-normal mb-6 text-[#a0a2a1]">Location</h1>
   <ul className="space-y-4 text-[16px] text-white font-normal">
     <p className=" " >2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>
   </ul>
</div> 

<div className="flex items-center justify-between gap-[96px]"> 
<div className=" w-full">
 <h1 className="text-[14px] font-normal mb-6 text-[#a0a2a1]">Follow us</h1>
   <div className="flex gap-5">
 
       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <FaFacebook size={25} />
       </div>
    
       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <FaInstagram size={25} />
       </div>
  
       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <FaLinkedin size={25} />
       </div>
 
   </div>  
   </div> 

<div className=" w-full">
 <h1 className="text-[14px] font-normal mb-6 text-[#a0a2a1]">Let’s chat</h1>
   <div className="flex gap-5">
 
       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <PhoneCall size={25} />
       </div>
    
       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <FaTelegramPlane size={25} />
       </div>
  

       <div className="p-2  rounded-full border border-[#a0a2a1] w-[50px] h-[50px] flex items-center justify-center text-white">
         <FaWhatsapp size={25} />
       </div>
 
   </div>  
   </div>

</div>


            </div> 
 
 <div className="lg:w-[45%] w-full space-y-5 flex flex-col items-center gap-[50px]"> 

            <div> 
<h1 className="text-[14px] font-normal mb-6 text-[#a0a2a1]">Navigation</h1>
   <ul className="space-y-4 text-[16px] text-white font-normal">
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >Home</p>
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >Transport Services</p>
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >Activities & Tours</p>
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >Rates & Booking</p>
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >Contact Us</p>
     <p className="cursor-pointer  " onClick={()=>router.push("/")} >About us</p>

   </ul> 
            </div> 

            <div className="flex justify-between ms-24  gap-[96px]"> 
<p className=" text-sm text-[#a0a2a1]"> © 2025 — Movicare </p> 
<p className=" flex items-center gap-3  text-sm text-[#a0a2a1] ">  <span>En </span> <span>Es </span></p>
            </div>
 </div>
        </div>
     
      </div>
    );
};

export default Footer; 



// <div className="flex lg:flex-row flex-col items-center justify-center pt-20 gap-10 text-white container mx-auto">
// <div className="lg:w-[35%] w-full space-y-5">
//   <h1 className="text-3xl font-bold">Creator Brief</h1>
//   <p className="w-[90%] text-gray-300">
//     Authentic Job Bulletins for Influencer. Friendly for brands to
//     create campaign.
//   </p>

// </div>
// <div className="lg:w-[15%] w-full">
//   <h1 className="text-xl font-semibold my-5">Pages</h1>
//   <div className="space-y-2">
//     <p className="cursor-pointer "  onClick={() =>router.push("/")}>Home</p>
//     <p className="cursor-pointer "  onClick={() =>router.push("/about")}>About</p>
 
//   </div>
// </div>
// <div className="lg:w-[15%] w-full">
//   <h1 className="text-xl font-semibold my-5">Support</h1>
//   <ul className="space-y-2 ">
//     <p className="cursor-pointer " onClick={() =>router.push("/contact")}>Contact Us</p>
//     <p className="cursor-pointer " onClick={() =>router.push("/privacy")}>Privacy Policy</p>
 
//   </ul>
// </div>
// <div className="lg:w-[35%] w-full">
// <h1 className="text-xl font-semibold pb-3">Social Media</h1>
//   <div className="flex gap-5">
//     <div className="flex gap-5 text-black">
//       <div className="p-2 bg-white rounded-full">
//         <FaFacebook size={25} />
//       </div>
//     </div>
//     <div className="flex gap-5 text-black">
//       <div className="p-2 bg-white rounded-full">
//         <FaTwitter size={25} />
//       </div>
//     </div>
//     <div className="flex gap-5 text-black">
//       <div className="p-2 bg-white rounded-full">
//         <FaInstagram size={25} />
//       </div>
//     </div>
//     <div className="flex gap-5 text-black">
//       <div className="p-2 bg-white rounded-full">
//         <FaLinkedin size={25} />
//       </div>
//     </div>
//   </div>
// </div>
// </div>