
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
  return (
    <img
      src={src || fallback}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default Image;
