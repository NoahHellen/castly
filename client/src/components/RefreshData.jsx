import React from "react";
import { RefreshCwIcon } from "lucide-react";

import { useDatabase } from "../services/api/db";

function RefreshData() {
  const { fetchTimeSeries } = useDatabase();
  return (
    <div className="flex justify-end">
      <button className="btn btn-ghost btn-circle" onClick={fetchTimeSeries}>
        <RefreshCwIcon className="size-5" />
      </button>
    </div>
  );
}

export default RefreshData;
