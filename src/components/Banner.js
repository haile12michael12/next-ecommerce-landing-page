import Link from 'next/link';
import Image from 'next/image';

export default function Banner({ 
  image, 
  title, 
  subtitle, 
  buttonText, 
  buttonLink = '/', 
  overlay = false, 
  position = 'center',
  height = 'md',
}) {
  // Height classes based on the height prop
  const heightClasses = {
    sm: 'h-48 sm:h-64 md:h-80',
    md: 'h-64 sm:h-80 md:h-96',
    lg: 'h-96 sm:h-[480px] md:h-[560px]',
  };
  
  // Text position classes
  const positionClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };
  
  return (
    <div className={`relative overflow-hidden rounded-lg ${heightClasses[height] || heightClasses.md}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          priority={true}
          className="transition-transform duration-700 hover:scale-105"
        />
        
        {/* Optional overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black/50" />
        )}
      </div>
      
      {/* Content */}
      <div className={`relative z-10 flex h-full w-full flex-col justify-center p-8 ${positionClasses[position]}`}>
        <div className={`max-w-md ${position === 'center' ? 'mx-auto' : ''}`}>
          {title && (
            <h2 className={`mb-3 text-3xl font-bold sm:text-4xl ${overlay ? 'text-white' : 'text-neutral-darkest'}`}>
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className={`mb-6 text-lg sm:text-xl ${overlay ? 'text-white/90' : 'text-neutral-dark'}`}>
              {subtitle}
            </p>
          )}
          
          {buttonText && (
            <Link
              href={buttonLink}
              className={`inline-block rounded-md px-6 py-3 font-medium ${
                overlay 
                  ? 'bg-white text-neutral-darkest hover:bg-white/90' 
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
