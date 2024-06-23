"use client";
import { setMessage } from "@/redux/features/blog/blogSlice";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
//   const router = useRouter();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await signOut();
      dispatch(
        setMessage({
          text: "Logout Successfully...",
          isSucceed: true,
          isDeletedType: false,
        })
      );
    //   router.push("/login");
    } catch (error) {
      dispatch(
        setMessage({
          text: error.message || "Logout Failed...",
          isSucceed: false,
          isDeletedType: false,
        })
      );
    }
  };
  return (
    <button
      onClick={logoutHandler}
      className="bg-red-600 px-5 py-1.5 rounded text-white"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
