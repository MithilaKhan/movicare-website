"use client"; // Only if you're using App Router (Next.js 13+ with app directory)

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Animation() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".car-container", {
      scrollTrigger: {
        trigger: ".animation-container",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const textEl = document.getElementById("mission-text");

          if (progress < 0.3) {
            textEl!.innerText = "Accessible Mobility For All";
          } else if (progress >= 0.3 && progress < 0.7) {
            textEl!.innerText = "Mobility Without Limits";
          } else {
            textEl!.innerText = "Future of AI Transport";
          }
        },
      },
      x: "120%",
      ease: "none",
    });
  }, []);

  return (
    <section className="animation-container" style={{ position: "relative", height: "100vh", background: "#fff", overflow: "hidden" }}>
      <div className="text-container" style={{ position: "absolute", top: "40%", left: "10%", fontSize: "24px", zIndex: 1 }}>
        <h2>
          Our Mission: <span id="mission-text">Accessible Mobility For All</span>
        </h2>
      </div>
      <div className="car-container" style={{ position: "absolute", top: "50%", left: "-50%", transform: "translateY(-50%)", zIndex: 2 }}>
        <img src="/class.svg" alt="Car" style={{ width: "500px" }} />
      </div>
    </section>
  );
}
