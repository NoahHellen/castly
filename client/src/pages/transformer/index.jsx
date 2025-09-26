import React from "react";

import RefreshData from "../../components/RefreshData";

import Introduction from "./introduction";
import TransformerChart from "./transformer_chart";

function TransformerPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Introduction />
      <RefreshData />
      <TransformerChart />
    </main>
  );
}

export default TransformerPage;
