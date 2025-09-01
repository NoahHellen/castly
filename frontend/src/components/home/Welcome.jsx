import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="hero bg-base-100 min-h-[250px] rounded-2xl md:col-span-2">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Forecast time series with Castly
            </h1>
            <p className="py-6">
              Gain access to state-of-the-art models for accurately predicting
              future values in your time series data.
            </p>
            <Link
              to="/get-started"
              className="hover:opacity-80 transition-opacity"
            >
              <button className="btn btn-secondary">Get started</button>
            </Link>
          </div>
        </div>
      </div>

      <figure className="diff aspect-16/10 rounded-2xl" tabIndex={0}>
        <div className="diff-item-1" role="img" tabIndex={0}>
          <div className="bg-secondary text-secondary-content grid place-content-center text-3xl font-normal">
            Bayesian
          </div>
        </div>
        <div className="diff-item-2" role="img">
          <div className="bg-base-300 grid place-content-center text-3xl font-normal">
            Transformer
          </div>
        </div>
        <div className="diff-resizer"></div>
      </figure>

      <div className="hero bg-base-300 min-h-[200px] rounded-2xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold">AI-enabled</h1>
            <p className="py-6">
              Castly has built-in AI Optical Character Recognition (OCR) to
              extract time series data from your documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
