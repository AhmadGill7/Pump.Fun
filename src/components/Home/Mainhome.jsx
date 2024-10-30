import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { writeContract, readContract } from "@wagmi/core";
import { useConfig } from 'wagmi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// Styled components
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#2a2a3a',
    color: 'white',
    '& fieldset': {
      borderColor: '#fff',
    },
    '&:hover fieldset': {
      borderColor: '#4a4a5a',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5a5a6a',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#9cd',
  },
  '& input::placeholder': {
    color: '#fff',
  },
  marginBottom: '20px',
});

const FileUploadBox = styled(Box)({
  border: '2px dashed #fff',
  borderRadius: '8px',
  padding: '40px',
  textAlign: 'center',
  backgroundColor: '#2a2a3a',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#4a4a5a',
  },
});

const CreateButton = styled(Button)({
  backgroundColor: '#0D6EFD',
  color: 'white',
  padding: '12px',
  width: '100%',
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#0052cc',
  },
});
const CoinForm = ({ onClose }) => {


  const [formData, setFormData] = useState({ name: '', ticker: '', description: '', file: null, twitter: '', telegram: '', website: '' });
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const coinImageRef = useRef(null);
  const config = useConfig();
  const [contractFee, setContractFee] = useState(0);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();


  const contractAddress = '0x24e807eefA6cEb94F2d1d78a80705d3199BFf6F7';
  const abi = [
    {
      inputs: [],
      name: "INITIAL_PRICE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "K",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "MEMETOKEN_CREATION_PLATFORM_FEE",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "addressToMemeTokenMapping",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "string", name: "description", type: "string" },
        { internalType: "string", name: "tokenImageUrl", type: "string" },
        { internalType: "uint256", name: "fundingRaised", type: "uint256" },
        { internalType: "address", name: "tokenAddress", type: "address" },
        { internalType: "address", name: "creatorAddress", type: "address" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "memeTokenAddress", type: "address" },
        { internalType: "uint256", name: "tokenQty", type: "uint256" },
      ],
      name: "buyMemeToken",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "currentSupply", type: "uint256" },
        { internalType: "uint256", name: "tokensToBuy", type: "uint256" },
      ],
      name: "calculateCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "string", name: "imageUrl", type: "string" },
        { internalType: "string", name: "description", type: "string" },
      ],
      name: "createMemeToken",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getAllMemeTokens",
      outputs: [
        {
          components: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "string", name: "symbol", type: "string" },
            { internalType: "string", name: "description", type: "string" },
            { internalType: "string", name: "tokenImageUrl", type: "string" },
            { internalType: "uint256", name: "fundingRaised", type: "uint256" },
            { internalType: "address", name: "tokenAddress", type: "address" },
            { internalType: "address", name: "creatorAddress", type: "address" },
          ],
          internalType: "struct TokenFactory.memeToken[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "memeTokenAddresses",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
  ];


  useEffect(() => {
    async function fetchContractFee() {
      try {
        const result = await readContract(config, {
          abi,
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
  });

  // Coin creation function
  async function CoinCreation(data) {
    try {
      const fileUrl = URL.createObjectURL(coinImageRef.current.files[0]);
      const createMemeToken = await writeContract(config, {
        address: contractAddress,
        abi,
        functionName: "createMemeToken",
        args: [data.name, data.ticker, fileUrl, data.description],
        value: contractFee, // Pass the fee as value
        chainId: 97,
      });
      console.log('Coin created:', createMemeToken);
    } catch (error) {
      console.error("Error creating coin:", error);
    }
  }


  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create form data to send the file to the backend
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", user?.email);

      // Send the file to the backend to upload to IPFS and save the address
      try {
        const response = await axios.post("/api/upload-to-pinta", formData);
        if (response?.data?.success) {
          setFormData(response?.data?.file); // Update profile photo

          dispatch(addUser(response?.data?.file));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
  
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#1a1a2a', padding: '40px', color: 'white' }}>
      <Button onClick={onClose} sx={{ /* styles remain the same */ }}>
        <Typography variant='h2'>[Go back]</Typography>
      </Button>
      <form onSubmit={handleSubmit(CoinCreation)}>
        <Box sx={{ maxWidth: { sm: '350px', xs: '100%' }, margin: '0 auto' }}>
          {/* Form Fields */}
          <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Name</Typography>
          <StyledTextField fullWidth name="name" variant="outlined" {...register('name', { required: true })} />

          <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Ticker</Typography>
          <StyledTextField fullWidth name="ticker" variant="outlined" {...register('ticker', { required: true })} />

          <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Description</Typography>
          <StyledTextField fullWidth name="description" variant="outlined" multiline rows={4} {...register('description', { required: true })} />

          {/* File Upload */}
          <Typography variant='h5' sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Image or video</Typography>
            <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileSelect} accept="image/*,video/*" ref={coinImageRef} />
            <label htmlFor="file-upload">
              <FileUploadBox>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </Box>
                <Typography variant='h5' sx={{ color: 'white' }}>Drag and drop an image or video</Typography>
              </FileUploadBox>
            </label>

          {/* More Options */}
          <Button onClick={() => setShowMoreOptions(!showMoreOptions)} sx={{ color: '#60A5FA', textTransform: 'none', fontSize: '14px', marginTop: '20px', marginBottom: '20px', padding: 0 }}>
            {showMoreOptions ? 'Hide more options ↑' : 'Show more options ↓'}
          </Button>

          {showMoreOptions && (
            <Box>
              <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Twitter link</Typography>
              <StyledTextField fullWidth name="twitter" variant="outlined" placeholder="(optional)" {...register("twitter")} />

              <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Telegram link</Typography>
              <StyledTextField fullWidth name="telegram" variant="outlined" placeholder="(optional)" {...register("telegram")} />

              <Typography sx={{ color: '#60A5FA', marginBottom: '8px', fontSize: '14px' }}>Website</Typography>
              <StyledTextField fullWidth name="website" variant="outlined" placeholder="(optional)" {...register("website")} />
            </Box>
          )}

          {/* Tip and Submit Button */}
          <Typography sx={{ fontSize: '14px', marginTop: '20px', marginBottom: '20px' }}>Tip: coin data cannot be changed after creation</Typography>
          <CreateButton type="submit">Create coin</CreateButton>
          <Typography sx={{ marginTop: '20px', textAlign: 'center' }}>When your coin completes its bonding curve you receive 0.5 SOL</Typography>
        </Box>
      </form>
    </Box>
  );
};

const MainHome = () => {
  const [showForm, setShowForm] = useState(false);

  const user = useSelector((state) => state.user.user);

  const handleStartCoin = () => {
    if (!user?.walletAddress) {
      toast.error("Please connect your wallet first");
    } else if (user?.walletAddress) {
      setShowForm(true);
    }
  }
  const handleGoBack = () => setShowForm(false);

  return (
    <>
      <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', mt: '20px' }}>
        {showForm ? <CoinForm onClose={handleGoBack} /> : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', maxWidth: { lg: '400px' }, mt: '20px' }}>
            <Typography variant="h2" onClick={handleStartCoin} sx={{ color: 'white' }}>
              [Start your own coin]
            </Typography>
          </Box>
        )}
        <img s src="/king-of-the-hill.webp" alt="" />
      </Box>
      <Link href="/Coinsdata" style={{ textDecoration: "none",  }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center', mt: '10px', p: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Box>
            <img src='/loin.png' alt="" style={{ maxWidth: '100%', height: 'auto' }} />
          </Box>
          <Box>
            <Typography variant="body1">
              Created by test1  <span style={{ color: '#1AB75E' }}>5min</span> ago
            </Typography>
            <Typography variant="body1" color='#1AB75E'>
              Marketcap:
            </Typography>
            <Typography variant="body1">
              replies
            </Typography>
            <Typography variant="body1">
              working for #Bitcoin [ticker:Bitcoin]
            </Typography>
          </Box>
        </Box>
      </Link>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, p: 1 }}>
        <TextField
          placeholder="search for token"
          sx={{
            backgroundColor: '#222222', // Set your desired background color
            borderRadius: '10px', // Set border radius to 20px
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove the outer border
              },
            },
            input: {
              color: '#fff',
              border: '1px solid #ffff',
              borderRadius: '10px',

            },
            width: { xs: '100%', sm: '450px' } // Full width on small screens
          }}
        />

        <Button sx={{ backgroundColor: '#2563EB', color: 'white', '&:hover': { backgroundColor: '#1D4ED8' }, padding: "10px 40px" }}>
          <Typography variant="subtitle1">
            search
          </Typography>
        </Button>
      </Box>

    </>

  );
};

export default MainHome;