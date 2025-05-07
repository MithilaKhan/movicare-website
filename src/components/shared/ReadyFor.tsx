import React from 'react';
import { PiArrowBendUpRightBold } from 'react-icons/pi';

const ReadyFor = () => {
    return (
        <div className=' h-[1097px]' style={{
            backgroundImage: `url('/readyFor.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>
            <div className=' pt-[120px] flex items-start justify-center h-full'>
                <div className=' flex flex-col items-center justify-center gap-4'>
                    <h1 className=' text-[48px] text-white font-normal max-w-2xl text-center '> Ready for a <span className='font-bold'>  Comfortable, Accessible </span> Ride? </h1>
                    <button className=' flex items-center text-sm justify-center font-medium bg-white gap-2 text-primary  rounded-full py-4 px-6'> <span> Check Rates & Book Now</span>
                        <span> <PiArrowBendUpRightBold size={14} />  </span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReadyFor;