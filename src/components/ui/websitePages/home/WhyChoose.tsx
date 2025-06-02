"use client";
import { imageUrl } from '@/redux/base/baseApi';
import { useGetWhyChooseQuery } from '@/redux/features/others/home/whyChooseSlice';
import { Card } from 'antd';

const WhyChoose = () => {
  const { data: allChooseData } = useGetWhyChooseQuery(undefined);

  const features = allChooseData?.map((item) => ({
    title: item.title,
    icon: item?.image?.startsWith("http") ? item?.image : `${imageUrl}${item.image}`,
    content: item.description || "No description available"
  }));

  return (
    <div className='lg:py-16 py-6 container mx-auto'>
      <div className="mx-auto  ">
        {/* Hero Section */}
        <div className="text-center lg:pb-[56px] pb-8">
          <h1 className="lg:text-[32px] text-[24px] font-semibold text-content1 lg:mb-6 mb-3">
            Why Choose MoviCare?
          </h1>
          <p className="lg:text-lg text-[14px] text-content2 max-w-lg tracking-wide mx-auto">
            More than just transportation – a service designed for your independence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <Card
              key={index}
              hoverable
              className="w-full h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 whyChoose-card pb-[63px] pt-6 "
              styles={{
                body: {
                  padding: '24px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <div className="lg:mb-8 mb-5 flex justify-start">
                <div className=" ">
                  <img src={feature.icon} alt="" className=' w-auto h-[40px] object-cover' />
                </div>
              </div>
              <h3 className="lg:text-2xl text-xl lg:font-semibold font-medium text-content1 mb-3">
                {feature.title}
              </h3>
              <p className="text-content2 flex-grow lg:text-[16px] text-sm">
                {feature.content}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;