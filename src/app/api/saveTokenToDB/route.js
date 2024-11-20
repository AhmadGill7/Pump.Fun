// /api/saveTokenToDB/route.js
import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";
import User from "@/Model/Users";
import axios from "axios";

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const email = formData.get("email");
  const userName = formData.get("userName");
  const walletAddress = formData.get("walletAddress");
  const name = formData.get("name");
  const ticker = formData.get("ticker");
  const description = formData.get("description");
  const imgUrl = formData.get("imgUrl");
  const tokenAddress = formData.get("tokenAddress");
  const twitter = formData.get("twitter");
  const telegram = formData.get("telegram");
  const website = formData.get("website");
  const allComments = [];
  const MarketCap = Math.round(Math.random()*11)/10;
  const Volume = Math.round(Math.random()*11)/10;


  try {
    if (!tokenAddress) {
      return new Response(
        JSON.stringify({ success: false, error: "Token Not Created Correctly" })
      );
    }
    const tokenData = {
      email,
      userName,
      walletAddress,
      name,
      ticker,
      description,
      file: imgUrl,
      tokenAddress,
      twitter,
      telegram,
      website,
      allComments,
      Volume,
      MarketCap,
    };

    await Token.create(tokenData);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error Saving Token:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
