import React from "react";
import login_image from "../../Assets/login_image.svg";
import "./Landing.css";
import Login from "./landingInput";
import NavBar from "../../NavBar";

const Landing: React.FC<{}> = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  return (
    <div className="overflow-hidden">
      <NavBar current="landing"/>
      <div className="w-full h-[100vh] bg-background-brown flex overflow-hidden	">
        <div className="w-5/12 p-8 grid grid-cols">
          <div className="place-self-center pr-8 p-12 bg-brown-200 rounded-xl">
            <img src={login_image} className="drop-shadow-2xl"></img>
          </div>
        </div>
        <div className="w-7/12 grid">
          <div className="row h-2/12 p-8 flex"></div>
          <div>
            <div className="row h-6/12 p-8 pl-0 pb-0 flex items-center">
              <div className="m-0 font-bold text-8xl items-end">
                <text className="text-green-grey stroke-text">Full</text>
                <em className="text-palette-green stroke-text">mood</em>
              </div>
            </div>
            <div className="text-lg font-semibold text-left leading-normal pt-12 pr-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </div>
            <div className="py-4 px-12 font-bold text-white bg-paper-brown rounded-[30px] w-fit mt-3 hover:bg-mid-brown" onClick={(e) => setIsModalOpen(true)}>
              Login/Sign in
            </div>
          </div>
          <div className="row h-2/12 p-8 flex"></div>
        </div>
      </div>
      {(isModalOpen) ? <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> : ""}
    </div>
  );
};

export default Landing;
