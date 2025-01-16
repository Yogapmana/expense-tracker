import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    deleteCategoryAPI,
    listCategoriesAPI,
} from "../../services/category/categoryService";

const CategoriesList = () => {
    const { data, isError, isLoading, error, refetch } = useQuery({
        queryFn: listCategoriesAPI,
        queryKey: ["list-categories"],
    });

    const navigate = useNavigate();
    const { mutateAsync } = useMutation({
        mutationFn: deleteCategoryAPI,
        mutationKey: ["delete-category"],
    });

    const handleDelete = (id) => {
        mutateAsync(id)
            .then(() => refetch())
            .catch((e) => console.log(e));
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto my-12 p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-4xl font-extrabold text-white">Categories</h2>
                    <Link
                        to="/add-category"
                        className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                    >
                        + Add New
                    </Link>
                </div>

                {isError && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 rounded-md">
                        <p className="text-red-700">{error?.response?.data?.message || "An error occurred."}</p>
                    </div>
                )}

                <div className="space-y-6">
                    {data?.map((category) => (
                        <div
                            key={category?._id}
                            className="group flex justify-between items-center p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 hover:border-purple-300"
                        >
                            <div className="flex items-center space-x-5">
                                <div
                                    className={`w-3 h-14 rounded-lg ${category.type === "income" ? "bg-green-400" : "bg-red-400"
                                        }`}
                                ></div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-gray-900">
                                        {category?.name}
                                    </span>
                                    <span
                                        className={`text-sm font-medium ${category.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        {category?.type?.charAt(0).toUpperCase() +
                                            category?.type?.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Link
                                    to={`/update-category/${category._id}`}
                                    className="p-2 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors"
                                >
                                    <FaEdit className="w-5 h-5 text-purple-600" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(category?._id)}
                                    className="p-2 bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                                >
                                    <FaTrash className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {data?.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-white text-lg">No categories found.</p>
                        <Link
                            to="/add-category"
                            className="mt-5 inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg"
                        >
                            Create Your First Category
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesList;
