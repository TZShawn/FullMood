import React from "react";
import logo from "./logo.png";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC<{current: string}> = ({current}) => {
  let navigate = useNavigate();
  const routeChange = (currentPage: string) => {
    if (current !== currentPage) {
      navigate("/"+currentPage);
    }
  };

  return (
    <div className="w-screen flex border-b-2 border-slate-400 bg-background-brown absolute">
      <img src={logo} className="h-12 pl-8 cursor-pointer" onClick={(e) => routeChange("dashboard")}/>
      <div className="flex-1" />
      <div
        className={`px-6 py-2 text-xl ${(current === "landing") ? "hidden": ""} cursor-pointer disabled font-semibold ${(current === "dashboard") ? "bg-paper-brown": ""} hover:bg-paper-brown`}
        onClick={(e) => routeChange("dashboard")}
      >
        Dashboard
      </div>
      <div
        className={`px-6 py-2 text-xl ${(current === "landing") ? "hidden": ""} cursor-pointer font-semibold ${(current === "entry") ? "bg-paper-brown": ""} hover:bg-paper-brown`}
        onClick={(e) => routeChange("entries")}
      >
        Entry
      </div>
    </div>
  );
};

export default NavBar;
