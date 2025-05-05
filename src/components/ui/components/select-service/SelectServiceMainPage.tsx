"use client";

import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import SelectServiceStep from './SelectServiceStep/SelectServiceStep';
import SelectLocation from './SelectLocationStep/SelectLocation';
import SelectDate from './SelectDate/SelectDate';

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
            title:  <p className='text-[14px]'>Select Locations</p> ,
            content: <SelectLocation next={next}  prev={prev}/>,
        },
        {
            title:  <p className='text-[14px] w-full'>Select Date & Travelers</p> ,
            content: <SelectDate />,
        }, 
        {
            title:  <p className='text-[14px] w-full'>Select Ride Option </p> ,
            content: 'Second-content',
        }, 
        {
            title:  <p className='text-[14px] w-full'>Review & Checkout</p> ,
            content: 'Last-content',
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title })); 

    return (
        <div className='w-full pt-[180px] bg-[#f7f8f7] min-h-screen'>
            <div className='container'>
                <Steps current={current} items={items} labelPlacement="vertical" style={{width: '100%'}}  size="small" />
                <div  >{steps[current].content}</div>
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default SelectServiceMainPage;