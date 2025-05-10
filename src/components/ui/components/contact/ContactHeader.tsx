import { Card } from "antd";
import { PhoneCall } from "lucide-react";
import { BsBuildings } from "react-icons/bs";
import { PiMailbox } from "react-icons/pi";


const features = [
    {
      title: "Address",
      icon: <BsBuildings className="w-10 h-12" />,
      content: "Avenida Escazú, San José, Costa Rica"
  },
  {
    title: "Phone",
    icon: <PhoneCall className="w-10 h-12" />,
    content: "+506 2222-3344"
  },
  {
    title: "Email",
    icon: <PiMailbox className="w-10 h-12" />,
    content: "support@movicare.com"
  },
  ]; 
const ContactHeader = () => {
    return (
        <div> 
         <div className="lg:pb-[56px] pb-10"> 
            <p className=" uppercase text-[16px] text-primary font-normal lg:pb-6 pb-2 ">CONTACT US</p> 
            <p className=" lg:text-[50px] text-[32px] font-normal text-content1 lg:pb-6 pb-2"> <span>Get in Touch with  </span> <span className="font-bold"> MoviCare </span></p> 
            <p className="text-content2 lg:text-lg text-[16px] font-normal leading-relaxed">Have questions or need assistance? We’re here to help! Contact us for bookings, support, or any inquiries about our services. </p>

         </div> 

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-[56px] border-b-2 border-content2/10 ">
        {features.map((feature, index) => (
          <Card
            key={index}
            hoverable
            className="w-full h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300 whyChoose-card pb-[63px] pt-6 "
            bodyStyle={{
              padding: '24px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="lg:mb-8 mb-4 flex justify-start">
              <div className=" text-primary">
                {feature.icon}
              </div>
            </div>
            <h3 className="lg:text-2xl text-xl font-semibold text-content1 mb-3">
              {feature.title}
            </h3>
            <p className="text-content2 flex-grow text-[16px]">
              {feature.content}
            </p>
          </Card>
        ))}
      </div> 

        </div>
    );
};

export default ContactHeader;