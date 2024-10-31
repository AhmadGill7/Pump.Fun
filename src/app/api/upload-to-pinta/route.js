import dbConnect from "@/dbConnect";
import User from "@/Model/Users";
import axios from "axios";

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const file = formData.get("file");
  const email = formData.get("email");

  // Convert the file to binary for Pinata
  const data = new FormData();
  data.append("file", file);

  try {
    // Upload file to Pinata
    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: "2f4751f2d2632f6cf4f7",
        pinata_secret_api_key: "60f785d39ffa64ad2d30c2b27649bfac8c7b7a28fdef26de3cab0d7dffd2492b",
      },
    });

    // Get IPFS URL of the uploaded file
    const fileUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

    const user = await User.findOne({ email });

    // Check if the file field is an array, if not convert it
    if (!Array.isArray(user.file)) {
      user.file = [user.file]; // Convert to array if it was a string
    }


    // Find user by email and update their profile image
    await User.findOneAndUpdate(
      { email },
      { $push: { file: fileUrl } },
      { new: true }
    );

    // Respond with the IPFS image URL
    return new Response(
      JSON.stringify({ success: true, file }),
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
