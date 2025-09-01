import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./app/HomePage";
import BayesPage from "./app/BayesPage";
import EasterEgg from "./app/EasterEgg";
import GetStartedPage from "./app/GetStartedPage";
import TransformerPage from "./app/TransformerPage";
import TimeSeriesPage from "./app/TimeSeriesPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/time-series" element={<TimeSeriesPage />} />
        <Route path="/bayes" element={<BayesPage />} />
        <Route path="/transformer" element={<TransformerPage />} />
        <Route path="/easter-egg" element={<EasterEgg />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
