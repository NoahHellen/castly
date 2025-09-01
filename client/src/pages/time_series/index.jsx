import React from "react";
import Intro from "./Intro";
import RegularChart from "./RegularChart";
import ChangeTimeSeries from "./ChangeTimeSeries";
import RefreshData from "../../components/RefreshData";

function TimeSeriesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Intro />
      <RefreshData />
      <RegularChart />
      <ChangeTimeSeries />
    </main>
  );
}

export default TimeSeriesPage;
