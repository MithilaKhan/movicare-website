"use client";
import { imageUrl } from "@/redux/base/baseApi";
import { useGetCompaniesQuery } from "@/redux/features/others/home/companiesSlice";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Companies = () => {
  const { data } = useGetCompaniesQuery(undefined);
  const images = data?.map((company) =>
    company.image?.startsWith("http") ? company.image : `${imageUrl}${company.image}`
  ) || [];

  // Determine if we should center/loop or not
  const shouldCenterAndLoop = images?.length > 3;

  return (
    <div className="my-16 container mx-auto">
      <p className="text-[16px] text-content2 text-center">
        Trusted by {data?.length} companies
      </p>

      <div className=" w-full pt-10 ">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={8}
          slidesPerView={3}
          centeredSlides={shouldCenterAndLoop}
          loop={shouldCenterAndLoop}
          autoplay={shouldCenterAndLoop ? {
            delay: 8000,
            disableOnInteraction: false,
          } : false}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
          className="w-full py-10  flex items-center justify-center "
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className=" mx-auto ">
              <img
                src={image}
                alt={`Company ${index + 1}`}
                className="h-[64px] w-[160px] object-contain mx-auto"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Companies;
