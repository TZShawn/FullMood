import React from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC<{}> = ({}) => {
  let navigate = useNavigate();
  const routeChange = (currentPage: string) => {
    let path = `newPath`;
    navigate(path);
  };
  return (
    <div className="w-screen flex border-b-2 border-slate-400 bg-background-brown">
      <img src={logo} className="h-12 pl-8 cursor-pointer" />
      <div className="flex-1" />
      <div
        className="px-6 py-2 text-xl cursor-pointer font-semibold hover:bg-paper-brown"
        onClick={(e) => routeChange("dashboard")}
      >
        Dashboard
      </div>
      <div
        className="px-6 py-2 text-xl cursor-pointer font-semibold hover:bg-paper-brown"
        onClick={(e) => routeChange("entrys")}
      >
        Entrees
      </div>
    </div>
  );
};

export default NavBar;
