import React from 'react';

const Companies = () => {
    return (
        <div className=' my-16 container mx-auto'> 

        <p className=' text-[16px]  text-content2 text-center '> Trusted by 54+ companies </p> 

        <div className=' flex items-center  justify-between pt-[50px]'> 
            <img src="/company1.png" alt="" className='h-[64px] w-[120px] object-cover' />
            <img src="/company2.png" alt="" className='h-[48px] w-[120px] object-contain ' />
            <img src="/company3.png" alt="" className='h-[64px] w-[120px] object-contain' />
            <img src="/company4.png" alt="" className='h-[64px] w-[120px] object-contain' />
            <img src="/company5.png" alt="" className='h-[64px] w-[120px] object-contain' />
        </div>
            
        </div>
    );
};

export default Companies;