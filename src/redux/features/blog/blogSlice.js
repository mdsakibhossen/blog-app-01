import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:{
        username:"",
        email:"",
        password:""
    },
    message: {
        text: "",
        isSucceed: true,
        isDeletedType: false
    }
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
       changeInputValue: (state,action)=>{
        // console.log("action:",action);
        const {property,value} =  action.payload
        state.user[property] = value; 
       },
       setMessage: (state,action)=>{
        state.message = {...state.message,...action.payload}
       }
    },
})

// Action creators are generated for each case reducer function
export const {changeInputValue,setMessage } = blogSlice.actions

export const blogReducer  =  blogSlice.reducer