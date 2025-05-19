import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'

const Login = ({setcurrentPage}) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

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
      
    } catch (error) {
      
    }
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