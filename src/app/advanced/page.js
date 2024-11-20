"use client";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid2"; // Import Grid2 from MUI
import {
  Button,
  Box,
  Typography,
  Modal,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Abouttograduate from "@/components/Abouttograduate/Abouttograduate";
import Newlycreated from "@/components/Abouttograduate/Newlycreated";
import Navbar from "@/components/Navbar/Navbar";
import { useAccount } from "wagmi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import DraftsIcon from '@mui/icons-material/Drafts';
import "react-toastify/dist/ReactToastify.css";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, clearUser } from "@/Slices/usersSlice";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import Image from "next/image";

const mockData = {
  aboutToGraduate: [
    {
      id: 1,
      name: "Bitcoin",
      image: "about.png",
      mc: "$800B",
      volume: "$35B",
      timeAgo: "1 hour ago",
    },
  ],
  newlyCreated: [
    {
      image: "/about.png",
      name: "SM SEMSON",
      mc: "5.5k",
      volume: "347",
      holders: "Evf8np",
      own: 6.71,
      sol: "-",
      uPnl: "0.01",
      threads: "0.00",
      price: "0.01",
    },
    {
      image: "/about.png",
      name: "MIND MIND",
      mc: "5.1k",
      volume: "313",
      holders: "4KJnCT",
      own: 6.07,
      sol: "0.2",
      uPnl: "-0.00",
      threads: "0.00",
      price: "0.01",
    },
  ],
};

// Card for coins in "About to Graduate" section
const CoinCard = ({ coin }) => {
  return <Abouttograduate />;
};

// Card for coins in "Newly Created" section

// Modal Component for Filters


const Advanced = () => {
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
      <ShowAdvanced />
    </Provider>
  );
};

const ShowAdvanced = () => {
  const { address } = useAccount();

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  let otpInput = useRef()

  useEffect(() => {
    if (!address) {
      setOpenEmailDialog(true);
    }
  }, [address]);

  const handleEmailSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-email", { email });

      toast.success(response.data.message);
      if (response.data.success) {
        dispatch(addUser(response.data.user));
        setOpenEmailDialog(false);
        setOpenOtpDialog(true);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending email:", error);
      setLoading(false);

    }
  };
  const handleOtpSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      if (response.data.success) {
        toast.success(response.data.message);
        setOpenOtpDialog(false);
        setLoading(false);
      }
    } catch (error) {
      
      toast.error('Invaild OTP')
      setLoading(false);
    }
  };
  const InpustsShower = useRef(null);

  const handleInputChange = (event, index) => {
    const value = event.target.value;
  
    if (!/^\d$/.test(value) && value !== "") return;
  
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  
    if (value !== "" && index < otp.length - 1) {
      InpustsShower.current.children[index + 1].focus();
    }
  
    if (updatedOtp.every(digit => digit !== "")) {
      handleOtpSubmit();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        InpustsShower.current.children[index - 1].focus();
        
      }
    } else if (event.key === "Backspace") {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";
    }
  };

  const inputStyle = {
    width: '70px',
    height: '70px',
    background: 'transparent',
    border: '1px solid white',
    borderRadius: '10px',
    color: 'white',
    fontSize: '1.2em',
    textAlign: 'center'
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: "transparent", minHeight: "100vh" }}>
        <Navbar />
        <Typography variant='h3' sx={{ margin: "20px", color: "#fff" }}>
          About to graduate
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={3} sx={{ display: "flex" }}>
            {mockData?.aboutToGraduate?.map((coin, index) => (
              <CoinCard key={index} coin={coin} />
            ))}
          </Grid>
        </Box>
        {/* newley Created */}
        <Newlycreated />

        <Dialog
          open={openEmailDialog}
          onClose={() => setOpenEmailDialog(false)}
          PaperProps={{
            sx: {
              backgroundColor: "#222222",
              height: '300px',
              display: 'flex',
              borderRadius: '30px',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}

        >

          <DialogTitle>
            <img style={{ mt: '-30px' }} src="/logo.png" width='70px' height='70px' />
            <IconButton
              aria-label='close'
              onClick={() => setOpenEmailDialog(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

          </DialogTitle>

          <DialogContent sx={{ backgroundColor: "#222222" }}> {/* Apply the same color here */}
            <TextField
              placeholder="Enter your email"
              autoFocus
              margin='dense'
              type='email'
              fullWidth
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    color: "#fff", // Set placeholder color to white
                  },
                  color: "#fff", // Optional: Set the input text color to white
                },
              }}
            />

            <Button
              onClick={handleEmailSubmit}
              variant='contained'
              sx={{ mt: 2, backgroundColor: "#1D4ED8", borderRadius: "30px" }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Submit"}
            </Button>
          </DialogContent>
        </Dialog>


        {/* OTP Dialog */}
        <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)} >
          <DialogContent sx={{ backgroundColor: '#1F1F1E', width: '500px' }}>
            <DraftsIcon sx={{ margin: 'auto', color: 'blue', display: 'block', fontSize: '60px' }} />
            <Typography sx={{ textAlign: 'center', xolor: 'white', fontWeight: '800', marginTop: '30px' }}>Enter confirmation code</Typography>
            <Typography sx={{ textAlign: 'center', xolor: 'white', fontWeight: '100', padding: '0 40px' }}>Please check Email for an email from privy.io and enter your code below.</Typography>


            <Box
              sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}
              ref={InpustsShower}
            >
              {otp.map((value, index) => (
                <input
                  key={index}
                  value={value}
                  onChange={(event) => handleInputChange(event, index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  type="text" // Use "text" to control input pattern
                  inputMode="numeric" // Numeric keyboard on mobile
                  style={inputStyle}
                  autoFocus={index === 0}
                  maxLength="1"
                  className="hideNum"
                  ref={otpInput}
                />
              ))}
            </Box>
            <Typography sx={{ margin: '30px 0 0 20px' }}>Didn't get an email? <span style={{ color: 'blue', cursor: 'pointer' }}>Resend otp</span></Typography>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default Advanced;
