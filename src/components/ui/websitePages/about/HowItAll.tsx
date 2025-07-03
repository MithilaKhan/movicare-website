import React from 'react';

const HowItAll = () => {
  return (
    <div>
      <div  className={`flex flex-col md:flex-row items-center justify-between lg:mt-[120px]   transition-all duration-700 ease-out`}>
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6">
          <h2 className="lg:text-[48px] text-[36px] font-semibold mb-6 text-[#070707]">How It All Started</h2>
          <p className="text-content2 lg:mb-6 lg:text-[20px] text-lg flex flex-col gap-7"> 
            <span> 
              MoviCare was born from a personal experience. When the founder’s mother-in-law became a wheelchair user, the family faced a new reality, one where getting to medical appointments, enjoying a day at the beach, or simply moving around comfortably became a real challenge.  </span>  

            <span>They quickly realized that Costa Rica lacked accessible, personalized transport options. This sparked a mission: to create a service that ensures everyone, regardless of mobility challenges, can move freely and with dignity. </span>  

            <span> That’s how MoviCare came to life, to transform transportation into a safe, reliable, and inclusive experience for all. </span>
          </p>
        </div>

        <div className="w-full md:w-1/2 md:px-6">
          <div className="">
            <img
              src="/about2.svg"
              alt="How It All Started"
              className="object-contain transition-transform duration-500 hover:scale-105 w-[100%] lg:h-[618px] h-[400px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItAll;