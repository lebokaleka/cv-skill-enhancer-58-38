
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image = ({ 
  src, 
  alt, 
  fallback = "/placeholder.svg",
  className,
  ...props 
}: ImageProps) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  
  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={error ? fallback : (src || fallback)}
        alt={alt || "Template preview"}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => {
          console.error(`Failed to load image: ${src}`);
          setError(true);
          setLoading(false);
        }}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </div>
  );
};

export default Image;
