import React from "react";
import { Link } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import heroImage from "../assets/inv-img.png";
const Home = () => {
  return (
    <div className="bg-[#030b6b] h-screen">
      <div className="w-[1200px] mx-auto ">
        <nav className="flex justify-between items-center pt-[1.5rem] w-[1120px]">
          <div className="text-white ">
            <RiProductHuntLine size={35} />
          </div>
          <ul className="text-white flex gap-4">
            <li className=" px-2.5 py-1 ">
              <Link to="/register">Register</Link>
            </li>
            <li className="bg-[#007bff] px-3 py-1 rounded-sm">
              <button className="">
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li className="bg-[#007bff] px-2.5 py-1 rounded-sm">
              <button className="">
                <Link to="/dashboard">Dashboard</Link>
              </button>
            </li>
          </ul>
        </nav>
        {/* Hero SECTION..... */}
        <section className=" grid grid-cols-4 justify-center items-center text-white">
          <div className="col-span-2">
            <div className="">
              <h2 className="text-5xl">
                Inventory & <br />
                Stock Management <br />
                Solution
              </h2>
              <p className="my-3">
                Inventory system to manage and control products in the <br />
                warehouse in real time and integrated to make it easier to
                <br />
                develop your business
              </p>
              <div className="my-2">
                <button className="border-2 border-white p-2 rounded-sm">
                  <Link to="/dashboard">Free Trial 1 Month</Link>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <NumberText num="14K" text="Brand Owners" />
                <NumberText num="23K" text="Active Users" />
                <NumberText num="500+" text="Partners" />
              </div>
            </div>
          </div>
          <div className="col-span-2 w-[100%]">
            <img src={heroImage} alt="Inventory" />
          </div>
        </section>
      </div>
    </div>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-3xl">{num}</h3>
      <p className="">{text}</p>
    </div>
  );
};
export default Home;
