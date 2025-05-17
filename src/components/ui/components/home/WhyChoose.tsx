import { Card } from 'antd';
import { Accessibility, Bus, Hourglass, MessagesSquare } from 'lucide-react';
import {
  FiHeadphones,
} from 'react-icons/fi';
import { PiMapTrifoldFill } from 'react-icons/pi';

const features = [
  {
    title: "Flexible Ride Scheduling",
    icon: <Hourglass className="w-12 h-12" />,
    content: "Easily schedule your rides with flexible time slots that fit your plans."
},
{
  title: "Accessibility-Focused Vans",
  icon: <Bus className="w-12 h-12" />,
  content: "Travel with confidence in our vans, fully equipped with first aid kits, grab bars, and other accessibility features for your safety & comfort."
},
{
  title: "Customized Routes",
  icon: <PiMapTrifoldFill className="w-12 h-12" />,
  content: "Customize your journey by adding multiple stops to suit your specific travel needs."
},
  {
    title: "Ride Reminders",
    icon: <MessagesSquare className="w-12 h-12" />,
    content: "Stay informed with real-time ride updates and reminders sent directly to your phone and email."
  },
  {
    title: "24/7 Customer Support",
    icon: <FiHeadphones className="w-12 h-12" />,
    content: "Get assistance anytime with our dedicated support team, ensuring a smooth and worry-free travel experience."
  },
  {
    title: "Inclusive Travel Partnerships",
    icon: <Accessibility className="w-12 h-12" />,
    content: "Stress-free, accessible transportation for comfort and independence"
  }
];

const WhyChoose = () => {
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
        {features.map((feature, index) => (
          <Card
            key={index}
            hoverable
            className="w-full h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 whyChoose-card pb-[63px] pt-6 "
            styles={{ 
              body:{
                
                padding: '24px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'

              }
            }}
          >
            <div className="lg:mb-8 mb-5 flex justify-start">
              <div className=" text-primary">
                {feature.icon}
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