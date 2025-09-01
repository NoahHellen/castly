import React from "react";
import { Link } from "react-router-dom";

function Steps() {
  return (
    <div className="space-y-20">
      <div className="card w-auto bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-start gap-16">
            <h2 className="text-normal font-bold">Step 1</h2>
            <span className="text-sm flex-1">
              Head over to the time series page where you can view the currently
              available time series data. The AAPL stock has been set up as the
              default. There are options to add to this data or to change it for
              your own.
            </span>
            <Link to="/time-series">
              <button className="btn btn-base-100">Time series</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card w-auto bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-start gap-16">
            <h2 className="text-normal font-bold">Step 2</h2>
            <span className="text-sm flex-1">
              Once you have decided what time series you would like to forecast,
              you can now head over to the models. On each page, there is
              information on how to set up and interpret the model. First up,
              you can head over to the Bayeysian model.
            </span>
            <Link to="/bayes">
              <button className="btn btn-base-100">Bayes forecast</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card w-auto bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-start gap-16">
            <h2 className="text-normal font-bold">Step 3</h2>
            <span className="text-sm flex-1">
              Finally, you can head over to the Transformer model forecast. Once
              again, there is information on the page on how to interpret and
              set up the model.
            </span>
            <Link to="/transformer">
              <button className="btn btn-base-100">Transformer forecast</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
