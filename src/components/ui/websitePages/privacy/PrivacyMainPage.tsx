"use client";

import { useEffect } from "react";
// import PrivacyHeader from "./PrivacyHeader";
// import PrivacySection from "./PrivacySection";

const PrivacyMainPage = () => { 
    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);
      }, []);
    return ( 
        <div className="container  mx-auto py-12 px-4 mb-6 text-[#383737] text-lg font-medium mt-[82px]">

      <div className="container mx-auto px-6 py-8"> 
        <div className="border-b-2 pb-7"> 
        <h1 className="text-[24px] text-start font-bold mb-3">Privacy Policy – MoviCare Costa Rica</h1>
        <p className="  italic">
          MoviCare is committed to protecting your personal data and your privacy. This Privacy Policy
          describes how we collect, use, and protect your information in accordance with the <strong>  Costa Rican
          Law No. 8968 </strong>, the Reglamento a la Ley de Protección de la Persona frente al Tratamiento de sus
          Datos Personales, and other applicable regulations.
        </p>

        </div>

        <section className=" border-b-2 py-7">
          <h2 className="text-[20px] font-bold  border-gray-300 pb-1">1. Data Controller</h2>
          <p className="mt-2">
            The data controller responsible for the personal data collected through this website and our
            official communication channels (including WhatsApp) is:
          </p> 
          <div className=" pt-4"> 
          <p><strong>MoviCare</strong></p>
          <p className="ps-2">Email: info@movicare.cr</p>
          <p className="ps-2">Phone/WhatsApp: +506 6019-1762</p>
          </div>
        </section>

        <section className=" border-b-2 py-7">
          <h2 className="text-xl font-bold pb-2">2. What Information We Collect</h2>
          <p className="mt-2 pb-3">We may collect and process the following personal information:</p>
          <ul className="list-disc pl-10 space-y-1 ">
            <li>Full name</li>
            <li>Phone number</li>
            <li>Email address</li>
            <li>Pickup and destination addresses</li>
            <li>Booking details (date, time, number of passengers, accessibility needs)</li>
            <li>Payment information (handled securely through third-party providers)</li>
            <li>Any additional details voluntarily provided by the user</li>
          </ul>
          <p className="mt-4">
            We do <strong> not</strong> collect sensitive personal data unless necessary to provide specialized assistance
            (e.g., mobility requirements).
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold pb-2">3. How We Use Your Information</h2> 
           <p className="mt-2 pb-3">Your data will only be used for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>To process and manage your bookings</li>
            <li>To communicate with you regarding your reservation</li>
            <li>To improve the quality of our service</li>
            <li>To manage internal records, analytics, and service feedback</li>
            <li>To comply with legal obligations and respond to lawful requests</li>
          </ul>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold pb-2">4. Legal Basis for Data Processing</h2>
          <p className="mt-2">
            All personal data is collected and processed based on the user’s <strong>informed and voluntary
            consent </strong> , and to the extent necessary to provide the transportation service requested.
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold pb-2">5. Data Sharing</h2>
          <p className="mt-2 pb-2">MoviCare does <strong>  not sell or rent </strong> personal data to third parties. We may share your information with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Our transport team and service providers (only what’s strictly necessary)</li>
            <li>Legal authorities, only when legally required</li>
          </ul>
          <p className="mt-4">
            All third parties we work with are required to comply with Costa Rican data protection laws.
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold pb-2">6. Data Storage and Retention</h2>
          <p className="mt-2">
            Your personal information will be stored securely and retained only for as long as necessary
            to fulfill the purposes described, or as required by Costa Rican law.
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold  pb-2">7. Your Rights</h2>
          <p className="mt-2">As a user, you have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access your personal data</li>
            <li>Request correction or updates to your data</li>
            <li>Revoke consent at any time</li>
            <li>Request deletion of your data (unless legally restricted)</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please email us at: <strong>info@movicare.cr</strong>
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold  pb-2">8. Cookies and Tracking</h2>
          <p className="mt-2">
            MoviCare’s website may use cookies to improve user experience. You may disable cookies in
            your browser settings, though this may affect some website functionalities.
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold  pb-2">9. Security Measures</h2>
          <p className="mt-2">
            We implement appropriate security measures to protect your personal data against unauthorized
            access, alteration, or destruction. We also rely on third-party platforms with encrypted payment
            systems and data protection protocols.
          </p>
        </section>

        <section className="border-b-2 py-7">
          <h2 className="text-xl font-bold  pb-2">10. Changes to This Policy</h2>
          <p className="mt-2">
            MoviCare may update this Privacy Policy periodically to reflect changes in legal requirements or
            service updates. You will be notified of major changes via the website.
          </p>
        </section>

        <section className=" py-7">
          <h2 className="text-xl font-bold  pb-2">Contact</h2>
          <p className="mt-2">
            If you have questions or concerns about this Privacy Policy or how your data is handled, please
            contact us at:
          </p>
          <p className=" pt-2"><strong>MoviCare</strong></p>
          <p>Email: info@movicare.cr</p>
          <p>Phone: +506 6019-1762</p>
        </section>
      </div>
    </div>
    );
};

export default PrivacyMainPage;