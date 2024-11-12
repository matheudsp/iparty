import React from 'react';


type IHStackProps = React.ComponentPropsWithoutRef<'div'>

const HStack = React.forwardRef<React.ElementRef<'div'>, IHStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={`flex flex-row ${className}`}
        {...props}
        ref={ref}
      />
    );
  }
);

HStack.displayName = 'HStack';

export { HStack };