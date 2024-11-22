import React from "react";

type IHeadingProps = React.ComponentPropsWithoutRef<'h1'>

const Heading = React.forwardRef<React.ElementRef<'h1'>, IHeadingProps>(
    ({ className, title, ...props }, ref) => {
        return (
            <h1
                className={`text-lg md:text-2xl font-bold ${className}`}
                {...props}
                ref={ref}
            >
                {title}
            </h1>
        )
    }
)

Heading.displayName = 'Heading'

export {Heading}