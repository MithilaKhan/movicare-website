"use client";
import { Form } from 'antd';
import React from 'react';

const ComingSoon = () => {
    return (
        <div
            className="w-full h-screen"
            style={{
                backgroundImage: `url('/ComingSoon.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
            }}>
            {/* <div className=' h-[100px] container flex items-center ' >
                <img src="/logo.png" alt="" className=" w-16 h-16 object-fill " />
            </div> */}

            <div className='  container  flex items-center justify-center h-full'> 
                <div className=' h-full w-full flex flex-col items-center justify-center'> 
                <div className='  text-center lg:w-[70%] w-full'>
                    <h1 className=' font-bold lg:text-[80px] text-[35px] text-white tracking-wide'>¡Muy pronto lanzamos nuestro servicio! </h1>
                    <p className=' text-[#A5A8AB] lg:text-lg text-[16px] tracking-wide pt-6 pb-10'>Sé de las primeras personas en enterarse cuando MoviCare  esté disponible.</p>

                    <Form className='w-full lg:gap-4 gap-0 flex lg:flex-row flex-col items-center justify-center' layout='vertical'>
                        <Form.Item name={'email'} className='lg:w-[60%] w-full mt-6'>
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                className=" w-full h-[52px] px-6 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </Form.Item>
                        <Form.Item className='lg:w-auto  w-full'>
                            <button
                                type="submit"
                                className="w-full h-[52px] bg-primary text-white py-3 px-8 rounded-full "
                            >
                                Notificarme
                            </button>
                        </Form.Item>
                    </Form>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;