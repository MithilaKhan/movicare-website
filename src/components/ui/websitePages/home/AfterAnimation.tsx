"use client"
import { useRouter } from "next/navigation";
import { PiArrowBendUpRightBold } from "react-icons/pi";

const AfterAnimation = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center gap-4 ">
            <div className="text-primary opacity-20 lg:text-[113px] text-[30px] font-semibold  ">MOBILITY WITHOUT LIMIT  </div>
            <div className="flex flex-col items-center justify-center lg:-mt-20 -mt-6 ">
                <p className=" uppercase lg:text-[20px] text-[16px] text-black font-normal text-center "> About us</p>
                <p className=" text-content2 lg:text-lg text-sm px-1 font-medium leading-relaxed lg:w-[47%] text-center  lg:my-8 my-4">At MoviCare, we are dedicated to empowering individuals with mobility challenges by providing safe, reliable, and fully accessible transportation. Our goal is to ensure freedom, independence, and dignity for every passenger, whether for daily needs or travel adventures. With adapted vans, flexible booking, and inclusive partnerships, we make mobility effortless for everyone. </p>
                <button className="text-[16px]   bg-[#286A25] text-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2" onClick={() => router.push('/about')}> <span> Learn More </span> <span> <PiArrowBendUpRightBold size={16} color='#fff' />
                </span> </button>
            </div>
        </div>
    );
};

export default AfterAnimation;