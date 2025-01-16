import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TrendingUp, TrendingDown } from "lucide-react";
import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
    const {
        data: transactions,
        isError,
        isLoading,
    } = useQuery({
        queryFn: listTransactionsAPI,
        queryKey: ["list-transactions"],
    });

    const totals = transactions?.reduce(
        (acc, transaction) => {
            if (transaction?.type === "income") {
                acc.income += transaction?.amount;
            } else {
                acc.expense += transaction?.amount;
            }
            return acc;
        },
        { income: 0, expense: 0 }
    );

    const data = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                label: "Transactions",
                data: [totals?.income, totals?.expense],
                backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
                borderColor: ["rgb(22, 163, 74)", "rgb(220, 38, 38)"],
                borderWidth: 2,
                hoverBackgroundColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
                hoverBorderColor: ["rgb(21, 128, 61)", "rgb(185, 28, 28)"],
                hoverOffset: 15,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(17, 24, 39, 0.95)",
                titleFont: {
                    family: "Inter, sans-serif",
                    size: 14,
                    weight: "600",
                },
                bodyFont: {
                    family: "Inter, sans-serif",
                    size: 12,
                },
                padding: 12,
                cornerRadius: 8,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    label: function (context) {
                        let value = context.raw;
                        return ` ${context.label}: ${value.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}`;
                    }
                }
            },
        },
        cutout: "75%",
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-96 text-red-500">
                Error loading transaction data
            </div>
        );
    }

    return (
        <div className="mt-16 bg-gradient-to-r from-purple-200 to-blue-100 rounded-2xl shadow-xl p-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Financial Overview
                </h2>
                <p className="text-gray-500 mt-2">Track your income and expenses</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-6 rounded-2xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Total Income</span>
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                        {totals?.income?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-6 rounded-2xl border border-red-200">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendingDown className="w-5 h-5 text-red-600" />
                        <span className="text-red-700 font-medium">Total Expense</span>
                    </div>
                    <div className="text-2xl font-bold text-red-700">
                        {totals?.expense?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </div>
                </div>
            </div>

            <div className="relative h-[400px] flex justify-center items-center">
                <Pie data={data} options={options} />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-4xl font-bold text-gray-800">
                        {(totals?.income - totals?.expense)?.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                    </div>
                    <div className="text-gray-500 mt-2">Net Balance</div>
                </div>
            </div>

            <div className="flex justify-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-600">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-600">Expense</span>
                </div>
            </div>
        </div>
    );
};

export default TransactionChart;
