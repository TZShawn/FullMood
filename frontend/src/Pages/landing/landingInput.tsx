import { TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../Redux/profile";
import { useNavigate } from "react-router-dom";
//THIS IS HTE MODLA

interface ILogin {
  isModalOpen: any;
  setIsModalOpen: any;
}

const Login: React.FC<ILogin> = ({ isModalOpen, setIsModalOpen }) => {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  axios.defaults.baseURL = 'http://localhost:4000'
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const handleButtonClick = () => {
    if (isLogin) {
      axios.post('/usercheck', {name: username, password: password}).then((res) => {
        console.log(res.data.status)
        if (res.data.status === 'Success') {
          dispatch(set(username))
          navigate('/dashboard')
        } else {
          setIsModalOpen(false)
        }
      }).catch(err => console.log(err))
    } else {
      const postBody = {
        Name: username,
        Password: password,
      };
      axios.post("/user", postBody);
      setIsLogin(true);
    }
  };

  return (
    <div className="absolute w-full h-screen grid place-items-center top-0 left-0">
      <div
        className="absolute w-full h-screen bg-black opacity-60 top-0 left-0 z-0"
        onClick={(e) => setIsModalOpen(!isModalOpen)}
      />
      <div className="z-10 w-[33vw] h-[58vh] bg-white rounded-lg text-center flex flex-col">
        <div className="text-3xl font-semibold pt-16">
          {isLogin ? "Log in" : "Sign up"}
        </div>
        <div className="px-8 py-8">
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="px-8">
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className="mt-8 mx-32 rounded-[30px] text-2xl font-semibold py-2 px-6 bg-mid-brown justify-center cursor-pointer"
          onClick={(e) => handleButtonClick()}
        >
          {isLogin ? "Log in" : "Sign Up"}
        </div>
        <div
          className="mt-8 text-sm cursor-pointer hover:text-blue-600"
          onClick={(e) => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Make one"
            : "Have an account? Log in"}
        </div>
      </div>
    </div>
  );
};

export default Login;
