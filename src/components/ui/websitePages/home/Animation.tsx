"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AfterAnimation from "./AfterAnimation";

gsap.registerPlugin(ScrollTrigger);

export default function Animation() {
    const sectionRef = useRef<HTMLElement>(null);
    const [showAlternate, setShowAlternate] = useState(false);

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center",
                once: true,
            },
            defaults: { ease: "linear" },
        });

        timeline
            .to(".car-container", {
                x: "120%",
                duration: 4,
            })
            .to(".car-container", {
                opacity: 2,
                duration: 0.1,
                onComplete: () => setShowAlternate(true),
            })
            .set(".car-container", { x: "-50%" })
            .to(".car-container", {
                opacity: 0,
                duration: 0.1, 
                 scale: 0.95,
            });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="animation-container lg:h-[800px] h-[500px] w-full"
            style={{
                position: "relative",
                paddingBottom: "100px",
                background: "#fff",
                overflow: "hidden",
                width: "100%",
            }}
        >
            <div
                className="text-container flex items-center justify-center w-full h-full"
                // style={{
                //     position: "absolute",
                //     top: "40%",
                //     left: "20%",
                //     fontSize: "24px",
                //     zIndex: 0,
                // }}
            >
                {
                    showAlternate ? <AfterAnimation /> : <div className="flex flex-col items-center justify-center lg:mt-0 mt-5">
                        <p className="uppercase lg:text-[16px] text-[14px] text-[#000] font-normal text-center">about us</p>
                        <p className="lg:text-[62px] text-[24] font-normal text-content1">
                            Our Mission: <span className="font-bold">Accessible Mobility For All</span>
                        </p>
                    </div>
                }

            </div>
            <div
                className="car-container"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "-50%",
                    transform: "translateY(-50%)",
                    zIndex: 100,
                    width: "100%",
                }}
            >
                <img src="/class.svg" alt="Car" className=" lg:h-[800px] h-[500px] lg:w-[2000px] w-[500px] " style={{ width: "2000px", height: "800px" }} />
            </div>
        </section>
    );
}
