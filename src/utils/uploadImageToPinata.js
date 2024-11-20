import axios from "axios";
const uploadImageToPinata = async (fileData) => {
  try {
    console.log("process.env.NEXT_PUBLIC_PINATA_API_KEY", process.env.NEXT_PUBLIC_PINATA_API_KEY)
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      fileData,
      {
        headers: {
          "Content-Type": `multipart/form-data`,
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY,
        },
      }
    );
    console.log("response.data.IpfsHash", response.data.IpfsHash);

    return response.data.IpfsHash;
  } catch (error) {
    console.error("Error uploading image to Pinata:", error);
    return null;
  }
};

export default uploadImageToPinata;
