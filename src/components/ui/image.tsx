
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const Image = ({
  src,
  alt,
  fallback = "/placeholder.svg",
  className,
  objectFit = "cover",
  ...props
}: ImageProps) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const objectFitClass = {
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down'
  }[objectFit];

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setLoading(false);
  };

  // Reset states when src changes
  React.useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  return (
    <div className="w-full h-full relative" data-image-container>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/20 z-10" data-image-loading>
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={error ? fallback : src || fallback} 
        alt={alt || "Template preview"} 
        onError={handleImageError}
        onLoad={handleImageLoad}
        className={`w-full h-full ${objectFitClass} ${className || ''}`}
        {...props}
        data-image
      />
    </div>
  );
};

export default Image;
