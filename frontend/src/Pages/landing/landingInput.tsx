import { TextField } from "@mui/material";
import React from "react";
//THIS IS HTE MODLA

const Login = () => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("")
  const [passwowrd, setPassword] = React.useState("")

  return (
    <div className="absolute w-full h-screen grid place-items-center top-0 left-0">
      <div className="absolute w-full h-screen bg-black opacity-60 top-0 left-0 z-0" />
      <div className="z-10 w-[33vw] h-[58vh] bg-white rounded-lg text-center flex flex-col">
        <div className="text-3xl font-semibold pt-16">{(isLogin) ? "Log in" : "Sign up"}</div>
        <div className="px-16 py-8">
          <TextField id="outlined-basic" label="Username" variant="outlined" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="px-16">
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="mt-8 mx-32 rounded-[30px] text-2xl font-semibold py-2 px-6 bg-mid-brown justify-center cursor-pointer">
          {isLogin ? "Log in" : "Sign Up"}
        </div>
        <div className="mt-8 text-sm cursor-pointer hover:text-blue-600" onClick={(e) => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Make one"
            : "Have an account? Log in"}
        </div>
      </div>
    </div>
  );
};

export default Login;
