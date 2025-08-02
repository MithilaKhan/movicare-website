"use client"
// import { useRouter } from 'next/navigation';
import React from 'react';

const ServicesBanner = () => {
    // const router = useRouter(); 
    return (
        <div className='w-full h-screen pt-[228px] flex flex-col items-center justify-start ' style={{
            backgroundImage: `url('/serviceBanner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>
            <div className='  text-white lg:max-w-3xl'>
                <p className='uppercase lg:text-[18px] text-[16px]  text-center tracking-wide '>OUR SERVICES </p>
                <p className='lg:text-[56px] text-[34px] font-normal text-center'> Reliable, Accessible, and Hassle-Free Transportation </p>
                <p className=' text-center text-content2  text-lg lg:pt-6 pt-4'>MoviCare provides flexible and accessible transport solutions tailored to your needs. Whether for daily commutes, medical appointments, or travel adventures, we’re here to ensure a smooth journey. </p>

                <div className='flex items-center justify-center gap-4 mt-10'>
                    <a className='  text-sm  font-medium bg-white  text-[#070707]  rounded-full py-4 px-6 cursor-pointer'
                        //  onClick={() => router.push("/select-service")}   
                        href="https://wa.me/50660191762"
                        target="_blank"
                        rel="noopener noreferrer"
                    >  Reserve Your Ride </a>

                </div>
            </div>
        </div>
    );
};

export default ServicesBanner;