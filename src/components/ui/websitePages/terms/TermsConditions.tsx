"use client";

import { useEffect } from "react";
import TermsHeader from "./TermsHeader";
import TermsSection from "./TermsSection";

const TermsConditions = () => { 
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
      }, []);
    return (
        <main className="flex min-h-screen flex-col items-center container ">
        <TermsHeader />
        
        <div className="w-full lg:py-[120px] py-12 ">
          <TermsSection
            title="Introduction"
            content={[
              "When you use NowCare! By using our services, you agree to comply with the following terms and conditions. Please read them carefully before making a ride."
            ]}
          />
  
          <TermsSection
            title="Service Overview"
            content={[
              "NowCare provides wheelchair-accessible transportation services in Costa Rica, offering flexible scheduling, customized routes, and inclusive travel experiences."
            ]}
          />
  
          <TermsSection
            title="User Eligibility"
            bulletPoints={[
              "Users must be at least 18 years old to book a ride.",
              "Users under 18 years must be accompanied by an adult or guardian."
            ]}
          />
  
          <TermsSection
            title="Booking & Reservations"
            bulletPoints={[
              "Reservations can be made through our website.",
              "Booking confirmation is subject to vehicle availability.",
              "Cancellations must be made at least 24 hours in advance to avoid charges."
            ]}
          />
  
          <TermsSection
            title="Payment & Fees"
            bulletPoints={[
              "All payments must be made via our secure online payment system.",
              "Pricing is displayed on our Rates & Booking page.",
              "Additional charges may apply for custom routes, extra stops, or extended hours."
            ]}
          />
  
          <TermsSection
            title="Cancellations & Refunds"
            bulletPoints={[
              "Cancellations made 24 hours before the ride will receive a full refund.",
              "Late cancellations or no-shows may result in a partial or no refund.",
              "Refunds are processed within 3-7 business days."
            ]}
          />
  
          <TermsSection
            title="User Responsibilities"
            bulletPoints={[
              "Users must provide accurate booking details.",
              "Any damage to the vehicle due to negligence may result in additional charges.",
              "Users should respect the driver and accessibility guidelines during the ride."
            ]}
          />
  
          <TermsSection
            title="Modifications to Terms"
            content={[
              "MoviCare reserves the right to update these Terms & Conditions at any time. Continued use of our services implies acceptance of any changes."
            ]}
          />
        </div>
      </main>
    );
};

export default TermsConditions;