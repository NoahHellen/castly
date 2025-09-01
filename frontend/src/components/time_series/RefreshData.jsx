import React from "react";
import { useDatabase } from "../../state/api";
import { RefreshCwIcon } from "lucide-react";

function Refresh() {
  const { fetchTimeSeries } = useDatabase();
  return (
    <div className="flex justify-end">
      <button className="btn btn-ghost btn-circle" onClick={fetchTimeSeries}>
        <RefreshCwIcon className="size-5" />
      </button>
    </div>
  );
}

export default Refresh;
