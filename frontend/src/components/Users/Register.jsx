import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

// Validations
const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirming your password is required"),
});

const RegistrationForm = () => {
    const navigate = useNavigate();
    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: registerAPI,
        mutationKey: ["register"],
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            username: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data) => {
                    console.log(data);
                })
                .catch((e) => console.log(e));
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => navigate("/login"), 3000);
        }
    }, [isSuccess, navigate]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-lg mx-auto my-20 p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg"
        >
            <h2 className="text-4xl font-bold text-center text-white mb-6">Join Us</h2>
            <p className="text-center text-white mb-4">Create your account</p>

            {isPending && <AlertMessage type="loading" message="Registering your account..." />}
            {isError && (
                <AlertMessage type="error" message={error.response?.data?.message || "Registration failed"} />
            )}
            {isSuccess && (
                <AlertMessage type="success" message="Registration successful!" />
            )}

            <div className="relative mb-6">
                <FaUser className="absolute top-3 left-3 text-white" />
                <input
                    id="username"
                    type="text"
                    {...formik.getFieldProps("username")}
                    placeholder="Enter your username"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
                />
                {formik.touched.username && formik.errors.username && (
                    <span className="text-sm text-red-300">{formik.errors.username}</span>
                )}
            </div>

            <div className="relative mb-6">
                <FaEnvelope className="absolute top-3 left-3 text-white" />
                <input
                    id="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Enter your email"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
                />
                {formik.touched.email && formik.errors.email && (
                    <span className="text-sm text-red-300">{formik.errors.email}</span>
                )}
            </div>

            <div className="relative mb-6">
                <FaLock className="absolute top-3 left-3 text-white" />
                <input
                    id="password"
                    type="password"
                    {...formik.getFieldProps("password")}
                    placeholder="Enter your password"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
                />
                {formik.touched.password && formik.errors.password && (
                    <span className="text-sm text-red-300">{formik.errors.password}</span>
                )}
            </div>

            <div className="relative mb-6">
                <FaLock className="absolute top-3 left-3 text-white" />
                <input
                    id="confirmPassword"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
                    placeholder="Confirm your password"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-white focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-gray-700"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <span className="text-sm text-red-300">{formik.errors.confirmPassword}</span>
                )}
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all"
            >
                Register
            </button>

            <p className="text-center text-white mt-4">
                Already have an account? <a href="/login" className="underline">Log in</a>
            </p>
        </form>
    );
};

export default RegistrationForm;
