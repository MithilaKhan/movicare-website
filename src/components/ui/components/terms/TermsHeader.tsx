
export default function TermsHeader() {
  return (
    <div className="w-full lg:pt-[180px] pt-32 lg:container ">
      
      {/* Title and introduction */}
      <div className="  lg:pb-12 pb-8">
      
          <h1 className="lg:text-[50px] text-[32px] font-normal text-content1 lg:mb-6 mb-4"> <span className="font-bold"> Terms  </span> &  <span className="font-bold">Conditions </span> </h1>
          <p className="text-content2 lg:text-lg text-[16px] font-normal leading-relaxed">
            By using NowCare services, you agree to our Terms & Conditions, ensuring a safe, reliable, and accessible transportation experience. Please review the following guidelines to understand our booking process, payment policies, cancellations, and user responsibilities.
          </p>
       
      </div> 

      {/* Hero section with image and overlay */}
      <div className=" w-full lg:h-[530px] h-[400px]">
        <img
          src="/terms.svg"
          alt="Person in wheelchair on a path"
          className="object-cover g:h-[530px] h-[400px] w-full rounded-xl"
        />

      </div>
 

    </div>
  );
}