"use client";

import { useEffect } from "react";
// import TermsHeader from "./TermsHeader";
// import TermsSection from "./TermsSection";

const TermsConditions = () => { 
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
      }, []);
    return (
   <div className="container  mx-auto py-12 px-4 mb-6 text-[#2c2c2c] font-medium mt-[82px]">
      <h2 className="text-xl font-bold mb-4">Terms & Conditions – MoviCare Costa Rica</h2>
      <p className="mb-6">
        Welcome to MoviCare, your accessible and reliable transportation solution in Costa Rica. By booking a service through our website or WhatsApp, you agree to the following terms and conditions:
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">1. Booking Process</h3>
      <p className="mb-2">MoviCare offers booking through two official channels:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Our website: <a href="https://www.movicare.cr" className="text-blue-600 underline">www.movicare.cr</a></li>
        <li>Our WhatsApp number: +506 6019-1762</li>
      </ul>
      <p className="mb-6">
        We recommend that all bookings be made <strong>at least 12 hours in advance</strong> to ensure vehicle availability and optimal service.
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">2. Service Scope</h3>
      <p className="mb-6">
        MoviCare provides <strong>accessible transportation</strong> services, mainly for individuals with mobility limitations, including those in wheelchairs, elderly passengers, and patients requiring special assistance. All trips are door-to-door and tailored to the passenger’s needs.
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">3. Cancellations and Refund Policy</h3>
      <p className="mb-2">Users may cancel a reservation under the following conditions:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Cancellations made <strong>24 hours before the scheduled pickup time</strong> are automatically refunded in full.
        </li>
        <li>
          Cancellations made less than <strong>24 hours in advance</strong> of the scheduled pickup time must be handled directly through our customer service team.
        </li>
      </ul>
      <p className="mb-6">
        Refunds are processed automatically to the original payment method and may take up to 7 business days, depending on the financial institution.
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">4. Modifications</h3>
      <p className="mb-6">
        Bookings cannot be modified once confirmed (including date, time, pick-up point, or number of passengers). If you need to make any changes, you must cancel your current booking and create a new one. For assistance, please contact us. Cancellations are subject to our availability and refund policy.
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">5. User Responsibility</h3>
      <p className="mb-2">By using our services, users agree to:</p>
      <ul className="list-disc list-inside mb-6">
        <li>Provide accurate information when booking (locations, passenger count, mobility needs).</li>
        <li>Be ready at the scheduled pickup time.</li>
        <li>Respect our staff and equipment.</li>
      </ul>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">6. Liability Disclaimer</h3>
      <p className="mb-6">
        MoviCare operates under the Costa Rican framework for private transport services and complies with all applicable transport and accessibility regulations. While we aim to provide a punctual and safe experience, MoviCare is not liable for delays due to unforeseen events (e.g. traffic, weather, or road conditions).
      </p>

      <hr className="my-6" />

      <h3 className="text-lg font-bold mb-2">7. Data Protection</h3>
      <p className="mb-6">
        MoviCare respects your privacy. Personal information collected during the booking process will only be used to provide and improve our services. We will never share your data without your consent, except when legally required.
      </p>

      <p className="mt-4">
        If you have questions about these terms, please contact us at <a href="mailto:info@movicare.cr" className="text-blue-600 underline">info@movicare.cr</a> or through WhatsApp at <strong>+506 6019-1762</strong>
      </p>
    </div>
    );
};

export default TermsConditions;