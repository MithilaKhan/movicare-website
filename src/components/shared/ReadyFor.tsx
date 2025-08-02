"use client"
// import { useRouter } from 'next/navigation';
import React from 'react';
import { PiArrowBendUpRightBold } from 'react-icons/pi';

const ReadyFor = () => {
    // const router = useRouter();
    return (
        <div className=' lg:h-[1097px] h-[700px]' style={{
            backgroundImage: `url('/readyFor.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>
            <div className=' lg:pt-[120px] pt-28 flex items-start justify-center h-full'>
                <div className=' flex flex-col items-center justify-center gap-4'>
                    <h1 className=' lg:text-[48px] text-[30px] text-white font-normal lg:max-w-2xl lg:px-0 px-1 text-center '> Ready for a <span className='font-bold'>  Comfortable, Accessible </span> Ride? </h1>
                    <a className=' flex items-center text-sm justify-center font-medium bg-white gap-2 text-primary  rounded-full py-4 px-6'
                        href="https://wa.me/50660191762"
                        target="_blank"
                        rel="noopener noreferrer"
                    //  onClick={() => router.push("/select-service")}
                    > <span> Check Rates & Book Now</span>
                        <span> <PiArrowBendUpRightBold size={14} />  </span>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default ReadyFor;