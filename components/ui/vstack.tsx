
import React from 'react';

type IVStackProps = React.ComponentPropsWithoutRef<'div'>

const VStack = React.forwardRef<React.ElementRef<'div'>, IVStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={`flex flex-col ${className}`}
        {...props}
        ref={ref}
      />
    );
  }
);

VStack.displayName = 'VStack';

export { VStack };