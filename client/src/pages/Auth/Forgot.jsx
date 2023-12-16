import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Forgot = () => {
  const navigate = useNavigate();
  return (
    <form className="w-[390px] h-auto mx-auto mt-10 md:mt-20 py-5 rounded-lg shadow-lg bg-white">
      <div className="w-[80%]  mx-auto">
        <AiOutlineMail size={45} className=" mx-auto" />

        <h1 className="text-4xl font-bold text-center my-2 py-3 hover:cursor-pointer text-orange-600">
          Forgot Password
        </h1>
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Email"
          type="email"
          name="email"
          required
        />
        <button className="mt-1 bg-blue-500 w-full text-white p-2 rounded-sm">
          Get Reset Email
        </button>
        <div className="flex justify-between text-gray-500">
          <p
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            - Home
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            - Login
          </p>
        </div>
      </div>
    </form>
  );
};

export default Forgot;
