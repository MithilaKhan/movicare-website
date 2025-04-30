import React from 'react';

const HowItAll = () => {
    return (
        <div>
                <div 
                 
                    className={`flex flex-col md:flex-row items-center justify-between mt-[120px]   transition-all duration-700 ease-out`}

      >
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6">
          <h2 className="text-[48px] font-semibold mb-6 text-[#070707]">How It All Started</h2>
          <p className="text-content2 mb-6 text-[20px]">MoviCare was founded with a simple yet powerful vision—ensuring that everyone, regardless of mobility challenges, has access to reliable and dignified transportation. Recognizing the lack of accessible transport options in Costa Rica, we set out to change the landscape by providing a seamless and inclusive mobility experience.</p>
        </div>
        
        <div className="w-full md:w-1/2 md:px-6">
          <div className="">
            <img
              src="/about2.svg"
              alt="How It All Started"
              className="object-contain transition-transform duration-500 hover:scale-105 w-[100%] h-[618px] "
            />
          </div>
        </div>
      </div>
        </div>
    );
};

export default HowItAll;