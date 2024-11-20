"use client";
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { useAccount, useConfig } from "wagmi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { contractAddress, contractABI } from "@/contract/contract";
import uploadImageToPinata from "@/utils/uploadImageToPinata";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2a2a3a",
    color: "white",
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#4a4a5a",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#5a5a6a",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#9cd",
  },
  "& input::placeholder": {
    color: "#fff",
  },
  marginBottom: "20px",
});

const FileUploadBox = styled(Box)({
  border: "2px dashed #fff",
  borderRadius: "8px",
  padding: "40px",
  textAlign: "center",
  backgroundColor: "#2a2a3a",
  cursor: "pointer",
  "&:hover": {
    borderColor: "#4a4a5a",
  },
});

const CreateButton = styled(Button)({
  backgroundColor: "#0D6EFD",
  color: "white",
  padding: "12px",
  width: "100%",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "#0052cc",
  },
});

const ShowCoinForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    description: "",
    file: null,
    twitter: "",
    telegram: "",
    website: "",
  });
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const coinImageRef = useRef(null);
  const config = useConfig();
  const { address } = useAccount();
  const [contractFee, setContractFee] = useState(0);
  const user = useSelector((state) => state.user.user);
  let [imageUpload, setimageUpload] = useState(false);
  const fileInputRef = useRef();
  const [fileSize, setfileSize] = useState(true);




  useEffect(() => {
    async function fetchContractFee() {
      try {
        const result = await readContract(config, {
          abi: contractABI,
          address: contractAddress,
          functionName: "MEMETOKEN_CREATION_PLATFORM_FEE",
          args: [],
          chainId: 97,
          rpcUrl: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
        });
        setContractFee(result);
      } catch (error) {
        console.error("Error reading contract:", error);
      }
    }
    fetchContractFee();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));

    const NewImg = event.target.files[0];
    const fileSizeInMB = NewImg.size / (1024 * 1024);
    if (NewImg) {
      if (fileSizeInMB < 4.3) {
        setfileSize(true)
        const reader = new FileReader();
        reader.onloadend = () => {
          setimageUpload(reader.result);
        };
        reader.readAsDataURL(NewImg); // Read file as data URL
      } else {
        setfileSize(false)
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  const CoinCreation = async (data) => {
    try {
      if (!address) {
        toast.error("Please connect your wallet first.");
        return;
      }
  
      if (!data?.file || !data?.name || !data?.ticker || !data?.description) {
        toast.error("Some required fields are missing.");
        return;
      }
  
      const fileData = new FormData();
      fileData.append("file", data?.file);

      const IpfsHash = await uploadImageToPinata(fileData);
  
      if (!IpfsHash) {
        toast.error("Failed to upload file.");
        return;
      }
      const imgUrl = `https://gateway.pinata.cloud/ipfs/${IpfsHash}`;
  
      const TokenCreationHash = await writeContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: "createMemeToken",
        args: [data?.name, data?.ticker, imgUrl, data?.description],
        value: contractFee.toString(),
        chainId: 97,
      });
  
      

      if (!TokenCreationHash) {
        toast.error("Failed to create coin.");
        return;
      }
  
      await waitForTransactionReceipt(config, { hash: TokenCreationHash });
      toast.success("Token Created successfully!");
      window.location.href= '/'
  
    } catch (error) {
      console.error("Error creating coin or uploading data:", error);
      toast.error("Failed to create coin or upload data.");
    }
  };

  useEffect(() => {
    const startListening = async () => {
      try {
        const response = await axios.post('/api/watchTokenCreateion');
        console.log("Event listener response:", response.data);
        console.log("Event listener started for TokenCreated");
      } catch (error) {
        console.error("Failed to start event listener:", error);
      }
    };
  
    startListening();
  }, []);
  

  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Box
          sx={{
            minHeight: "100vh",
            padding: "40px",
            color: "white",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              minHeight: "100%",
              padding: "40px",
              color: "white",
              width: { lg: "45%", md: "70%", xs: "100%" },
            }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Link href='/'>
                <Button>
                  <Typography variant='h2'>[Go back]</Typography>
                </Button>
              </Link>
            </Box>
            <form onSubmit={handleSubmit(() => CoinCreation(formData))}>
              <Box
                sx={{
                  maxWidth: "100%",
                  margin: "0 auto",
                }}>
                {/* Name Input */}
                <Typography
                  sx={{
                    color: "#60A5FA",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}>
                  Name
                </Typography>
                <StyledTextField
                  fullWidth
                  {...register("name", { required: true })}
                  name='name'
                  variant='outlined'
                  value={formData.name}
                  onChange={handleInputChange}
                />

                {/* Ticker Input */}
                <Typography
                  sx={{
                    color: "#60A5FA",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}>
                  Ticker
                </Typography>
                <StyledTextField
                  fullWidth
                  name='ticker'
                  variant='outlined'
                  {...register("ticker", { required: true })}
                  value={formData.ticker}
                  onChange={handleInputChange}
                />

                {/* Description Input */}
                <Typography
                  sx={{
                    color: "#60A5FA",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}>
                  Description
                </Typography>
                <StyledTextField
                  fullWidth
                  {...register("description", { required: true })}
                  name='description'
                  variant='outlined'
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />

                {/* File Upload */}
                <Typography
                  variant='h5'
                  sx={{
                    color: "#60A5FA",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}>
                  Image or video
                </Typography>
                <input
                  type='file'
                  id='file-upload'
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                  accept='image/*,video/*'
                  ref={coinImageRef}
                />
                <label htmlFor='file-upload'>
                  <FileUploadBox>
                    {
                      imageUpload ? (<Box>
                        <img src={imageUpload} alt='User Image' height={200} style={{ objectFit: 'contain' }} />
                        <Box textAlign="center" mt={2}>
                          <label htmlFor="file-upload" style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            backgroundColor: "black",
                            color: "white",
                            cursor: "pointer",
                            border: "1px solid white",
                          }}>
                            Select another file
                          </label>

                          {/* Hidden file input */}
                          <input
                            type='file'
                            id='file-upload'
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                        </Box>
                      </Box>
                      ) : (
                        <Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              marginBottom: "10px",
                            }}>
                            <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'>
                              <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                              <polyline points='17 8 12 3 7 8' />
                              <line x1='12' y1='3' x2='12' y2='15' />
                            </svg>
                          </Box>

                          <Typography variant='h5' sx={{ color: "white" }}>
                            Drag and drop an image or video
                          </Typography>
                        </Box>
                      )
                    }
                  </FileUploadBox>
                </label>

                {
                  !fileSize ? <Box sx={{ border: '1px solid red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', color: 'red', mt: '30px' }}>File Size IS Greater than 4.3 MB...??</Box> : null
                }

                {/* More Options */}
                <Button
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  sx={{
                    color: "#60A5FA",
                    textTransform: "none",
                    fontSize: "14px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    padding: 0,
                  }}>
                  {showMoreOptions
                    ? "Hide more options ↑"
                    : "Show more options ↓"}
                </Button>

                {showMoreOptions && (
                  <Box>
                    {/* Twitter Input */}
                    <Typography
                      sx={{
                        color: "#60A5FA",
                        marginBottom: "8px",
                        fontSize: "14px",
                      }}>
                      Twitter link
                    </Typography>
                    <StyledTextField
                      fullWidth
                      name='twitter'
                      {...register("twitter", { required: false })}
                      variant='outlined'
                      placeholder='(optional)'
                      value={formData.twitter}
                      onChange={handleInputChange}
                    />

                    {/* Telegram Input */}
                    <Typography
                      sx={{
                        color: "#60A5FA",
                        marginBottom: "8px",
                        fontSize: "14px",
                      }}>
                      Telegram link
                    </Typography>
                    <StyledTextField
                      fullWidth
                      name='telegram'
                      variant='outlined'
                      {...register("telegram", { required: false })}
                      placeholder='(optional)'
                      value={formData.telegram}
                      onChange={handleInputChange}
                    />

                    {/* Website Input */}
                    <Typography
                      sx={{
                        color: "#60A5FA",
                        marginBottom: "8px",
                        fontSize: "14px",
                      }}>
                      Website
                    </Typography>
                    <StyledTextField
                      fullWidth
                      name='website'
                      {...register("website", { required: false })}
                      variant='outlined'
                      placeholder='(optional)'
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </Box>
                )}

                {/* Tip and Submit Button */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}>
                  Tip: coin data cannot be changed after creation
                </Typography>
                <CreateButton type='submit'>Create coin</CreateButton>
                <Typography sx={{ marginTop: "20px", textAlign: "center" }}>
                  When your coin completes its bonding curve you receive 0.5 SOL
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

const CoinForm = () => {
  return (
    <Provider store={PumpStore}>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ShowCoinForm />
    </Provider>
  );
};
export default CoinForm;
