import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={`bg-white absolute top-0 left-0  h-screen ${
        isOpen ? "w-[16%]" : "w-[5%]"
      } duration-300`}
    >
      <div className="bg-[#030b6b] w-full h-[10%]  flex justify-between items-center">
        <RiProductHuntLine
          onClick={() => navigate("/")}
          size={35}
          className={`text-white hover:cursor-pointer  md:ml-1 ml-4 ${
            isOpen ? "flex" : "hidden"
          } `}
        />
        <BiMenuAltRight
          size={35}
          className={`text-white hover:cursor-pointer mr-1 ${
            isOpen ? "" : "ml-3"
          } md:flex hidden`}
          onClick={toggle}
        />
      </div>
      <NavLink
        to="/dashboard"
        className="flex items-center justify-center gap-5 w-full border-b-[1px] border-black 
       h-[8%]"
      >
        <BsFillGrid3X3GapFill size={30} className="text-[#0a0c23]" />
        <h2
          className={`text-xl font-semibold text-[#0a0c23]  ${
            isOpen ? "md:flex hidden" : "hidden"
          } `}
        >
          Dashboard
        </h2>
      </NavLink>
      <NavLink
        to="/dashboard"
        className="flex items-center justify-center gap-3 w-full border-b-[1px] border-black 
       h-[8%]"
      >
        <MdOutlineAddPhotoAlternate size={30} className="text-[#0a0c23]" />
        <h2
          className={` text-xl font-semibold text-[#0a0c23] ${
            isOpen ? "md:flex hidden" : "hidden"
          }  `}
        >
          Add Product
        </h2>
      </NavLink>
    </div>
  );
};

export default Sidebar;
