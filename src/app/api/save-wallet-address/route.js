// /src/app/api/save-wallet-address/route.js
import dbConnect from "@/dbConnect";
import User from "@/Model/Users";

export async function POST(req) {
  try {
    const { address, email } = await req.json();
    console.log("Address:", address, "Email:", email);

    await dbConnect();

    if (address) {
      const existingUser = await User.findOne({ walletAddress: address });

      if (existingUser) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Logged In",
            user: existingUser,
            walletAddress: address,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    if (!email && address) {
      const user = await User.create({
        walletAddress: address,
        email: null,
        name: null,
        bio: null,
        otp: null,
        image: null,
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Wallet address saved",
          user,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = await User.create({
        walletAddress: address || null,
        email: email || null,
        name: "pump",
        bio: "i loved pump",
        otp: null,
        image: null,
      });

      return new Response(
        JSON.stringify({
          success: true,
          message: "New user created with wallet address",
          user: newUser,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    user.walletAddress = address || null;
    await user.save();
    return new Response(
      JSON.stringify({
        success: true,
        message: "Wallet address added to user",
        user,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in save-wallet-address API:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
