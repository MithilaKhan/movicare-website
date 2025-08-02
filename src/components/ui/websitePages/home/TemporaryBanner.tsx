"use client"
import React from 'react';
import { PiArrowBendUpRightBold } from 'react-icons/pi';

const TemporaryBanner = () => {

    // const Loader = () => (
    //     <div className="flex items-center justify-center h-[calc(90vh-20px)]">
    //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
    //     </div>
    // );

    return (
        <div className="w-full h-screen">
            {/* {isLoading ? (
                <Loader />
            ) : ( */}
                <div
                    className="w-full h-screen"
                    style={{
                        backgroundImage: `url('/home.svg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        objectFit: 'cover',
                    }}
                >
                    <div className="flex flex-col items-center lg:justify-start justify-center h-full lg:pt-[200px] pt-4">
                        {/* Title */}
                        <div className="lg:text-[56px] text-[31px] text-white lg:text-start text-center">
                            <p>
                                <span className="font-bold">Accessible </span> Transportation,
                            </p>
                            <div className="flex items-center lg:justify-start justify-center gap-2 font-bold">
                                <span>Redefined in</span>
                                <img
                                    src="/FlagIcon.png"
                                    alt=""
                                    className="w-[49px] h-[49px] mx-3 lg:block hidden"
                                />
                                <span>Costa Rica</span>
                            </div>
                        </div>

                        {/* Subtitle */}
                        <p className="lg:text-[18px] text-[16px] text-[#d1d6d4] px-2 lg:px-0 lg:w-1/3 w-full text-center mt-4 tracking-wide">
                            Safe, comfortable, and hassle-free mobility for wheelchair users and individuals with reduced mobility.
                        </p>

                        {/* Form Section */}
                        <div className="flex items-center justify-center lg:w-2/3 w-full lg:px-0 px-3 mt-10">

                            <div className="w-full flex justify-center">
                                <div className="lg:w-[45%] w-full">
                                    <a
                                        className="text-[16px] w-full text-[#286A25] bg-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2 cursor-pointer "
                                        href="https://wa.me/50660191762"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span>Book via WhatsApp</span>
                                        <PiArrowBendUpRightBold size={16} color="#286A25" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            {/* )} */}
        </div>
    );
};

export default TemporaryBanner;