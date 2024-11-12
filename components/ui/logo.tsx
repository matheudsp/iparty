import { Squirrel } from 'lucide-react';
interface iLogo {
    size?:number
}
const Logo = ({size}:iLogo) => {
  return (
    <Squirrel size={size}/>
  );
};

export default Logo;
