import { ConfigProvider, DatePicker, Input } from 'antd';
import { BsCalendar4 } from 'react-icons/bs';
import { GrLocationPin } from 'react-icons/gr';
import { PiArrowBendUpRightBold } from 'react-icons/pi';
import { SiRelay } from 'react-icons/si';

const Banner = () => {



    return (
        <div className='w-full h-screen' style={{
            backgroundImage: `url('/home.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }}>

            <div className='flex flex-col items-center lg:justify-start justify-center h-full lg:pt-[200px] pt-4'>

                <div className='lg:text-[56px] text-[31px] text-white lg:text-start text-center '> <p>  <span className='font-bold'>Accessible </span>  Transportation,  </p>
                    <div className='flex items-center lg:justify-start justify-center gap-2 font-bold'>
                        <span>  Redefined in  </span>
                        <img src="/FlagIcon.png" alt="" className='w-[49px] h-[49px] mx-3 lg:block hidden' />
                        <span>Costa Rica </span>
                    </div>
                </div>
                <p className='lg:text-[18px] text-[16px] text-[#d1d6d4] px-2 lg:px-0  lg:w-1/3 w-full  text-center mt-4 tracking-wide'> Safe, comfortable, and hassle-free mobility for wheelchair users and individuals with reduced mobility.</p>


                <div className=' flex items-center justify-center lg:w-2/3 w-full lg:px-0 px-3 mt-10 '>
                    <div className='flex lg:flex-row flex-col items-center gap-4 w-full   '>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#53645f',
                                    colorTextBase: '#ffffff',
                                    colorTextPlaceholder: '#a8b2af',
                                    colorBgContainer: '#666d66',
                                    colorBgElevated: '#666d66',
                                    colorIcon: '#ffffff',
                                },

                            }}
                        >

                            <Input placeholder="Enter pickup location" style={{ width: "100%", height: "48px" }} prefix={<SiRelay size={20} color='#ffffff' className='mx-2' />} />

                        </ConfigProvider>


                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#53645f',
                                    colorTextBase: '#ffffff',
                                    colorTextPlaceholder: '#a8b2af',
                                    colorBgContainer: '#666d66',
                                    colorBgElevated: '#666d66',
                                    colorIcon: '#ffffff',
                                },

                            }}
                        >

                            <Input placeholder="Enter destination address" style={{ width: "100%", height: "48px" }} prefix={<GrLocationPin size={20} color='#ffffff' className='mx-2' />} />

                        </ConfigProvider>


                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        clearBg: "#53645f",

                                    },
                                },
                                token: {
                                    colorPrimary: '#53645f',
                                    colorTextBase: '#ffffff',
                                    colorTextPlaceholder: '#a8b2af',
                                    colorBgContainer: '#666d66',
                                    colorBgElevated: '#666d66',
                                    colorIcon: '#ffffff',
                                },

                            }}
                        >

                            <DatePicker placeholder="Select date & time"
                                style={{ width: "100%", height: "48px" }}
                                prefix={<BsCalendar4 size={18} color='#ffffff' className='mx-2' />}
                                suffixIcon={""}
                                showToday={false}
                            />
                        </ConfigProvider>

                        <button className="text-[16px] lg:w-2/3 w-full  text-[#286A25] bg-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2"> <span> Check Availability </span> <span> <PiArrowBendUpRightBold size={16} color='#286A25' />
                        </span> </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;