/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useGetSelectedReviewsQuery } from "@/redux/features/others/home/reviewHomeSlice";
import { imageUrl } from "@/redux/base/baseApi";
import { ConfigProvider, Rate } from "antd";

const ClientReview = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

    const { data } = useGetSelectedReviewsQuery(undefined);

    const testimonials = data?.map((review) => ({
        id: review._id,
        name: review.user.name,
        review: review.comment,
        image: review.user.image?.startsWith("http") ? review.user.image : `${imageUrl}${review.user.image}`,
        rating: review.rating
    })) || [];

    useEffect(() => {
        if (emblaApi) {
            const autoplay = setInterval(() => {
                emblaApi.scrollNext();
            }, 8000);

            return () => clearInterval(autoplay);
        }
    }, [emblaApi]);

    return (
        <section className="  lg:py-[100px] py-14 h-[640px]" style={{
            backgroundImage: `url('/reviewBg.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover',
        }} >
            <div className="mx-auto  ">

                <div className="flex  items-center justify-start  container mx-auto">

                    <div className="embla overflow-hidden" ref={emblaRef}>
                        <div className="embla__container flex  gap-6 container ">
                            {testimonials.map((review) => (
                                <div key={review.id} className=" rounded-2xl space-y-4   embla__slide flex-[0_0_100%] min-w-0  ">
                                    <div className=" tracking-wider ">
                                        <p>   <RiDoubleQuotesL size={100} color="#63B134" className="" /> </p>
                                        <div className=" lg:mt-[40px] mt-2 lg:text-[32px] text-3xl text-white tracking-wide leading-10" >
                                            “{review.review}”
                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3 lg:pt-10 pt-5" >
                                        <Image
                                            src={review.image}
                                            alt="Customer avatar"
                                            width={72}
                                            height={72}
                                            className="rounded-full h-[62px] w-[62px] object-cover"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-semibold text-xl text-white">{review.name}</h3>
                                            <div>
                                                <ConfigProvider
                                                    theme={{
                                                        components: {
                                                            Rate: {
                                                                starColor: '#FAA61A',
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Rate disabled allowHalf defaultValue={review.rating} />
                                                </ConfigProvider>  </div>

                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center gap-2 lg:mt-6 mt-2">
                            {testimonials.map((_, index) => (
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
        </section>
    );
};

export default ClientReview;