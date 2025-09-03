import React from "react";
import { Loader } from "lucide-react";

function LoadingData() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="bg-base-100 rounded-full p-6">
          <Loader className="size-12" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold ">Loading data</h3>
          <p className="text-gray-500 max-w-sm">
            Currently retrieving the time series data!
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingData;
