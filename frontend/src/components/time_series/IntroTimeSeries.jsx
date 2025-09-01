import React from "react";

function IntroTimeSeries() {
  return (
    <div className="hero bg-base-100 rounded-2xl">
      <div className="hero-content text-center w-full max-w-5xl mx-auto">
        <div className="w-full">
          <h1 className="text-5xl font-bold">Time series</h1>
          <p className="py-6">
            Below is a visualisation of your time series data. You can also add
            to the time series by uploading documents – the AI OCR technology
            will extract the time series information from the document and
            append the time series. You can also introduce a completely new time
            series if you wish.
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroTimeSeries;
