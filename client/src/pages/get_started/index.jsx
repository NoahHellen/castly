import React from "react";

import Introduction from "./introduction";
import Steps from "./steps";

function GetStartedPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Introduction />
      <Steps />
    </main>
  );
}

export default GetStartedPage;
