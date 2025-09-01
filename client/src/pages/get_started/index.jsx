import React from "react";
import Intro from "./Intro";
import Steps from "./Steps";

function GetStartedPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Intro />
      <Steps />
    </main>
  );
}

export default GetStartedPage;
