import React from "react";

import RefreshData from "../../components/RefreshData";

import Introduction from "./introduction";
import BayesChart from "./bayes_chart";

function BayesPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Introduction />
      <RefreshData />
      <BayesChart />
    </main>
  );
}

export default BayesPage;
