import React from "react"
import login_image from "../../Assets/login_image.svg"
import "./Landing.css";

const Landing: React.FC<{}> = () => {
    return (
      <div className="w-full h-screen bg-brown flex">
        <div className="column w-5/12 p-8 grid grid-cols-1">
          <div className="place-self-center pr-8 p-12 bg-brown-200 rounded-xl">
            <img src={login_image} className="drop-shadow-2xl"></img>
          </div>
        </div>
        <div className="column w-7/12 py-8 grid grid-cols-1">
          <div className="row h-4/12 p-8 pl-0 flex items-center">
            <span className="m-0 font-bold text-8xl">
                <text className="text-green-grey stroke-text">Full</text><em className="text-palette-green stroke-text">mood</em>
                </span>
          </div>
          <div className="row h-4/12 p-8 pr-12">
            <div className="text-lg font-semibold text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                 Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</div>
            </div>
          <div className="row h-4/12 p-8"></div>
        </div>
      </div>
    );
}

export default Landing