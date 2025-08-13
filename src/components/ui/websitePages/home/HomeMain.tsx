import React from 'react';
import Banner from './Banner';
import Companies from './Companies';
import WhyChoose from './WhyChoose';
import EasyStress from './EasyStress';
import ClientReview from './ClientReview';
import ReadyFor from '@/components/shared/ReadyFor';
import GotQuestions from '@/components/shared/GotQuestions';
import Animation from './Animation';
// import TemporaryBanner from './TemporaryBanner';

 


const HomeMain = () => {
    return (
        <div>
          <Banner />  
          {/* <TemporaryBanner /> */}
          <Companies/> 
          <WhyChoose /> 
          <EasyStress/>  
          <Animation/>
          <ClientReview/> 
          <GotQuestions/> 
          <ReadyFor/>
        </div>
    );
};

export default HomeMain;