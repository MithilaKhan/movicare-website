"use client"
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { ConfigProvider } from 'antd';

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    return (
        <div >


            <div > 
                <ConfigProvider theme={{ token: { colorPrimary: '#286A25' } }}>
                {children} 
                </ConfigProvider>
            </div> 

            {/* navbar  */}
            <Navbar/> 

            {/* Footer */}
            {pathname === "/select-service"  ? "" : <Footer />}

        </div>
    );
};

export default FooterLayout;