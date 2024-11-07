import { useState } from "react";
import Input from "./Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateConfig = {
    fullName: [{ required: true, message: "Full Name is required" }],
    username: [
      { required: true, message: "username is required" },
      {
        pattern: /^[A-Za-z]+$/,
        message: "Username must not contain any numeric characters and symbols",
      },
    ],
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
    confirmPassword: [
      { required: true, message: "Confirm Password is required" },
      {
        minlength: 8,
        message: "Password should be at least 8 characters long",
      },
      {
        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/,
        message:
          "Password must contain at least one uppercase letter, one number, and one special character",
      },
      {
        matchPassword: true, // Custom rule to match passwords
        message: "Password and Confirm Password do not match",
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

    // Custom validation to check if password and confirmPassword match
    if (fromData.password && fromData.confirmPassword) {
      if (fromData.password !== fromData.confirmPassword) {
        errorsData.confirmPassword = validateConfig.confirmPassword.find(
          (rule) => rule.matchPassword
        ).message;
      }
    }

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
        "/user/register",
        {
          fullName: inputData.fullName,
          username: inputData.username,
          email: inputData.email,
          password: inputData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle Input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username" || name === "email") {
      setInputData((prevState) => ({
        ...prevState,
        [name]: value.toLowerCase(),
      }));
    } else {
      setInputData((prevState) => ({ ...prevState, [name]: value }));
    }
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
            Create your account
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
              id="fullName"
              label="Full Name"
              type="text"
              placeholder="Please Enter your Full Name "
              name="fullName"
              value={inputData.fullName}
              onchange={handleChange}
              error={errors.fullName}
            />
            <Input
              id="username"
              label="Username"
              type="text"
              placeholder="Please Enter your username"
              name="username"
              value={inputData.username}
              onchange={handleChange}
              error={errors.username}
            />
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
              flag="register"
            />
            <Input
              id="confirmPassword"
              label=" Confirm Password"
              type="password"
              placeholder="Please Enter your Confirm Password"
              name="confirmPassword"
              value={inputData.confirmPassword}
              onchange={handleChange}
              error={errors.confirmPassword}
              flag="register"
            />

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already Registered?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
