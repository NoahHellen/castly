import React, { useEffect } from "react";
import { useDatabase } from "../../services/api/db";
import { Line } from "react-chartjs-2";
import Chart from "../../utils/chartConfig";

function Bayes() {
  const { timeSeries = [], loading, error, fetchTimeSeries } = useDatabase();

  // Fetch data once when component mounts
  useEffect(() => {
    fetchTimeSeries();
  }, []);

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Bayesian Forecast",
      },
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x", // only pan in x-axis
        },
        zoom: {
          wheel: {
            enabled: true, // enable wheel zooming
          },
          pinch: {
            enabled: true, // for touch devices
          },
          mode: "x", // zoom in x-axis only
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    maintainAspectRatio: false,
  };

  // Use timeSeries data
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
        tension: 0.4, // smooth line
      },
    ],
  };

  // Render loading, error, or chart
  if (loading) return <div>Loading chart data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (timeSeries.length === 0) return <div>No data available</div>;

  return (
    <div style={{ height: "400px", width: "75%", margin: "0 auto" }}>
      <Line options={options} data={data} />

      {/* Display message if no data */}
      {timeSeries.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No data found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first data point
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bayes;
