
"use client"
import { imageUrl } from "@/redux/base/baseApi";
import { useGetServicesQuery } from "@/redux/features/others/services/servicesSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const AllServices = () => {
  const searchParams = useSearchParams();
  const router = useRouter() 
   const {data:allServices} = useGetServicesQuery(undefined);  
   console.log("allServices", allServices); 

   const services = allServices?.map((service) => ({
    id: service._id,
    title: service.name,
    description: service.description,
    imageUrl: service.image?.startsWith("http") ? service?.image : `${imageUrl}${service.image}`,
    buttonText: "Learn More" 
  })) || [];

  // Create refs array for each service, only once
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
  const scrollTo = searchParams.get("scrollTo");

  if (scrollTo && sectionRefs.current[scrollTo]) {
    const element = sectionRefs.current[scrollTo];
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middleOfScreen = window.innerHeight / 2;
      const elementMiddle = elementRect.height / 2;

      const scrollPosition = absoluteElementTop - middleOfScreen + elementMiddle;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }

    router.replace("/services", { scroll: false });
  }
  }, [searchParams, router]);


  return (

    <div className="container mx-auto ">

      {
        services.map((service, index) => (
          <div
            key={service.id}
           ref={(el) =>{sectionRefs.current[service.id] = el}}
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