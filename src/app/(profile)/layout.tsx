import ProfileNavbar from "@/components/shared/ProfileNavbar";
import Sidebar from "@/components/shared/Sidebar";
import { ConfigProvider } from "antd";

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
                    <div className={` bg-[#f7f8f7]  lg:pt-10 lg:px-10 px-0 pt-6 pb-0 h-[calc(100vh-100px)]  rounded-md shadow-md`}>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#0ea5e9',
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
        </div>
    );
};

export default layout;