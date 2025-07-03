import React from 'react';
import AboutHeader from './AboutHeader';
import Companies from '../home/Companies';
import HowItAll from './HowItAll';
import WhyChoose from '../home/WhyChoose';
import GotQuestions from '@/components/shared/GotQuestions';

const AboutMainPage = () => {
    return (
        <div className=' lg:pt-[180px] pt-32 container'>
  <AboutHeader /> 
  <Companies/> 
  <HowItAll/>  

  <div className='lg:pt-[120px] pt-10 pb-[54px]'> 
  <video
                      src="/video/about.mp4"
                      controls 
                      autoPlay
                      loop
                      className="rounded-lg lg:h-[720px] h-auto w-full object-cover"
                    />
  </div> 

  <WhyChoose/> 
  <GotQuestions/>
        </div>
    );
};

export default AboutMainPage;