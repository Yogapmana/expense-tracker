import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal/Modal";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { BiCategory, BiTransfer } from "react-icons/bi";
import { BsCalendar4 } from "react-icons/bs";

const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);

const TransactionList = () => {
    const [filters, setFilters] = useState({
        startDate: "",
        endDate: "",
        type: "",
        category: "",
    });

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    const { data: categoriesData, isLoading: categoryLoading } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    const { data: transactions, isLoading } = useQuery({
        queryFn: () => listTransactionsAPI(filters),
        queryKey: ["list-transactions", filters],
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-200 to-white py-8">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        Transaction History
                    </h1>
                    <p className="text-gray-600 mt-2">Track and manage your transactions</p>
                </div>

                {/* Filter Section */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 rounded-2xl shadow-lg mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <BsCalendar4 className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                name="startDate"
                                value={filters.startDate}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                placeholder="Start Date"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <BsCalendar4 className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="date"
                                name="endDate"
                                value={filters.endDate}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                placeholder="End Date"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <BiTransfer className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                name="type"
                                value={filters.type}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none bg-white"
                            >
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <BiCategory className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 appearance-none bg-white"
                            >
                                <option value="">All Categories</option>
                                {categoriesData?.map((category) => (
                                    <option key={category._id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Transaction List */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="bg-black p-8 rounded-2xl shadow-lg">
                            <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                            </div>
                        </div>
                    ) : transactions?.length ? (
                        transactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className="bg-gradient-to-l from-purple-100 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-3 rounded-xl ${transaction.type === "income"
                                            ? "bg-green-100"
                                            : "bg-red-100"
                                            }`}>
                                            <BiTransfer className={`h-6 w-6 ${transaction.type === "income"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-gray-900">
                                                    {transaction.category?.name}
                                                </p>
                                                <span className={`text-sm px-2 py-1 rounded-lg ${transaction.type === "income"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                    }`}>
                                                    {transaction.type}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 text-sm">
                                                {new Date(transaction.date).toLocaleDateString("id-ID")}
                                            </p>
                                            <p className="text-gray-600 text-sm mt-1">
                                                {transaction.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3">
                                        <p className={`font-bold ${transaction.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}>
                                            {formatRupiah(transaction.amount)}
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdateTransaction(transaction)}
                                                className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                                            >
                                                <FaEdit className="text-purple-600 w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => alert("Delete functionality coming soon!")}
                                                className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                            >
                                                <FaTrash className="text-red-500 w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                            <p className="text-gray-500">No transactions found.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for Editing */}
            {isModalOpen && (
                <Modal onClose={handleModalClose}>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Edit Transaction
                        </h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                defaultValue={selectedTransaction?.description}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                                placeholder="Description"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity duration-200"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default TransactionList;