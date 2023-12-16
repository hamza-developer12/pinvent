import React from "react";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  return (
    <form className="w-[390px] h-auto mx-auto mt-10 md:mt-20 py-4 rounded-lg shadow-lg bg-white">
      <div className="w-[80%]  mx-auto">
        <BiLogIn size={45} className=" mx-auto" />

        <h1 className="text-4xl font-bold text-center my-2 py-3 hover:cursor-pointer text-orange-600">
          Login
        </h1>
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Email"
          type="email"
          name="email"
          required
        />

        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Password"
          type="password"
          name="password"
          required
        />

        <button className="mt-1 bg-blue-500 w-full text-white p-2 rounded-sm">
          Login
        </button>
        <button
          className="my-1"
          onClick={() => {
            navigate("/forgot");
          }}
        >
          Forgot Password
        </button>
        <div className="mb-4">
          <p className="text-gray-500 text-center ">
            Don't have an account?
            <span
              className="font-semibold text-black hover: cursor-pointer ml-1"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
