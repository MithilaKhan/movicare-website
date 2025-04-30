
export default function TermsHeader() {
  return (
    <div className="w-full pt-[180px] container ">
      
      {/* Title and introduction */}
      <div className="  pb-12">
      
          <h1 className="text-[50px] font-normal text-content1 mb-6"> <span className="font-bold"> Terms  </span> &  <span className="font-bold">Conditions </span> </h1>
          <p className="text-content2 text-lg font-normal leading-relaxed">
            By using NowCare services, you agree to our Terms & Conditions, ensuring a safe, reliable, and accessible transportation experience. Please review the following guidelines to understand our booking process, payment policies, cancellations, and user responsibilities.
          </p>
       
      </div> 

      {/* Hero section with image and overlay */}
      <div className=" w-full h-[530px]">
        <img
          src="/terms.svg"
          alt="Person in wheelchair on a path"
          className="object-cover  h-[530px] w-full rounded-xl"
        />

      </div>
 

    </div>
  );
}