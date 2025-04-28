import { ConfigProvider, DatePicker, Select } from 'antd';
import { BsCalendar4 } from 'react-icons/bs';
import { GrLocationPin } from 'react-icons/gr';
import { IoChevronDownSharp } from 'react-icons/io5';
import { PiArrowBendUpRightBold } from 'react-icons/pi';
import { SiRelay } from 'react-icons/si';

const Banner = () => {

    const locations = [
        { value: 'san_jose', label: 'San José' },
        { value: 'liberia', label: 'Liberia' },
        { value: 'puntarenas', label: 'Puntarenas' },
        { value: 'limon', label: 'Limón' },
        { value: 'heredia', label: 'Heredia' },
        { value: 'cartago', label: 'Cartago' },
        { value: 'alajuela', label: 'Alajuela' },
        { value: 'tamarindo', label: 'Tamarindo' },
        { value: 'monteverde', label: 'Monteverde' },
        { value: 'manuel_antonio', label: 'Manuel Antonio' }
    ]

    return (
        <div className='w-full h-screen' style={{
            backgroundImage: `url('/home.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
            backgroundColor: "#ffe6f7"
        }}>

            <div className='flex flex-col items-center justify-start h-full pt-[200px]'>

                <div className='text-[56px] text-white'> <p>  <span className='font-bold'>Accessible </span>  Transportation,  </p>
                    <div className='flex items-center gap-2 font-bold'>
                        <span>  Redefined in  </span>
                        <img src="/FlagIcon.png" alt="" className='w-[49px] h-[49px] mx-3' />
                        <span>Costa Rica </span>
                    </div>
                </div>
                <p className='text-[18px] text-[#d1d6d4]  w-1/3 text-center mt-4 tracking-wide'> Safe, comfortable, and hassle-free mobility for wheelchair users and individuals with reduced mobility.</p>

                <div className='flex items-center gap-4 mt-10'>
                    <ConfigProvider
                        theme={{
                            components: {
                                Select: {
                                    clearBg: "#53645f",
                                    borderRadiusLG: 5,
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
                        <Select
                            placeholder="Enter pickup location"
                            style={{ width: "250px", height: "48px" }}
                            options={locations}
                            prefix={<SiRelay size={20} color='#ffffff' className='mx-2' />}
                            suffixIcon={<IoChevronDownSharp size={16} color='#ffffff' />}
                        />
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
                        <Select
                            placeholder="Enter destination address"
                            style={{ width: "250px", height: "48px" }}
                            options={locations}
                            prefix={<GrLocationPin size={20} color='#ffffff' className='mx-2' />}
                            suffixIcon={<IoChevronDownSharp size={16} color='#ffffff' />}
                        />
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
                            style={{ width: "250px", height: "48px" }}
                            prefix={<BsCalendar4 size={18} color='#ffffff' className='mx-2' />}
                            suffixIcon={""}
                        />
                    </ConfigProvider>

                    <button className="text-[16px] text-[#286A25] bg-white h-[48px] px-6 rounded-full font-medium flex items-center justify-center gap-2"> <span> Check Availability </span> <span> <PiArrowBendUpRightBold size={16} color='#286A25' />
                    </span> </button>

                </div>
            </div>

        </div>
    );
};

export default Banner;