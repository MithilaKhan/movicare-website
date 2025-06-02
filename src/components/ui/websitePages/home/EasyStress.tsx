const steps = [
    {
        number: "01",
        title: "Check Availability & Rates",
        description: "Use our simple rate calculator:"
    },
    {
        number: "02",
        title: "Customize Your Ride",
        description: "Select your route, time, and preferences."
    },
    {
        number: "03",
        title: "Confirm & Ride",
        description: "Instant confirmation, and reminders"
    }
];

const content = {
    heading: "Easy, Stress-Free Booking in 3 Steps",
    subtext: "Simple Font & Accessible Book Your Ride in Just 3 Steps!",
    paragraph: "Booking your accessible trips with MoviCare's quick and handy interface. Simply select your starting point, your route, and confirm your booking—all in just a few clicks. You'll get real-time updates throughout the journey keeping you informed every step of the way. Our specially designed service ensures a safe, comfortable journey, whether for daily errands, medical appointments, or travel adventures."
};

const EasyStress = () => {
    return (
        <div className=" my-16 bg-[#202020] mx-auto">
            <div className=" container mx-auto lg:pt-[120px] pt-20 pb-[80px]">
                <div className=" mx-auto lg:px-4 px-1 ">

                    {/* title  */}

                    <div className="flex flex-col items-center justify-center lg:mb-16 mb-8">

                        <h2 className="lg:text-[32px] text-[24px] w-full font-semibold text-white mb-6 lg:max-w-[430px] text-center tracking-wide">
                            {content.heading}
                        </h2>
                        <p className="lg:text-xl text-[#a6a6a6] text-center text-[16px]  ">
                            {content.subtext}
                        </p>
                    </div>


                    {/* Steps Grid */}
                    <div className="flex lg:flex-row flex-col-reverse w-full lg:gap-[100px] gap-8 lg:mb-16 mb-0 items-center">
                        <div className=" lg:w-[35%] w-full flex flex-col   gap-10">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className=" "
                                >

                                    <div className={` ${step.number === "01" ? "text-white" : "text-[#363636]"}  lg:text-[80px]  text-[70px] font-extrabold" `} >
                                        {step.number}
                                    </div>
                                    <h3 className="lg:text-2xl text-xl  font-medium text-white -mt-2 pb-3">{step.title}</h3>

                                    <p className="text-content3 lg:text-lg text-[16px] ">{step.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="lg:w-[65%] w-full flex justify-center items-center">
                            <img src="/easyStress.svg" alt="" className="w-full" />
                        </div>
                    </div>


                    {/* section 2  */}

                    <div className=" flex lg:flex-row flex-col items-end w-full justify-center pt-20 lg:gap-32 gap-8 ">
                        {/* image   */}
                        <div className="lg:w-1/2 w-full ">
                            <img src="/easyStress2.png" alt="" className=" w-full h-[400px] " />
                        </div>

                        {/* Content Section */}
                        <div className=" lg:w-1/2 w-full ">
                            <p className="lg:text-lg text-[16px] text-[#a6a6a6] leading-relaxed">
                                {content.paragraph}
                            </p>
                        </div>

                    </div>


                </div>
            </div>

        </div>
    );
};

export default EasyStress;