'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import { addUser } from "@/store/usersSlice";
import { useSelector } from "react-redux";
import ProfilePopup from "../aditprofle/ProfilePopup";
import Image from 'next/image';

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.common.black,
  fontSize: "14px",
  marginRight: "10px",
  borderRadius: "8px",
  textTransform: "none",
}));

const CustomBlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  color: theme.palette.common.black,
  fontSize: "14px",
  marginRight: "10px",
  borderRadius: "8px",
  textTransform: "none",
}));

const Navbar = () => {
  return (
    <Provider store={PumpStore}>
      <ShowNavbar />
    </Provider>
  );
};

const ShowNavbar = () => {
  const [somesOpen, setsomesOpen] = useState(false);
  const { open } = useAppKit();
  const { address } = useAccount();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  console.log(user);

  const shouldShowProfile = Boolean(user?.walletAddress || user?.email && user?.otp === null)
  let [randomNum, setrandomNum] = useState('3.244')
  let [randomNum2, setrandomNum2] = useState('7.244')

  let changingNav = useRef()
  let changingNav2 = useRef()



  useEffect(() => {
    setInterval(() => {
      let newNum = Math.round(Math.random() * 1000) / 1000
      setrandomNum(newNum)
      changingNav?.current?.classList.add('animationDiv')
      setTimeout(() => {
        changingNav?.current?.classList.remove('animationDiv')
      }, 1000);
    }, 5000);

    setInterval(() => {
      let snewNum = Math.round(Math.random() * 1000) / 1000
      setrandomNum2(snewNum)

      changingNav2?.current?.classList.add('animationDiv')
      setTimeout(() => {
        changingNav2?.current?.classList.remove('animationDiv')
      }, 1000);
    }, 3000);
  }, [])

  useEffect(() => {

    if (!address && user?.email) return

    // if (user?.walletAddress || user?.email && user?.otp === null) {
    //   setShouldShowProfile(true);
    // }
    if (!address && !user?.email) return
    const saveWalletAddress = async () => {
      try {
        const response = await axios.post("/api/save-wallet-address", {
          address,
          email: user?.email,
        });

        dispatch(addUser(response.data?.user));
      } catch (error) {
        console.error("Error saving wallet address:", error);
      }
    };
    if (address) {
      saveWalletAddress();
    }
  }, [address, user?.email, dispatch]);

  const handleClickOpen = () => {
    setsomesOpen(true);
  };

  const handleClose = () => {
    setsomesOpen(false);
  };

  const [openProfilePopup, setOpenProfilePopup] = useState(false); // State for opening the popup

  const handleOpen = () => setOpenProfilePopup(true); // Function to open the popup
  const handleClosed = () => setOpenProfilePopup(false);

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "transparent", padding: "20 10px" }}
        elevation={1}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
          }}
        >
          {/* Left Side - Support Links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
            }}
          >
            <Image src="/logo.png" alt="" width={50} height={50} />

            <Button
              sx={{
                color: "#9cd",
                textTransform: "none",
                fontSize: "14px",
                margin: { xs: "5px 0", sm: "0 10px" },
              }}
              onClick={handleClickOpen}
            >
              <Typography variant="body2">How it works</Typography>
            </Button>
            <Link href="/advanced">
              <Button
                sx={{
                  color: "#9cd",
                  textTransform: "none",
                  fontSize: "14px",
                  margin: { xs: "5px 0", sm: "0 10px" },
                }}
              >
                <Typography variant="body2">Advanced</Typography>
              </Button>
            </Link>
            <Button
              sx={{
                color: "#9cd",
                textTransform: "none",
                fontSize: "14px",
                margin: { xs: "5px 0", sm: "0 10px" },
              }}
            >
              <Typography variant="body2">Support</Typography>
            </Button>
          </Box>

          {/* Middle Section - Transaction Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', marginTop: { xs: '10px', sm: '0' } }}>
            <CustomButton ref={changingNav} sx={{ width: '100%', minHeight: '50px', marginBottom: { xs: '5px', sm: '0' } }}>
              <Typography variant='h6' align="center">
                FzkHzE bought {randomNum} SOL of Troilans
              </Typography>
            </CustomButton>

            <CustomBlueButton sx={{ width: '100%', minHeight: '50px' }} ref={changingNav2}>
              <Typography variant='h6' align="center">
                {randomNum2}created BOT on 10/23/24

              </Typography>
            </CustomBlueButton>
          </Box>

          {/* Right Side - Connect Wallet */}

          {shouldShowProfile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: "100%",
                marginTop: { xs: "10px", sm: "0" },
              }}
            >
              <Button
                sx={{
                  color: "#9cd",
                  textTransform: "none",
                  fontSize: "14px",
                  background: "#1D4ED8",
                  padding: "15px 30px",
                  borderRadius: "50px",
                }}
                onClick={handleOpen}
              >
                Open Profile
              </Button>
              <ProfilePopup openn={openProfilePopup} onClose={handleClosed} />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center", sm: "flex-end" },
                width: "100%",
                marginTop: { xs: "10px", sm: "0" },
              }}
            >
              <Button
                sx={{
                  color: "#9cd",
                  textTransform: "none",
                  fontSize: "14px",
                  background: "#1D4ED8",
                  padding: "15px 30px",
                  borderRadius: "50px",
                }}
                onClick={() => open()}
              ><Typography variant="h6">Connect Wallet</Typography>
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* How It Works Dialog */}
      <Dialog
        open={somesOpen} // Control visibility with somesOpen
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            How it works
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              padding: "10px",
              textAlign: "center",
              backgroundColor: "#1B1D28",
              color: "#ffffff",
              borderRadius: "8px",
              border: "2px solid #fff",
              width: "100%",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="body1">
              Pump prevents rugs by making sure that all created tokens are
              safe. Each coin on pump is a
              <span style={{ color: "#86EFAC" }}> fair-launch </span>
              with <span style={{ color: "#FAD900" }}>no presale</span> and{" "}
              <span style={{ color: "#FAD900" }}>no team allocation</span>.
            </Typography>
            <Box
              sx={{ marginTop: "20px", marginBottom: "20px", color: "#9cd" }}
            >
              <Typography variant="body1">
                step 1: pick a coin that you like
              </Typography>
              <Typography variant="body1">
                step 2: buy the coin on the bonding curve
              </Typography>
              <Typography variant="body1">
                step 3: sell at any time to lock in your profits or losses
              </Typography>
              <Typography variant="body1">
                step 4: when enough people buy on the bonding curve it reaches a
                market cap of $69k
              </Typography>
              <Typography variant="body1">
                step 5: $12k of liquidity is then deposited in raydium and
                burned
              </Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "#fff",
                marginTop: "10px",
              }}
              onClick={handleClose}
            >
              I'm ready to pump
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
