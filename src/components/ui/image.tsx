
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
  
  return (
    <img
      src={error ? fallback : (src || fallback)}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
};

export default Image;
