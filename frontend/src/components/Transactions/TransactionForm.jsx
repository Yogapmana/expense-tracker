import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    FaWallet,
    FaMoneyBillWave,
    FaRegCommentDots,
    FaCalendarAlt,
    FaCheck,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";

const validationSchema = Yup.object({
    type: Yup.string()
        .required("Transaction type is required")
        .oneOf(["income", "expense"]),
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be positive"),
    category: Yup.string().required("Category is required"),
    date: Yup.date().required("Date is required"),
    description: Yup.string(),
});

const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
};

const TransactionForm = () => {
    const {
        mutateAsync,
        isPending,
        isError: isAddTranErr,
        error: transErr,
        isSuccess,
    } = useMutation({
        mutationFn: addTransactionAPI,
        mutationKey: ["add-transaction"],
    });

    const { data, isError, isLoading, error } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    const formik = useFormik({
        initialValues: {
            type: "",
            amount: "",
            category: "",
            date: "",
            description: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white">New Transaction</h2>
                        <p className="mt-2 text-blue-100">Record your income or expense</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-8">
                        {/* Status Messages */}
                        {isSuccess && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                                <FaCheck className="text-green-500" />
                                <span className="text-green-700 font-medium">Transaction recorded successfully!</span>
                            </div>
                        )}

                        {isError && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                                {error?.response?.data?.message || "An error occurred"}
                            </div>
                        )}

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {/* Transaction Type */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FaWallet className="text-blue-500" />
                                    Transaction Type
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => formik.setFieldValue("type", "income")}
                                        className={`p-4 rounded-xl border-2 transition-all ${formik.values.type === "income"
                                                ? "border-green-500 bg-green-50 text-green-700"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        Income
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formik.setFieldValue("type", "expense")}
                                        className={`p-4 rounded-xl border-2 transition-all ${formik.values.type === "expense"
                                                ? "border-red-500 bg-red-50 text-red-700"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        Expense
                                    </button>
                                </div>
                                {formik.touched.type && formik.errors.type && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FaMoneyBillWave className="text-blue-500" />
                                    Amount
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        {...formik.getFieldProps("amount")}
                                        className="w-full p-4 pl-16 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="0"
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-medium text-gray-500">
                                        Rp
                                    </span>
                                </div>
                                {formik.values.amount && (
                                    <p className="text-blue-600 font-medium">
                                        {formatToRupiah(formik.values.amount)}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FaRegCommentDots className="text-blue-500" />
                                    Category
                                </label>
                                <select
                                    {...formik.getFieldProps("category")}
                                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                >
                                    <option value="">Select a category</option>
                                    {data?.map((category) => (
                                        <option key={category?._id} value={category?.name}>
                                            {category?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FaCalendarAlt className="text-blue-500" />
                                    Date
                                </label>
                                <input
                                    type="date"
                                    {...formik.getFieldProps("date")}
                                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <FaRegCommentDots className="text-blue-500" />
                                    Description (Optional)
                                </label>
                                <textarea
                                    {...formik.getFieldProps("description")}
                                    className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    rows="4"
                                    placeholder="Add notes about your transaction..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full p-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:opacity-90 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50"
                            >
                                {isPending ? "Recording Transaction..." : "Save Transaction"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionForm;
