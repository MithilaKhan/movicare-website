import React from 'react';
import AboutHeader from './AboutHeader';
import Companies from '../home/Companies';
import HowItAll from './HowItAll';
import WhyChoose from '../home/WhyChoose';
import GotQuestions from '@/components/shared/GotQuestions';

const AboutMainPage = () => {
    return (
        <div className=' pt-[180px] container'>
  <AboutHeader /> 
  <Companies/> 
  <HowItAll/>  

  <div className='pt-[120px] pb-[54px]'> 
  <video
                      src="https://media-hosting.imagekit.io//0ac241c717fc4f24/856213-hd_1920_1080_24fps.mp4?Expires=1831953825&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Xn9WTlwDunB~hZtjEkaRQCjAgx7uUV~2bS0Vni5ForrzGiG1TB70mOmObR~rf3SlHoG29cS6rSJvI7Oy1gDz2j01JqJxqi7c032oQxmz9kWWgEVL68dNgyipdug0G8cAp4PpSox5MF8JWqAIztbnuWHwxksQNgmeevxqwZGAk3s5XfMjxEHTfgV~RqYb~GQlZyaWIUdeWT3QHOZfFEziXrKYnGMYZMvXxJwkgURErwPzMr3zsuFbUwrTnzPSNMq09dUNhoKb5C2IEETGrTwdI3r5JKnvx2SJoCc--4jAeDTW3mP7AdnEKP7D2WjpUMNh8fH5oapZ7yKE54ERMe7znQ__"
                      controls 
                      autoPlay
                      loop
                      className="rounded-lg h-[720px] w-full object-cover"
                    />
  </div> 

  <WhyChoose/> 
  <GotQuestions/>
        </div>
    );
};

export default AboutMainPage;