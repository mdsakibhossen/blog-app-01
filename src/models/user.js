import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please Enter Your Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const User = mongoose.models?.User || mongoose.model("User",userSchema);