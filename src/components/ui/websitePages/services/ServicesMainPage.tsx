'use client';
import React from 'react';
import ServicesBanner from './ServicesBanner';
import AllServices from './AllServices';
import GotQuestions from '@/components/shared/GotQuestions';
import ReadyFor from '@/components/shared/ReadyFor';

const ServicesMainPage = () => {
    return (
        <div>
            <ServicesBanner /> 
            <AllServices/> 
            <GotQuestions/> 
            <ReadyFor/>
        </div>
    );
};

export default ServicesMainPage;