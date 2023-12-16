import React from "react";
import { TiUserAddOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  return (
    <form className="w-[390px] h-auto mx-auto mt-8 md:mt-15 py-4 rounded-lg shadow-lg bg-white">
      <div className="w-[80%]  mx-auto">
        <TiUserAddOutline size={45} className=" mx-auto" />

        <h1 className="text-4xl font-bold text-center my-2 py-3 hover:cursor-pointer text-orange-600">
          Register
        </h1>
        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Enter Name"
          type="text"
          name="name"
          required
        />
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

        <input
          className="my-4 border-b-[2px] w-full border-gray-300 outline-transparent focus:outline-none"
          placeholder="Confirm Password"
          type="password"
          name="confirmpassword"
          required
        />

        <button className="mt-1 bg-blue-500 w-full text-white p-2 rounded-sm">
          Register
        </button>
        <div className="mb-4">
          <p className="text-gray-500 text-center ">
            Already have an account
            <span
              className="font-semibold text-black hover: cursor-pointer ml-1"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Register;
