"use client";

import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import SelectServiceStep from './SelectServiceStep/SelectServiceStep';
import SelectLocation from './SelectLocationStep/SelectLocation';
import SelectDate from './SelectDate/SelectDate';
import RideOption from './RideOption/RideOption';
import ReviewCheckOut from './ReviewCheckOut/ReviewCheckOut';
import { useRouter } from 'next/navigation'; 

export type BookingDetails = {
  service: string | null; 
  provider: string | null;
  date: string | null;
  pickup_location: string;
  dropoff_location: string;
  base_fare: number;
  service_charge: number;
  additional_travelerse_fee: number;
  kids: number;
  adults: number;
  tax: number;
  additional_info: string;
  total_price: number;
  distance: number;
  duration: number;
  pickup_time: string; 
  dropOff_time: string
}; 


const SelectServiceMainPage = () => {
    const router = useRouter();
    const searchParams = new URLSearchParams();

    const stepFromUrl = Number(searchParams.get('step')) || 0;
    const [current, setCurrent] = useState(stepFromUrl);
    const [formData, setFormData] = useState<BookingDetails>({
        service: null,
        provider: null,
        date: null,
        pickup_location: '',
        dropoff_location: '',
        base_fare: 0,
        service_charge: 0,
        additional_travelerse_fee: 0,
        kids: 0,
        adults: 0,
        tax: 0,
        additional_info: '',
        total_price: 0,
        distance: 0,
        duration: 0, 
        pickup_time: '', 
        dropOff_time:""
    });

    const updateFormData = (newData: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    }; 

    console.log("formData", formData);

    useEffect(() => {
        router.replace(`?step=${current}`);
    }, [current, router]);  

    const next = () => setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
    const prev = () => setCurrent((prev) => Math.max(prev - 1, 0));


    const steps = [
        {
            title: <p className='text-[14px]'>Select Service</p>,
            content: <SelectServiceStep next={next} updateFormData={updateFormData} formData={formData} />,
        },
        {
            title: <p className='text-[14px]'>Select Locations</p>,
            content: <SelectLocation next={next} prev={prev} updateFormData={updateFormData} formData={formData} />,
        },
        {
            title: <p className='text-[14px] w-full'>Select Date & Travelers</p>,
            content: <SelectDate next={next} prev={prev}  updateFormData={updateFormData} formData={formData} />,
        },
        {
            title: <p className='text-[14px] w-full'>Select Ride Option </p>,
            content: <RideOption next={next} prev={prev} formData={formData} updateFormData={updateFormData} />,
        },
        {
            title: <p className='text-[14px] w-full'>Review & Checkout</p>,
            content: <ReviewCheckOut prev={prev} formData={formData}  />,
        },
    ];

    const items = steps.map((item, index: number) => ({
        key: index,
        title: item.title
    }));

    return (
        <div className='w-full lg:pt-[180px] pt-32 bg-[#f7f8f7] min-h-screen'>
            <div className='container'>

                <Steps
                    current={current}
                    items={items} labelPlacement="vertical" style={{ width: '100%' }} size="small" className='steps' />
                <div  >{steps[current].content}</div>


            </div>
        </div>
    );
};

export default SelectServiceMainPage;