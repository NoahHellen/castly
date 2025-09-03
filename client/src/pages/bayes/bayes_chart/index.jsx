import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

import { useDatabase } from "../../../services/api/db";
import Chart from "../../../utils/chartConfig";
import NoData from "../../../components/NoData";
import DatabaseError from "../../../components/DatabaseError";
import LoadingData from "../../../components/LoadingData";

function BayesChart() {
  const { timeSeries, loading, fetchTimeSeries } = useDatabase();

  useEffect(() => {
    fetchTimeSeries();
  }, []);

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
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = timeSeries.map((row) => {
    const date = new Date(row.date);
    return date.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: timeSeries.map((row) => row.price),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
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

export default BayesChart;
