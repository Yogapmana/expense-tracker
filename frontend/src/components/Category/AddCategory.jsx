import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet, FaPlus } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    type: Yup.string()
        .required("Category type is required")
        .oneOf(["income", "expense"]),
});

const AddCategory = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: addCategoryAPI,
        mutationKey: ["add-category"],
    });

    const formik = useFormik({
        initialValues: {
            type: "",
            name: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then(() => {
                    navigate("/categories");
                })
                .catch((e) => console.log(e));
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                            <SiDatabricks className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">New Category</h2>
                        <p className="mt-2 text-indigo-100">Create a custom category for your transactions</p>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 space-y-6">
                        {/* Alert Messages */}
                        {isError && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
                                {error?.response?.data?.message || "Something went wrong. Please try again."}
                            </div>
                        )}
                        {isSuccess && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-green-700 flex items-center gap-2">
                                <FaPlus className="text-green-500" />
                                Category added successfully. Redirecting...
                            </div>
                        )}

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            {/* Transaction Type */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
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
                                        <FaWallet className="w-6 h-6 mx-auto mb-2" />
                                        Income
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formik.setFieldValue("type", "expense")}
                                        className={`p-4 rounded-xl border-2 transition-all ${formik.values.type === "expense"
                                                ? "border-purple-500 bg-purple-50 text-purple-700"
                                                : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <FaWallet className="w-6 h-6 mx-auto mb-2" />
                                        Expense
                                    </button>
                                </div>
                                {formik.touched.type && formik.errors.type && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.type}</p>
                                )}
                            </div>

                            {/* Category Name */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Category Name
                                </label>
                                <div className="relative rounded-xl shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <SiDatabricks className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        {...formik.getFieldProps("name")}
                                        className="block w-full pl-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="e.g., Food, Transportation"
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 text-lg font-medium"
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Creating...
                                    </span>
                                ) : (
                                    "Create Category"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;