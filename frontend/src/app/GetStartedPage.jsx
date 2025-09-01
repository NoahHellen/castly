import React from "react";
import Steps from "../components/get_started/Steps";
import Intro from "../components/get_started/Intro";

function GetStartedPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <Intro />
      <Steps />
    </main>
  );
}

export default GetStartedPage;
