import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userServices";
import AlertMessage from "../AlertMessage";
import { useDispatch } from "react-redux";
import { loginStart } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isError, isPending, error, isSuccess, mutateAsync } = useMutation({
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
      console.log(values);
      mutateAsync(values)
        .then((data) => {
          dispatch(loginStart(data));
          localStorage.setItem("userinfo", JSON.stringify(data));
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/profile");
      }
    }, 2000);
  }, [isError, isPending, error, isSuccess]);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className='max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow-lg space-y-6 border border-gray-200'
    >
      <h2 className='text-3xl font-semibold text-center text-gray-800'>
        Login
      </h2>
      {isError && (
        <AlertMessage type='error' message='Check Your Email and Password' />
      )}
      {isSuccess && (
        <AlertMessage type='success' message='SuccessFully Login' />
      )}
      {isPending && <AlertMessage type='loading' message='Login You in ....' />}
      <p className='text-sm text-center text-gray-500'>
        Login to access your account
      </p>

      {/* Input Field - Email */}
      <div className='relative'>
        <FaEnvelope className='absolute top-3 left-3 text-gray-400' />
        <input
          id='email'
          type='email'
          {...formik.getFieldProps("email")}
          placeholder='Email'
          className='pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        />
        {formik.touched.email && formik.errors.email && (
          <span className='text-xs text-red-500'>{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className='relative'>
        <FaLock className='absolute top-3 left-3 text-gray-400' />
        <input
          id='password'
          type='password'
          {...formik.getFieldProps("password")}
          placeholder='Password'
          className='pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        />
        {formik.touched.password && formik.errors.password && (
          <span className='text-xs text-red-500'>{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        className='w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
