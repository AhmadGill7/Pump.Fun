import dbConnect from "@/dbConnect";
import User from "@/Model/Users";
import axios from "axios";

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const file = formData.get("file");
  const email = formData.get("email");
  const walletAddress = formData.get("walletAddress");

  // Convert the file to binary for Pinata
  const data = new FormData();
  data.append("file", file);

  try {
    // Upload file to Pinata
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
      },
    });

    // Get IPFS URL of the uploaded file
    const image = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    // Find user by email and update their profile image
    await User.findOneAndUpdate(
      { $or: [{ email }, { walletAddress }] }, 
      { image: image },
      { new: true }
    );

    // Respond with the IPFS image URL
    return new Response(
      JSON.stringify({ success: true, image }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
