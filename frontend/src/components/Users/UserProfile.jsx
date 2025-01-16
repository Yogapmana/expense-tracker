import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaCamera } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
    const [profileImage, setProfileImage] = useState(null);

    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: updateProfileAPI,
        mutationKey: ["change-password"],
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
        },
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log(e));
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8"> {/* Updated padding-top */}
            <div className="max-w-4xl mx-auto">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="relative px-6 pb-6">
                        <div className="relative -mt-16 mb-6 flex justify-center">
                            <div className="relative">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="w-32 h-32 text-gray-300 bg-white rounded-full" />
                                )}
                                <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <FaCamera className="w-5 h-5 text-gray-600" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-center text-gray-800">
                            {formik.values.username || "Welcome"}
                        </h1>
                        <p className="text-center text-gray-500 mt-1">
                            {formik.values.email || "Update your profile details below"}
                        </p>
                    </div>
                </div>

                {/* Alert Messages */}
                <div className="mb-6">
                    {isPending && <AlertMessage type="loading" message="Updating...." />}
                    {isError && (
                        <AlertMessage type="error" message={error.response.data.message} />
                    )}
                    {isSuccess && (
                        <AlertMessage type="success" message="Updated successfully" />
                    )}
                </div>

                {/* Profile Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                        Profile Information
                    </h3>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="space-y-6">
                            {/* Username Field */}
                            <div className="relative">
                                <label
                                    htmlFor="username"
                                    className="text-sm font-medium text-gray-700 mb-1 block"
                                >
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUserCircle className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        {...formik.getFieldProps("username")}
                                        type="text"
                                        id="username"
                                        className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your username"
                                    />
                                </div>
                                {formik.touched.username && formik.errors.username && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {formik.errors.username}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="relative">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium text-gray-700 mb-1 block"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        type="email"
                                        id="email"
                                        className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {formik.errors.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

                {/* Password Update Section */}
                <div className="mt-8">
                    <UpdatePassword />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;