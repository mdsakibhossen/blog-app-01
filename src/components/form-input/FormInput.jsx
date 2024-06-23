"use client";

import { changeInputValue } from "@/redux/features/blog/blogSlice";
import { useDispatch } from "react-redux";

const FormInput = ({ type, placeholder, name, value }) => {
  const dispatch = useDispatch();

  return (
    <input
      onChange={(e) =>
        dispatch(
          changeInputValue({ property: e.target.name, value: e.target.value })
        )
      }
      value={value}
      type={type}
      name={name}
      className="w-full px-2 py-1.5 bg-transparent rounded outline-none border border-green-400 focus:border-blue-400"
      placeholder={placeholder}
    />
  );
};

export default FormInput;
