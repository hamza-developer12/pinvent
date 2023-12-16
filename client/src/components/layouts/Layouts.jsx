import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Sidebar from "../Sidebar";
const Layouts = ({ children }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="">
          <Sidebar />
        </div>
        <div className="w-[85%]">
          <Header />
          <div style={{ minHeight: "80vh" }}>{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layouts;
