"use client";
import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Abouttograduate from "@/components/Abouttograduate/Abouttograduate";
import Newlycreated from "@/components/Abouttograduate/Newlycreated";
import Navbar from "@/components/Navbar/Navbar";
import { useAccount } from "wagmi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addUser, clearUser } from "@/store/usersSlice";
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

    // Continue adding items until you reach 20...
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

const FilterModal = ({ open, handleClose }) => {
  const [marketCap, setMarketCap] = useState({ from: "", to: "" });
  const [volume, setVolume] = useState({ from: "", to: "" });
  const [holders, setHolders] = useState({ from: "", to: "" });

  const handleApply = () => {
    // Apply filter logic here, e.g., filtering mockData.newlyCreated based on inputs
    console.log("Applying filter:", { marketCap, volume, holders });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { sm: "600px", xs: "100%" },
          backgroundColor: "#222222",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
          <Typography variant='h6' sx={{ color: "#fff" }}>
            Filter
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ marginBottom: "10px" }}>
          <Typography
            variant='body2'
            sx={{ color: "#fff", marginBottom: "5px" }}>
            Market Cap
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder='From'
              fullWidth
              variant='outlined'
              sx={{
                marginRight: "10px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={marketCap.from}
              onChange={(e) =>
                setMarketCap({ ...marketCap, from: e.target.value })
              }
            />
            <Typography
              variant='body1'
              sx={{ color: "#fff", marginRight: "10px" }}>
              To
            </Typography>
            <TextField
              placeholder='To'
              fullWidth
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={marketCap.to}
              onChange={(e) =>
                setMarketCap({ ...marketCap, to: e.target.value })
              }
            />
          </Box>
        </Box>

        <Box sx={{ marginBottom: "10px" }}>
          <Typography
            variant='body2'
            sx={{ color: "#fff", marginBottom: "5px" }}>
            Volume
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder='From'
              fullWidth
              variant='outlined'
              sx={{
                marginRight: "10px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={volume.from}
              onChange={(e) => setVolume({ ...volume, from: e.target.value })}
            />
            <Typography
              variant='body1'
              sx={{ color: "#fff", marginRight: "10px" }}>
              To
            </Typography>
            <TextField
              placeholder='To'
              fullWidth
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={volume.to}
              onChange={(e) => setVolume({ ...volume, to: e.target.value })}
            />
          </Box>
        </Box>

        <Box sx={{ marginBottom: "10px" }}>
          <Typography
            variant='body2'
            sx={{ color: "#fff", marginBottom: "5px" }}>
            Holders
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              placeholder='From'
              fullWidth
              variant='outlined'
              sx={{
                marginRight: "10px",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={holders.from}
              onChange={(e) => setHolders({ ...holders, from: e.target.value })}
            />
            <Typography
              variant='body1'
              sx={{ color: "#fff", marginRight: "10px" }}>
              To
            </Typography>
            <TextField
              placeholder='To'
              fullWidth
              variant='outlined'
              sx={{
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                "& .MuiInputBase-input": { color: "#fff" },
              }}
              InputProps={{
                sx: { "&::placeholder": { color: "#fff" } },
              }}
              value={holders.to}
              onChange={(e) => setHolders({ ...holders, to: e.target.value })}
            />
          </Box>
        </Box>

        <Button
          variant='contained'
          sx={{ backgroundColor: "#1D4ED8", marginTop: "10px", float: "right" }}
          onClick={handleApply}>
          Apply
        </Button>
      </Box>
    </Modal>
  );
};

const Advanced = () => {
  return (
    <Provider store={PumpStore}>
      <ShowAdvanced />
    </Provider>
  );
};

const ShowAdvanced = () => {
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const { address } = useAccount();
  console.log(address, "<<<<>>>>>>>");

  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);
  const [email, setEmail] = useState("");
  console.log(email, "<<<>>>>>>");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user, "<<<data from redux>>>>>>");

  const [otp, setOtp] = useState("");
  console.log(otp, "<<<>>>>>>");

  useEffect(() => {
    if (!address) {
      setOpenEmailDialog(true);
    }
  }, [address]);

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post("/api/verify-email", { email });
      console.log("Response:", response.data);

      toast.success(response.data.message);
      if (response.data.success) {
        console.log("Email addUser in Advance page.jsx");
        dispatch(addUser(response.data.user));
        setOpenEmailDialog(false);
        setOpenOtpDialog(true);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error sending email:", error);
    }
  };
  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post("/api/verify-otp", { email, otp });
      console.log("Response:", response.data);
      console.log("Email addUser in Advance page.jsx 2nd");

      dispatch(addUser(response.data.user));
      if (response.data.success) {
        toast.success(response.data.message);
        setOpenOtpDialog(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#222222", minHeight: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Typography variant='h3' sx={{ marginBottom: "20px", color: "#fff" }}>
          About to graduate
        </Typography>
        <Box sx={{ overflowX: "auto" }}>
          <Grid container spacing={3} sx={{ display: "flex" }}>
            {mockData.aboutToGraduate.map((coin, index) => (
              <CoinCard key={index} coin={coin} />
            ))}
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            alignItems: "center",
          }}>
          <Box>
            <Typography variant='h3' sx={{ mt: "30px", color: "#fff" }}>
              Newly created
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Button
              variant='contained'
              sx={{ backgroundColor: "#1D4ED8" }}
              onClick={handleOpenFilter}>
              Filter
              <ExpandMoreIcon />
            </Button>
            <FilterModal open={filterOpen} handleClose={handleCloseFilter} />
            <Typography sx={{ marginRight: "10px", color: "#fff" }}>
              Quick by
            </Typography>
            <Box display='flex' alignItems='center' width={150}>
              <TextField
                variant='outlined'
                // value="0.01"
                placeholder='0.01'
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position='start'>
                      <img
                        alt='solana logo'
                        src='https://pump.fun/_next/image?url=%2Ficons%2Fsol_logo.png&w=16&q=75'
                        width={25}
                        height={25}
                      />
                    </InputAdornment>
                  ),
                  style: {
                    fontSize: "1rem", // Adjust font size as needed
                    paddingRight: "8px",
                    color: "white",
                    width: "150px",
                    textAlign: "right",
                  },
                }}
                sx={{
                  width: 80, // Adjust width as needed
                  "& .MuiOutlinedInput-root": {
                    padding: "0 8px", // Adjust padding for compact look
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Newlycreated />

        {/* Email Dialog */}
        {/* Email Dialog */}
        <Dialog
          open={openEmailDialog}
          onClose={() => setOpenEmailDialog(false)}>
          <DialogTitle>
            Enter Your Email
            <IconButton
              aria-label='close'
              onClick={() => setOpenEmailDialog(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Email'
              type='email'
              fullWidth
              variant='outlined'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // This sets the email
            />
            <Button
              onClick={handleEmailSubmit}
              variant='contained'
              sx={{ mt: 2, backgroundColor: "#1D4ED8" }}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>

        {/* OTP Dialog */}
        <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)}>
          <DialogTitle>Enter OTP</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='OTP'
              type='text'
              fullWidth
              variant='outlined'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              onClick={handleOtpSubmit}
              variant='contained'
              sx={{ mt: 2, backgroundColor: "#1D4ED8" }}>
              Verify OTP
            </Button>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
};

export default Advanced;
