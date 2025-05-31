"use client";
import { imageUrl } from "@/redux/base/baseApi";
import { useGetCompaniesQuery } from "@/redux/features/others/home/companiesSlice";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect } from "react";

const Companies = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  }); 
  const {data} = useGetCompaniesQuery(undefined);   
  const images = data?.map((company) => company.image?.startsWith("http") ? company.image : `${imageUrl}${company.image}`) || []; 

  console.log(data, "companies data");

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 8000);
      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);



  return (
    <div className="my-16  container mx-auto">
      <p className="text-[16px] text-content2 text-center">
        Trusted by 54+ companies
      </p>

      <div className="">
        <div className="flex items-center justify-center w-full pt-10">
          <div className="embla overflow-hidden w-full" ref={emblaRef}>
            <div className="embla__container flex gap-2  w-full">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="embla__slide px-2"
                  style={{
                    flex: "0 0 33.3333%", // Default: show 3 slides
                  }}
                >
                  <img
                    src={image}
                    alt={`Company ${index + 1}`}
                    className="h-[64px] w-[120px] object-contain mx-auto"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  className="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 hover:bg-primary/50"
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom responsive fix */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 20% !important; /* 5 slides on large screens */
          }
        }
      `}</style>
    </div>
  );
};

export default Companies;
