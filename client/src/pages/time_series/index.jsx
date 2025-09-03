import React from "react";

import RefreshData from "../../components/RefreshData";

import Introduction from "./introduction";
import RegularChart from "./regular_chart";
import ChangeTimeSeries from "./update_chart";

function TimeSeriesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Introduction />
      <RefreshData />
      <RegularChart />
      <ChangeTimeSeries />
    </main>
  );
}

export default TimeSeriesPage;
