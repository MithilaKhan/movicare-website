import React from 'react'; 
import { Poppins } from 'next/font/google'; 
const poppins = Poppins({ weight: ['400', '500', '600', '700'], subsets: ['latin'] });

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div
        className="w-full flex items-center justify-center relative lg:p-0 p-5 "
        style={{
            height: "100vh",
        }}
    >
        
        <div
            style={{
                backgroundImage: `url('/login.svg')`,
                backgroundPosition: 'top',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                filter: 'blur(5px)',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1, 
                width: '100%',
                height: '100%',
            }}
        ></div>
    
     <div className=' p-4'>  

        <div
            style={{
                background: '#ffffff',
                padding: 30,
                borderRadius: 10,
                // width: 350,
                position: 'relative',
                zIndex: 2,
            }} 
            className={` ${poppins.className}  shadow-xl lg:w-[570px] w-[350px]`}
        >
           {children}
        </div>

     </div>
    </div>
    );
};

export default layout;