"use client";
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../form-input/FormInput'
import { useRegisterUserMutation } from '@/redux/services/blog/blogApi';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setMessage } from '@/redux/features/blog/blogSlice';

const RegistrationForm = () => {
    const router = useRouter()
    const blogStates = useSelector((store)=> store.blog);
    const dispatch = useDispatch()
    const [register,{data,isLoading:isRegistering,isSuccess,isError,error}] = useRegisterUserMutation()
    useEffect(()=>{
        if (isSuccess) {
            dispatch(setMessage({text: data?.message || "Registration Successfull...!!!", isSucceed: true,isDeletedType:false}))
            router.push("/login");
        }else if (isError) {
            dispatch(setMessage({text: error?.data?.message || "Registration Failed...!!!", isSucceed: false,isDeletedType:false}))
        }
    },[isSuccess,isError])
    const submitHandler = async (e)=>{
        e.preventDefault()
        await register(blogStates.user)
        
    }
  return (
    <form
      onSubmit={submitHandler}
      className="w-full flex flex-col gap-3 shadow p-3 rounded"
    >
      <div className="message">
        {blogStates.message.text && !blogStates.message.isDeletedType && (
          <small className={`${blogStates.message.isSucceed ? "text-green-400" : "text-red-400"}`}>
            {blogStates.message.text}
          </small>
        )}
      </div>
      <div className="single-field">
        <FormInput
          type="text"
          placeholder="Username"
          name="username"
          value={blogStates.user.username}
        />
      </div>
      <div className="single-field">
        <FormInput
          type="email"
          placeholder="Email"
          name="email"
          value={blogStates.user.email}
        />
      </div>
      <div className="single-field">
        <FormInput
          type="password"
          placeholder="Password"
          name="password"
          value={blogStates.user.password}
        />
      </div>
      {/* <div className="single-field">
        <FormInput type="password" placeholder="Confirm Password" name="cPassword" />
      </div> */}
      <div className="btn-box text-center">
        <button
          className={`bg-slate-800 text-slate-200 px-5 py-1.5 rounded ${
            isRegistering ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isRegistering}
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}

export default RegistrationForm