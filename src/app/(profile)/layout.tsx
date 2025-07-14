import ProfileNavbar from "@/components/shared/ProfileNavbar";
import Sidebar from "@/components/shared/Sidebar";
import { ConfigProvider } from "antd";
import { FaWhatsapp } from "react-icons/fa";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="w-full  "
            style={{
                height: "100vh",
            }}
        >

            <div>
                <ProfileNavbar />
            </div>

            <div className='w-full flex h-[calc(100vh-100px)]'>
                {/* Sidebar for large devices */}
                <div className={`bg-[#FBFBFB] hidden lg:block w-[300px] pt-5`}>
                    <Sidebar/>
                </div>

                {/* Main content */}
                <div className={`flex-1 lg:w-[calc(100%-300px)]`}>
                    <div className={` bg-[#f7f8f7]  lg:pt-10 lg:px-10 px-5 pt-2 pb-0 h-[calc(100vh-100px)]  rounded-md shadow-md`}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#286A25',
                                },
                            }}
                        >
                            <div className='h-full overflow-y-auto rounded-md'>
                                {children}
                            </div>
                        </ConfigProvider>
                    </div>
                </div>
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
        </div>
    );
};

export default layout;