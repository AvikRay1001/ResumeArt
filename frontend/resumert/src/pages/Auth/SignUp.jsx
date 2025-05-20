import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import Input from '../../components/Inputs/Input'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'

const SignUp = ({setcurrentPage}) => {
  const [profilePic, setprofilePic] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("")

  const [error, seterror] = useState(null)

  const naviagte = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      seterror("Please enter your full name");
      return;
    }

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
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>Create an account</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setprofilePic}/>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={({target}) => setfullName(target.value)}
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />

          <Input
            value={email}
            onChange={({target}) => setemail(target.value)}
            label="Email Address"
            placeholder="Enter your email address"
            type="text"
          />

          <Input
            value={password}
            onChange={({target}) => setpassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          SIGN UP
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Already a n account{" "}
          <button
            className='font-medium text-primary underline cursor-pointer'
            onClick={() => {
              setcurrentPage("login");
            }}
          >
            Login
          </button>
        </p>

      </form>
    </div>
  )
}

export default SignUp