
import Footer from '@/components/shared/Footer';
import React from 'react';

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div> 
            {/* Main content */}
             {children} 
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default layout;