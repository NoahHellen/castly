import React, { useEffect } from "react";
import { PackageIcon } from "lucide-react";

import { useDatabase } from "../services/api/db";

function NoData() {
  const { timeSeries, fetchTimeSeries, loading } = useDatabase();

  useEffect(() => {
    fetchTimeSeries;
  }, [fetchTimeSeries]);

  return (
    <div>
      {timeSeries.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No data found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first data point
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NoData;
