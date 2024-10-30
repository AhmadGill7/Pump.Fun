// /src/app/api/verify-otp/route.js
import dbConnect from "@/dbConnect";
import User from "@/Model/Users";

export async function POST(req) {
  const { email, otp } = await req.json();
  console.log(email, otp);

  try {
    await dbConnect();

    // Check if OTP matches for the given email
    const user = await User.findOne({ email : email, otp: otp });
    console.log(user);

    if (!user) {
      return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // OTP is correct, proceed with verification
    user.otp = null; // Clear OTP after verification
    await user.save();

    return new Response(JSON.stringify({ success: true, message: "OTP verified" , user}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in verify-otp API:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
