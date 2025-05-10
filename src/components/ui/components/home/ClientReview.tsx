/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { RiDoubleQuotesL } from "react-icons/ri";


interface Testimonial {
    id: number;
    name: string;
    review: string;
    image: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Leon Fischer',
        review: 'MoviCare has been a game-changer for me! Booking is so easy, and the van’s accessibility features make every ride comfortable and stress-free.',
        image: '/user1.jpg',
        rating: 5
    },
    {
        id: 2,
        name: 'Asadujjaman Mahfuj',
        review: 'Love the convenience of Tweet! Fast, reliable, and super easy to use for all your food delivery.',
        image: '/user1.jpg',
        rating: 4
    },
    {
        id: 3,
        name: 'John Doe',
        review: 'Love the convenience of Tweet! Fast, reliable, and super easy to use for all your food delivery.',
        image: '/user1.jpg',
        rating: 5
    },
]

const ClientReview = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        skipSnaps: false,
    });

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

                <div className="flex  items-center justify-center ">

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
                                            className="rounded-full"
                                        />
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-semibold text-xl text-white">{review.name}</h3>
                                            <p className="text-[16px] text-gray-600">San José</p>
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