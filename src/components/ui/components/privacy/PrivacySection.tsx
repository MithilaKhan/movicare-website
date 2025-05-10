

interface PrivacySectionProps {
    title: string;
    content?: string[];
    bulletPoints?: string[];
    className?: string;
  }
  
  export default function PrivacySection({
    title,
    content,
    bulletPoints,
    className,
  }: PrivacySectionProps) {
    return (
      <section className={` lg:mb-10 mb-8 last:mb-0  ${className}`}>
        <h2 className="lg:text-2xl text-xl font-bold text-content1 lg:mb-4 mb-2">{title}</h2>
        
        {content && content.map((paragraph, index) => (
          <p key={index} className="text-content2 lg:text-lg text-[16px] lg:mb-4 mb-2 leading-relaxed">
            {paragraph}
          </p>
        ))}
        
        {bulletPoints && bulletPoints.length > 0 && (
          <ul className=" mt-3 space-y-2">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-content2 leading-relaxed flex items-start">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-content2 lg:text-lg text-[16px] mt-2 mr-2"></span>
                {point}
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }