"use client";

import React, { useState } from 'react';
import { Steps } from 'antd';
import SelectServiceStep from './SelectServiceStep/SelectServiceStep';
import SelectLocation from './SelectLocationStep/SelectLocation';
import SelectDate from './SelectDate/SelectDate';
import RideOption from './RideOption/RideOption';
import ReviewCheckOut from './ReviewCheckOut/ReviewCheckOut';

const SelectServiceMainPage = () => {

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    const steps = [
        {
            title: <p className='text-[14px]'>Select Service</p>,
            content: <SelectServiceStep next={next} />,
        },
        {
            title: <p className='text-[14px]'>Select Locations</p>,
            content: <SelectLocation next={next} prev={prev} />,
        },
        {
            title: <p className='text-[14px] w-full'>Select Date & Travelers</p>,
            content: <SelectDate next={next} prev={prev} />,
        },
        {
            title: <p className='text-[14px] w-full'>Select Ride Option </p>,
            content: <RideOption next={next} prev={prev} />,
        },
        {
            title: <p className='text-[14px] w-full'>Review & Checkout</p>,
            content: <ReviewCheckOut prev={prev} />,
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className='w-full pt-[180px] bg-[#f7f8f7] min-h-screen'>
            <div className='container'>

                <Steps current={current} items={items} labelPlacement="vertical" style={{ width: '100%' }} size="small" className='steps' />
                <div  >{steps[current].content}</div>


            </div>
        </div>
    );
};

export default SelectServiceMainPage;