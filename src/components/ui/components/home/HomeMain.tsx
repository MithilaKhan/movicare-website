import React from 'react';
import Banner from './Banner';
import Navbar from '@/components/shared/Navbar';
import Companies from './Companies';
import WhyChoose from './WhyChoose';
import EasyStress from './EasyStress';
import ClientReview from './ClientReview';
import GotQuestions from './GotQuestions';

const HomeMain = () => {
    return (
        <div>
          <Banner /> 
          <Navbar /> 
          <Companies/> 
          <WhyChoose /> 
          <EasyStress/> 
          <ClientReview/> 
          <GotQuestions/>
        </div>
    );
};

export default HomeMain;