
const AboutHeader = () => {
    return (
        <div className="lg:pb-[54px]">
             <div className="lg:pb-[56px] pb-10"> 
            <p className=" uppercase text-[16px] text-primary font-normal pb-6 ">ABOUT US</p> 
            <p className=" lg:text-[50px] text-[32px] font-normal text-content1 pb-6"> <span>Empowering Mobility, Enhancing Freedom  </span> </p> 
            <p className="text-content2 text-lg font-normal leading-relaxed">At MoviCare, we believe mobility should never be a barrier. Our mission is to provide safe, comfortable, and accessible transportation solutions for individuals with mobility challenges in Costa Rica </p>
         </div>  
           
           <div> 
            <img
                src="/about.svg"
                alt="Person in wheelchair on a path"
                className="object-cover  lg:h-[570px] h-[400px] w-full rounded-xl"
            />
           </div>
        </div>
    );
};

export default AboutHeader;