"use client";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../form-input/FormInput";
// import { signIn } from "@/lib/auth"; // it's for server-side code
import { signIn } from "next-auth/react"; // it's for client-side code
import { setMessage } from "@/redux/features/blog/blogSlice";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const blogStates = useSelector((store)=> store.blog);
  const dispatch = useDispatch()
  const router = useRouter();

  const submitHandler = async (e)=>{
    e.preventDefault();
     try {
       const result = await signIn("credentials", {
         redirect: false,
         email: blogStates.user.email,
         password: blogStates.user.password,
       });
        // console.log("result:", result);

       if (result.ok) {
         dispatch(setMessage({ text: "Login Successfull...", isSucceed: true, isDeletedType: false }));
         router.push("/dashboard");

       } else {
        //  console.log("Sign-in failed:", result.error);
         dispatch(
           setMessage({
             text: result.error || "Login Failed...",
             isSucceed: false,
             isDeletedType: false,
           })
         );
       }
     } catch (error) {
      //  console.log("Error:", error.message);
       dispatch(setMessage({ text: error.message || "Login Failed...", isSucceed: false,isDeletedType: false, }));
     }
  }
  return (
    <form onSubmit={submitHandler} className="w-full flex flex-col gap-3 shadow p-3 rounded">
      <div className="message">
        {blogStates.message.text && !blogStates.message.isDeletedType && (
          <small className={`${blogStates.message.isSucceed ? "text-green-400" : "text-red-400"}`}>
            {blogStates.message.text}
          </small>
        )}
      </div>
      <div className="single-field">
        <FormInput type="email" placeholder="Email" name="email" />
      </div>
      <div className="single-field">
        <FormInput type="password" placeholder="Password" name="password" />
      </div>
    
      <div className="btn-box text-center">
        <button className="bg-slate-800 text-slate-200 px-5 py-1.5 rounded">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
