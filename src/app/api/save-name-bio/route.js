// /src/app/api/update-profile/route.js

import dbConnect from "@/dbConnect";
import User from "@/Model/Users";

export async function POST(req) {
  try {
    const { _id, name, bio} = await req.json();
    console.log( _id, name, bio);
    await dbConnect();

    // Find user by email and update
    const user = await User.findOneAndUpdate(
      { _id }, 
      { name, bio },
      { new: true } // Returns the updated document
    );
    console.log(user,'backend')

    console.log("User updated:", user);
    

    if (user) {
      return new Response(
        JSON.stringify({ success: true, message: "Profile updated", user }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error in update-profile API:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
