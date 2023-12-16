import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mx-4 mt-2">
      <h1 className="text-3xl">
        Welcome, <span className="text-orange-600">Hamza</span>
      </h1>
      <ul>
        <li>
          <button className="bg-orange-600 px-2 py-1 rounded text-white">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
