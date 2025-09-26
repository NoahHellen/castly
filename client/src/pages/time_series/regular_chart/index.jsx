import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

import { useDatabase } from "../../../services/api/db";
import Chart from "../../../utils/chartConfig";
import NoData from "../../../components/NoData";
import { formatDate } from "../../../utils/formatDate";
import DatabaseError from "../../../components/DatabaseError";
import LoadingData from "../../../components/LoadingData";

import ModalUpdate from "./ModalUpdate";

function RegularChart() {
  const { timeSeries, loading, error, fetchTimeSeries, setFormData } =
    useDatabase();

  useEffect(() => {
    fetchTimeSeries();
  }, []);

  const chartRef = useRef(null);
  const modalRef = useRef(null);

  const handleChartClick = async (event) => {
    if (!chartRef.current) return;

    const chart = chartRef.current;

    const chartPoint = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );

    const dataPoint = timeSeries[chartPoint[0].index];

    setFormData({
      date: formatDate(dataPoint.date),
      price: dataPoint.price,
      id: dataPoint.id,
    });

    modalRef.current.showModal();
  };

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
  if (timeSeries.length == 0) return <NoData />;

  return (
    <div style={{ height: "400px", width: "75%", margin: "0 auto" }}>
      <Line
        onClick={handleChartClick}
        ref={chartRef}
        options={options}
        data={data}
      />
      <ModalUpdate ref={modalRef} />
      <DatabaseError />
    </div>
  );
}

export default RegularChart;
