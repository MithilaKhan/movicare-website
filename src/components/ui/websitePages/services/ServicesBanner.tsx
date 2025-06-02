import React from 'react';

const ServicesBanner = () => {
    return (
        <div className='w-full h-screen pt-[228px] flex flex-col items-center justify-start ' style={{
            backgroundImage: `url('/serviceBanner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>
            <div className='  text-white max-w-3xl'>
                <p className='uppercase text-[18px]  text-center tracking-wide '>OUR SERVICES </p>
                <p className=' text-center text-content2  text-lg lg:pt-[91px] pt-16 '>MoviCare provides flexible and accessible transport solutions tailored to your needs. Whether for daily commutes, medical appointments, or travel adventures, we’re here to ensure a smooth journey. </p>

                <div className='flex items-center justify-center gap-4 mt-10'>
                    <button className='  text-sm  font-medium bg-white  text-[#070707]  rounded-full py-4 px-6'>  Reserve Your Ride </button>

                </div>
            </div>
        </div>
    );
};

export default ServicesBanner;