import React from 'react';
import ContactHeader from './ContactHeader';
import SendMessage from './SendMessage';
import GotQuestions from '@/components/shared/GotQuestions';

const ContactMainPage = () => {
    return (
        <div className='pt-[140px] container'>
            <ContactHeader/> 
            <SendMessage/> 
            <GotQuestions/>
        </div>
    );
};

export default ContactMainPage;