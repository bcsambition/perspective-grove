
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4 mx-auto"></div>
        <p className="text-muted-foreground">Loading article...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
