"use client"
import { useRouter } from "next/navigation";

interface ServiceType {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    buttonText: string;
  }
 const services: ServiceType[] = [
    {
      id: 1,
      title: "Accessible Van Rentals",
      description: "Rent our fully equipped wheelchair-accessible vans for a safe and comfortable ride. Each vehicle features ramps, grab bars, and first-aid kits for added security.",
      imageUrl: "/service1.png",
      buttonText: "Rent a Van"
    },
    {
      id: 2,
      title: "Custom Route Planning",
      description: "Plan your trip with multiple stops tailored to your schedule. Whether for errands, medical visits, or sightseeing, we ensure a smooth ride to all your destinations.",
      imageUrl:  "/service2.png",
      buttonText: "Plan Your Route"
    },
    {
      id: 3,
      title: "Medical & Daily Transport",
      description: "Reliable and stress-free transportation for medical appointments, therapy sessions, and daily activities. Our trained drivers ensure comfort and care throughout your ride.",
      imageUrl:  "/service3.png",
      buttonText: "Book a Ride"
    },
    {
      id: 4,
      title: "Tour & Travel Assistance",
      description: "MoviCare was founded with a simple yet powerful vision—ensuring that everyone, regardless of mobility challenges, has access to reliable and dignified transportation. Recognizing the lack of accessible transport options in Costa Rica, we set out to change the landscape by providing a seamless and inclusive mobility experience.",
      imageUrl:  "/service2.png",
      buttonText: "Learn More"
    },
    {
      id: 5,
      title: "Corporate & Event Transport",
      description: "Need accessible transport for business events, conferences, or group outings? We provide tailored transport solutions for corporate and special events.",
      imageUrl:  "/service4.png",
      buttonText: "Get a Quote"
    }
  ]; 


const AllServices = () => { 
  const router = useRouter()
    return ( 

        <div className="container mx-auto ">  

            {
                services.map((service, index) => (
                    <div 
                    key={service.id}
                    id={`service-${service.id}`}
                    className={`flex flex-col md:flex-row items-center justify-between lg:mt-[120px] mt-10   transition-all duration-700 ease-out ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}

      >
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:px-6">
          <h2 className="lg:text-[48px] text-[28px] font-semibold lg:mb-6 mb-3 text-[#070707]">{service.title}</h2>
          <p className="text-content2 mb-6 lg:text-[20px] text-[16px]">{service.description}</p>
          <button 
            className="bg-primary text-white py-3 px-6 rounded-full text-sm transition-colors duration-300" 
            onClick={() => router.push("/select-service")}
          >
            {service.buttonText}
          </button>
        </div>
        
        <div className="w-full md:w-1/2 md:px-6">
          <div className="">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="object-contain transition-transform duration-500 hover:scale-105 w-[100%] lg:h-[618px]  h-[380px] "
            />
          </div>
        </div>
      </div>
                ))
            }
 
        </div>
    
    );
};

export default AllServices;