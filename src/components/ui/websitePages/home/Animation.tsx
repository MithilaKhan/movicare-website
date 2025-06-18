"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Animation() {
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const textEl = textRef.current;

        const timeline = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });

        timeline
            .to(".car-container", {
                x: "120%", 
                // opacity: 0, 
                duration: 4,
                onStart: () => {
                    if (textEl) textEl.innerText = "Accessible Mobility For All";
                },
            })
            .to(".car-container", {
                opacity: 2,
                duration: 0.1,
                onComplete: () => {
                    if (textEl) textEl.innerText = "Mobility Without Limits";
                },
            })
            .set(".car-container", { x: "-50%" }) // Reset position
            .to(".car-container", { 
                opacity: 0,
                duration: 0.1,
            });
    }, []);

    return (
        <section
            className="animation-container "
            style={{
                position: "relative",
                paddingBottom: "100px",
                background: "#fff",
                overflow: "hidden",
                width: "100%",
            }}
        >
            <div
                className="text-container flex items-center justify-center"
                style={{
                    position: "absolute",
                    top: "40%",
                    left: "20%",
                    fontSize: "24px",
                    zIndex: 0,
                }}
            >
                <div > 
                    <p className="uppercase text-[16px] text-[#000] font-normal text-center">about us</p> 
                    <p className="text-[62px] font-normal text-content1">  Our Mission: <span ref={textRef} className="font-bold">Accessible Mobility For All</span> </p>
                  
                </div>
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
                <img src="/class.svg" alt="Car" style={{ width: "2000px" , height: "800px"}} />
            </div>
        </section>
    );
}
