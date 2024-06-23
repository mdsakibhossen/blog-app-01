import { connectToDb } from "@/lib/connectToDb";
import { User } from "@/models/user";
import bycript from "bcryptjs"
import { NextResponse } from "next/server";


// POST request to create a new user
export const POST = async (request) => {
    const user = await request.json();
    const { email, username, password } = user;

    if (!email || !username) {
        return NextResponse.json({ message: "Missing required fields", ok:false }, { status: 400 });
    }

    try {
        connectToDb();
        let user = await User.findOne({ username });
        if (user) {
            return NextResponse.json({ message: "This Username is Already Taken...", ok: false }, { status: 409 });
        }

        user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "This Email is Already Taken...", ok: false }, { status: 409 });

        }

        // Hashing Password Using bycriptjs
        const salt = await bycript.genSalt(10);
        const hashPass = await bycript.hash(password, salt);

        const newUser = new User({username,email,password:hashPass})
        await newUser.save();

        return NextResponse.json({ user: newUser, message: "Registration Successfull...", ok:true }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Registration Failed...", error: error.message, ok:false }, { status: 500 });
    }

}



// Status Codes:
// 201 Created: When a user is successfully created.
// 200 OK: When an update to the user is successful.
// 400 Bad Request: If the request data is invalid(e.g., missing required fields).
// 401 Unauthorized: If the request is unauthorized(e.g., missing authentication).
// 403 Forbidden: If the client does not have permission to perform the action.
// 404 Not Found: If the resource(e.g., user) does not exist.
// 409 Conflict: If there is a conflict, such as trying to create a user that already exists.
// 500 Internal Server Error: If there is a server - side error during the operation.

// Note: All 2xx status are treated as successfull response. which return in data in case of rtk query. other status code are treated as unsuccessfull response. which return in error in case of rtk query. 