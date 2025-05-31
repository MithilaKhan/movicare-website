/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React from 'react';
import { PiArrowBendUpRightBold } from 'react-icons/pi';

import type { CSSProperties } from 'react'
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';
import { Plus } from 'lucide-react';
import { useGetFaqsQuery } from '@/redux/features/others/faq/faqSlice';
import { useRouter } from 'next/navigation';


const GotQuestions = () => {

  const { token } = theme.useToken();
  const { data } = useGetFaqsQuery(undefined);
  const router = useRouter();

  const getItems = (panelStyle: CSSProperties, data: any[]): CollapseProps['items'] => {
    return data?.slice(0, 5)?.map((faq, index) => ({
      key: String(index + 1),
      label: (
        <p className='font-medium lg:text-[19px] text-[16px]' style={{ color: '#4E4E4E' }}>
          {faq.title}
        </p>
      ),
      children: (
        <p className='lg:text-[16px] text-sm' style={{ color: '#4E4E4E' }}>
          {faq.description}
        </p>
      ),
      style: panelStyle,
    })) || [];
  };

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: "#fff",

    borderRadius: token.borderRadiusLG,

  };

  return (
    <div className=' container mx-auto lg:my-[120px] my-20 '>

      <div className=' flex lg:flex-row flex-col items-start justify-between' >

        {/* 1st section  */}
        <div className=' lg:w-1/3 w-full'>
          <h1 className=' lg:text-[32px]  text-[28px] font-bold text-content1 mb-4 lg:max-w-[350px] lg:text-start text-center  '>Got Questions?
            We’ve Got Answers!</h1>
          <p className=' text-content2 lg:text-lg text-[16px] lg:pb-10 pb-5  text-center lg:text-start'>Everything You Need to Know About Booking, Accessibility & More!</p>

          <div className=' flex items-center lg:justify-start justify-center lg:pb-0 pb-8'>
            <button className=' flex items-center text-sm justify-center gap-2 text-primary border border-primary rounded-full py-3 px-6' onClick={() => router.push('/contact')}> <span> Contact Us</span>
              <span> <PiArrowBendUpRightBold size={14} /> </span>
            </button>
          </div>

        </div>

        {/* 2nd section  */}

        <div className='lg:w-2/3 w-full'>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => <Plus size={22} style={{
              transform: `rotate(${isActive ? 0 : 270}deg)`,
              transition: 'transform 0.3s ease',
              color: '#286A25'
            }} />}
            expandIconPosition="end"
            style={{ background: "#ffffff", color: '#222222' }}
            items={getItems(panelStyle, data || [])}
            defaultActiveKey={['3']}
          />
        </div>
      </div>
    </div>
  );
};

export default GotQuestions;