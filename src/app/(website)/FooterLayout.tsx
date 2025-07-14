"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { ConfigProvider } from 'antd';
import { FaWhatsapp } from 'react-icons/fa';

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <div>
            <div>
                <ConfigProvider theme={{ token: { colorPrimary: '#286A25' } }}>
                    {children}
                </ConfigProvider>
            </div>

            {/* WhatsApp Logo */}
            <a
                 href="https://wa.me/50660191762"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    right: '20px',
                    bottom: '10%',
                    transform: 'translateY(-50%)',
                    zIndex: 1000,
                    cursor: 'pointer',
                }}
            >
                <div className=' bg-[#25D366] text-white w-[50px] h-[50px] rounded-full flex items-center justify-center '>
                    <FaWhatsapp color='#ffffff' size={27} />
                </div>

            </a>

            {/* Navbar */}
            <Navbar />

            {/* Footer */}
            {pathname === "/select-service" ? null : <Footer />}
        </div>
    );
};

export default FooterLayout;