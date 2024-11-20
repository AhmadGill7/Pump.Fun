const { default: axios } = require("axios");

const deleteImage = async (fileId) => {
  try {
    const request = await axios.delete(
      `https://api.pinata.cloud/v3/files/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      }
    );
    const response = await request.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export default deleteImage;
