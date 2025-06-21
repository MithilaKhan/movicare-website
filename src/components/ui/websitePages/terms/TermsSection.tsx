

interface TermsSectionProps {
  title: string;
  content?: string[];
  bulletPoints?: string[];
  className?: string;
}

export default function TermsSection({
  title,
  content,
  bulletPoints,
  className,
}: TermsSectionProps) {
  return (
    <section className={` mb-10 last:mb-0 pb-5 border-b border-gray-200  ${className}`}>
      <h2 className="lg:text-2xl text-xl font-bold text-content1 mb-4">{title}</h2>
      
      {content && content.map((paragraph, index) => (
        <p key={index} className="text-content2 lg:text-lg text-[16px] mb-4 leading-relaxed">
          {paragraph}
        </p>
      ))}
      
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className=" mt-3 space-y-2 pb-4">
          {bulletPoints.map((point, index) => (
            <li key={index} className="text-content2 leading-relaxed flex items-start">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-content2 text-lg mt-2 mr-2"></span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}