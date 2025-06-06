import React, { useState } from "react";
import Input from "./components/Input";
import { toast } from "react-toastify";

import FormFooter from "./components/FormFooter";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loginpayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...loginpayload };
    data[name] = value;
    setLoginPayload(data);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const res = await login(loginpayload);

    if (res) {
      navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className='bg-white rounded-lg py-5'>
      <div className='container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5'>
        <div className='flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable'>
          <div className='flex items-center justify-center w-full lg:p-12'>
            <div className='flex items-center xl:p-10'>
              <form className='flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl'>
                <h3 className='mb-3 text-4xl font-extrabold text-dark-gray-900'>
                  Sign In
                </h3>
                <p className='mb-4 text-gray-700'>
                  Enter your email and password
                </p>

                <Input
                  id='email'
                  type='email'
                  name={"email"}
                  label='Email*'
                  placeholder='mail@loopple.com'
                  onChange={handleChange}
                  value={loginpayload.email}
                />
                <Input
                  id='password'
                  type='password'
                  label='Password*'
                  placeholder='Enter a password'
                  onChange={handleChange}
                  value={loginpayload.password}
                  name={"password"}
                />

                <FormFooter />

                <button
                  type='submit'
                  onClick={handleLoginSubmit}
                  className='w-full cursor-pointer  px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-primary-600 focus:ring-4 focus:ring-primary-100 bg-primary-500'
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
