import { useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react/prop-types
export default function Login({ setAccessToken }) {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateConfig = {
    email: [
      { required: true, message: "Email is required" },
      {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    ],
    password: [
      { required: true, message: "Password is required" },
      {
        minlength: 8,
        message: "Password should be at least 8 characters long",
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      },
    ],
  };

  // evaluate the the form data
  const validate = (fromData) => {
    const errorsData = {};

    Object.entries(fromData).forEach(([key, value]) => {
      validateConfig[key].some((rule) => {
        if (rule.required && !value) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.minlength && value.length < rule.minlength) {
          errorsData[key] = rule.message;
          return true;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errorsData[key] = rule.message;
          return true;
        }
      });
    });

    setErrors(errorsData);
    return errorsData;
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorsData = validate(inputData);

    if (Object.keys(errorsData).length) return;

    await axios
      .post(
        "/user/login",
        {
          email: inputData.email,
          password: inputData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (res) {
        // console.log(res);
        localStorage.setItem("access_token", res.data.data.accessToken);
        localStorage.setItem("refresh_token", res.data.data.refreshToken);
        setAccessToken(res.data.data.accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle Input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
    setErrors({});
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-blue-900">
            NoteTaker
          </h1>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <Input
              id="email"
              label="Email Address"
              type="email"
              placeholder="Please Enter your email address"
              name="email"
              value={inputData.email}
              onchange={handleChange}
              error={errors.email}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Please Enter your password"
              name="password"
              value={inputData.password}
              onchange={handleChange}
              error={errors.password}
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create account here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
