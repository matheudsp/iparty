import React from "react";

export const LoaderPinwheel: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-6 h-6">
      <div className="absolute w-full h-full animate-spin">

        <div className="absolute w-full h-full rounded-full border-4 border-t-primary border-r-secondary border-b-accent border-l-foreground"></div>
      </div>

    </div>
  );
};
