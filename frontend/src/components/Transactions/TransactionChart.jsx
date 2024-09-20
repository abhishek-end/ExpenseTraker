import React from "react";
import {
  Chart as chartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";

import { ListTransactionAPI } from "../../services/transaction/transactionServices";
chartJS.register(ArcElement, Tooltip, Legend);
const TransactionChart = () => {
  const {
    data: transaction,
    isError,
    isFetched,
    isSuccess,
    error,
    refetch,
  } = useQuery({
    queryKey: ["listsTransaction"],
    queryFn: ListTransactionAPI,
  });

  const totals = transaction?.reduce(
    (acc, transactions) => {
      if (transactions?.type === "income") {
        acc.income += transactions?.amount || 0;
      } else {
        acc.expanse += transactions?.amount || 0;
      }
      return acc;
    },
    { income: 0, expanse: 0 }
  );
  console.log(totals);
  const data = {
    labels: ["Income", "Expanse"],
    datasets: [
      {
        label: "Transaction",
        data: [totals?.income, totals?.expanse],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 20,
      },
    ],
    hoverOffset: 4,
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expenses",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: 110,
  };

  return (
    <div className='my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200 '>
      <h1 className='text-2xl font-bold text-center mb-6'>
        Transaction Overview
      </h1>
      <div style={{ height: "350px", width: "350px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
