import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

//! Validations
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters long")
        .required("Password is required"),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: loginAPI,
        mutationKey: ["login"],
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data) => {
                    dispatch(loginAction(data));
                    localStorage.setItem("userInfo", JSON.stringify(data));
                })
                .catch((e) => console.log(e));
        },
    });

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => navigate("/profile"), 3000);
        }
    }, [isSuccess, navigate]);

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="max-w-lg mx-auto my-20 p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg"
        >
            <h2 className="text-4xl font-bold text-center text-white mb-6">Welcome Back</h2>
            <p className="text-center text-white mb-4">Login to continue</p>

            {isPending && <AlertMessage type="loading" message="Logging you in..." />}
            {isError && (
                <AlertMessage type="error" message={error.response?.data?.message || "Login failed"} />
            )}
            {isSuccess && <AlertMessage type="success" message="Login successful!" />}

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

            <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all"
            >
                Login
            </button>

            <p className="text-center text-white mt-4">
                Don’t have an account? <a href="/register" className="underline">Sign up</a>
            </p>
        </form>
    );
};

export default LoginForm;
