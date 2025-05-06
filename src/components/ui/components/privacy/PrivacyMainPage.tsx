"use client";

import { useEffect } from "react";
import PrivacyHeader from "./PrivacyHeader";
import PrivacySection from "./PrivacySection";


const PrivacyMainPage = () => { 
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
      }, []);
    return (
        <main className="flex min-h-screen flex-col items-center container ">
        <PrivacyHeader />
        
        <div className="w-full py-[120px] ">
          <PrivacySection
            title="Introduction"
            content={[
              "When you use NowCare! By using our services, you agree to comply with the following terms and conditions. Please read them carefully before making a ride."
            ]}
          />
  
          <PrivacySection
            title="Service Overview"
            content={[
              "NowCare provides wheelchair-accessible transportation services in Costa Rica, offering flexible scheduling, customized routes, and inclusive travel experiences."
            ]}
          />
  
          <PrivacySection
            title="User Eligibility"
            bulletPoints={[
              "Users must be at least 18 years old to book a ride.",
              "Users under 18 years must be accompanied by an adult or guardian."
            ]}
          />
  
          <PrivacySection
            title="Booking & Reservations"
            bulletPoints={[
              "Reservations can be made through our website.",
              "Booking confirmation is subject to vehicle availability.",
              "Cancellations must be made at least 24 hours in advance to avoid charges."
            ]}
          />
  
          <PrivacySection
            title="Payment & Fees"
            bulletPoints={[
              "All payments must be made via our secure online payment system.",
              "Pricing is displayed on our Rates & Booking page.",
              "Additional charges may apply for custom routes, extra stops, or extended hours."
            ]}
          />
  
          <PrivacySection
            title="Cancellations & Refunds"
            bulletPoints={[
              "Cancellations made 24 hours before the ride will receive a full refund.",
              "Late cancellations or no-shows may result in a partial or no refund.",
              "Refunds are processed within 3-7 business days."
            ]}
          />
  
          <PrivacySection
            title="User Responsibilities"
            bulletPoints={[
              "Users must provide accurate booking details.",
              "Any damage to the vehicle due to negligence may result in additional charges.",
              "Users should respect the driver and accessibility guidelines during the ride."
            ]}
          />
  
          <PrivacySection
            title="Modifications to Terms"
            content={[
              "MoviCare reserves the right to update these Terms & Conditions at any time. Continued use of our services implies acceptance of any changes."
            ]}
          />
        </div>
      </main>
    );
};

export default PrivacyMainPage;