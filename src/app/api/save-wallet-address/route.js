// /src/app/api/save-wallet-address/route.js
import dbConnect from "@/dbConnect";
import User from "@/Model/Users";
const { v4: uuid } = require('uuid');

export async function POST(req) {
  try {
    const { address, email } = await req.json();
    console.log("Address:", address, "Email:", email);

    await dbConnect();

    // Step 1: Check if the wallet address already exists for a user (for login)
    if (address) {
      const existingUserByAddress = await User.findOne({ walletAddress: address });
      console.log("existingUserByAddress:", existingUserByAddress);
      if (existingUserByAddress) {
        return new Response(
          JSON.stringify({
            success: true,
            message: "Logged In",
            user: existingUserByAddress,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Step 2: If no wallet address is found, check for an email to update or create a new user
    if (email) {
      const existingUserByEmail = await User.findOne({ email });

      if (existingUserByEmail) {
        // Update the wallet address for an existing email-based user
        existingUserByEmail.walletAddress = address;
        await existingUserByEmail.save();

        return new Response(
          JSON.stringify({
            success: true,
            message: "Wallet address added to existing user by email",
            user: existingUserByEmail,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    const idd = uuid();

    // Step 3: Create a new user if wallet address or email doesn't exist
    const newUser = await User.create({
      userId: idd, 
      walletAddress: address || null,
      email: email || null,
      name: "pump",
      bio: "I loved pump",
      otp: null,
      image: null,
      tokens: [],
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "New user created",
        user: newUser,
      }),
      {
        status: 201,
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
