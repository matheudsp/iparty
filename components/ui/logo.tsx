import { Squirrel } from 'lucide-react';

interface iLogo {
    size?:number
    className?: string
}
const Logo = ({size, className}:iLogo) => {
  return (
    <Squirrel
      className={`${className}`}
     size={size} />
  );
};

export default Logo;
