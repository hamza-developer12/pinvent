import React from "react";
import { MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();
  return (
    <form className="w-[390px] h-auto mx-auto mt-10 md:mt-20 py-5 rounded-lg shadow-lg bg-white">
      <div className="w-[80%]  mx-auto">
        <MdPassword size={45} className=" mx-auto" />

        <h1 className="text-4xl font-bold text-center my-2 py-3 hover:cursor-pointer text-orange-600">
          Reset Password
        </h1>
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="New Password"
          type="password"
          name="password"
          required
        />

        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Confirm New Password"
          type="password"
          name="confirmpassword"
          required
        />
        <button className="mt-1 bg-blue-500 w-full text-white p-2 rounded-sm">
          Reset Password
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

export default Reset;
