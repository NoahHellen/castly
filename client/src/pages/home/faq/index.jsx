import React from "react";
import { Link } from "react-router-dom";

function Faq() {
  return (
    <div className="space-y-4 mt-8">
      <div className="collapse bg-base-300 shadow-sm">
        <input type="checkbox" />
        <div className="collapse-title font-semibold ">
          How does the Bayesian method work?
        </div>
        <div className="collapse-content text-sm">
          A prior distribution is assumed, which is updated after each new data
          entry.
        </div>
      </div>

      <div className="collapse bg-base-300 shadow-sm">
        <input type="checkbox" />
        <div className="collapse-title font-semibold">
          How do I input my own time series data?
        </div>
        <div className="collapse-content text-sm">
          The forecast is configured to AAPL stock time series data. You can
          remove this data and add your own on the{" "}
          <Link
            to="/time-series"
            className="text-secondary hover:underline transition"
          >
            time series
          </Link>{" "}
          page.
        </div>
      </div>
    </div>
  );
}

export default Faq;
