import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

import { useDatabase } from "../../../services/api/db";
import { useAi } from "../../../services/api/ai";
import Chart from "../../../utils/chartConfig";
import NoData from "../../../components/NoData";
import DatabaseError from "../../../components/DatabaseError";
import LoadingData from "../../../components/LoadingData";

function TransformerChart() {
  const { timeSeries, loading, fetchTimeSeries } = useDatabase();
  const { forecast } = useAi();

  useEffect(() => {
    fetchTimeSeries();
  }, [fetchTimeSeries]);

  const chartRef = useRef(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 10 },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  // format original data
  const timeSeriesLabels = timeSeries.map((row) => {
    const date = new Date(row.date);
    return date.toLocaleDateString();
  });
  const timeSeriesValues = timeSeries.map((row) => row.price);

  // format forecast data (if available)
  const forecastLabels = Array.isArray(forecast?.dates)
    ? forecast.dates.map((d) => new Date(d).toLocaleDateString())
    : [];
  const forecastValues = Array.isArray(forecast?.values) ? forecast.values : [];

  // combine labels
  const labels = [...timeSeriesLabels, ...forecastLabels];

  const allValues = [...timeSeriesValues, ...forecastValues];
  const allLabels = [...timeSeriesLabels, ...forecastLabels];

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: "Price",
        data: allValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
        segment: {
          borderDash: (ctx) => {
            // make forecast portion dashed
            return ctx.p0DataIndex >= timeSeriesValues.length ? [5, 5] : [];
          },
          borderColor: (ctx) => {
            // optionally change color for forecast
            return ctx.p0DataIndex >= timeSeriesValues.length
              ? "rgb(255, 99, 132)"
              : "rgb(75, 192, 192)";
          },
        },
      },
    ],
  };
  if (loading) return <LoadingData />;

  return (
    <div style={{ height: "400px", width: "75%", margin: "0 auto" }}>
      <Line ref={chartRef} options={options} data={data} />
      <NoData />
      <DatabaseError />
    </div>
  );
}

export default TransformerChart;
