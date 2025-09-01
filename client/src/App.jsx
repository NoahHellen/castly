import React from "react";
import HomePage from "./pages/home";
import GetStartedPage from "./pages/get_started";
import TimeSeriesPage from "./pages/time_series";
import BayesPage from "./pages/bayes";
import TransformerPage from "./pages/transformer";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
