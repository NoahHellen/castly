import React from "react";

function Introduction() {
  return (
    <div className="hero bg-base-100 rounded-2xl">
      <div className="hero-content text-center w-full max-w-5xl mx-auto">
        <div className="w-full">
          <h1 className="text-5xl font-bold">Bayesian forecast</h1>
          <p className="py-6">
            The Bayesian forecast of the time series is shown below. To get the
            most out of the forecast, have a play around with the many
            configurations available to you!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
