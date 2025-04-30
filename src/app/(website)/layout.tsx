
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div> 
            {/* Main content */}
             {children}  
            {/* navbar  */} 
            <Navbar/>
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default layout;