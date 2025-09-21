import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { UserContext } from '../../context/userContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { validateEmail } from '../../utils/helper'

const Login = ({setcurrentPage}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      seterror("Please enter a valid email address");
      return;
    }

    if(!password){
      seterror("Please enter a password");
      return;
    }

    seterror("");

    try {

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const {token} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      if(error.response && error.response.data.message){
        seterror(error.response.data.message);
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  const handleGuestLogin = () => {
    setemail("avikray1010@gmail.com");
    setpassword("test@123");
    seterror("");
  };


  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>

        <Input
          value={email}
          onChange={(e) => setemail(e.target.value)}
          label='Email Address'
          placeholder='Enter your email address'
          type='email'
        />

        <Input
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          label='Password'
          placeholder='Min 8 characters'
          type='password'
        />

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          LOGIN
        </button>

        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-300'></div>
          <span className='px-3 text-sm text-gray-500 bg-white'>OR</span>
          <div className='flex-1 border-t border-gray-300'></div>
        </div>

        <button 
          type='button' 
          onClick={handleGuestLogin}
          className='w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors duration-200 font-medium'
        >
          Try Guest Account
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Don't have an account?{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
              setcurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login