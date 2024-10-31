// /src/app/api/send-otp/route.js
import dbConnect from "@/dbConnect";
import User from "@/Model/Users";
import { sendOtpEmail } from "@/app/api/lib/email";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    await dbConnect();

    // Check if a user with this email already exists
    if (email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        existingUser.otp = otp;
          await existingUser.save();
      await sendOtpEmail(email, otp);

        return new Response(
          JSON.stringify({
            success: true,
            message: "Logged In",
            user: existingUser,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const dataToSave = { email , otp , name: "pump", image: "", bio: "i loved pupm" , walletAddress: ""  , file:null};

      const user = await User.create(dataToSave);
      await sendOtpEmail(email, otp);
      console.log(`${otp}  sent to:`, email);
      
      return new Response(
        JSON.stringify({
          success: true,
          user,
          message: "OTP sent to your email" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }else{
      return new Response(
        JSON.stringify({ success: false, error: "email is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error in send-otp API:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
