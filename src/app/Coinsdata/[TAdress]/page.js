'use client'
import { Box, Button, Checkbox, colors, Container, InputAdornment, Switch, Tab, Tabs, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import CoinsDetails from '@/components/coindata/CoinsDetails';
import Comments from '@/components/coindata/Comments';
import Trades from '@/components/coindata/Trades';
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Provider } from 'react-redux';
import PumpStore from '@/store/store';
import { useDispatch } from 'react-redux';
import { newPage } from '@/Slices/usersSlice';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: "600px", xs: "100%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "#1B1D28",
  color: "white",
};
const TABS = {
  THREAD: "THREAD",
  TRADE: "TRADE",
};


const CoinData = () => {
  return <Provider store={PumpStore}>
    <ShowCoinData />
  </Provider>
}

const ShowCoinData = () => {
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [frontRunningProtection, setFrontRunningProtection] = useState(false);
  const [priorityFee, setPriorityFee] = useState(0.01);
  const [activeTab, setActiveTab] = useState(TABS?.THREAD || "THREAD");
  let params = useParams()
  let dispatch = useDispatch()

  let [TokenDetails, setTokenDetails] = useState({})

  useEffect(() => {
    dispatch(newPage(2))
    setTimeout(() => {
      dispatch(newPage(0))
    }, 500);

    axios.post('/api/WhichToken', { tokenAddress: params.TAdress }).then((resp) => {
      setTokenDetails(resp.data.TokenDetail)
    }).catch((error) => {
      console.log(error)
    })
  }, [])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderActiveTabContent = () => {
    return activeTab === TABS.THREAD ? <Comments /> : <Trades />;
  };



  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ flexGrow: 1, background: "#1B1D28", height: "auto" }}>
          <Navbar />
          <Container maxWidth='xl'>
            <Grid container spacing={2}>
              <Grid
                size={{ lg: 8, xs: 12 }}
                sx={{ color: "white", minHeight: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    marginTop: "20px ",
                  }}>
                  <Typography sx={{ fontSize: ".8em", margin: "10px 20px" }}>
                    {TokenDetails?.name}
                  </Typography>
                  <Typography sx={{ fontSize: ".8em", margin: "10px 20px" }}>
                    Ticker:{TokenDetails?.ticker}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: ".8em",
                      color: "blue",
                      margin: "10px 20px",
                    }}>
                    Market cap: $19,399.581
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: ".8em",
                      margin: "10px 20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    CA :{" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        border: "1px solid gray",
                        color: "gray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}>
                      {" "}
                      asmdjsmdwdzXasjdn
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: ".8em", margin: "10px 20px" }}>
                    created by : <span style={{ color: "blue" }}>{TokenDetails?.userName}</span>
                  </Typography>
                </Box>

                <Box
                  sx={{
                    padding: "10px",
                    height: "400px",
                    background: "black",
                    width: "100%",
                  }}></Box>

                <Box sx={{ paddingY: "20px", color: "white" }}>
                  <Tabs
                    sx={{ marginBottom: 2 }}
                    value={activeTab}
                    onChange={(e, newValue) => setActiveTab(newValue)}
                    textColor='inherit'
                    indicatorColor='primary'>
                    <Tab
                      label='Thread'
                      value={TABS.THREAD}
                      sx={{
                        color: "white",
                        borderRadius: "10px",
                      }}
                    />
                    <Tab
                      label='Trade'
                      value={TABS.TRADE}
                      sx={{
                        color: "white",
                        borderRadius: "10px",
                      }}
                    />
                  </Tabs>

                  {renderActiveTabContent()}
                </Box>
              </Grid>
              <Grid
                size={{ lg: 4, xs: 12 }}
                sx={{ padding: "0 20px", minHeight: "100vh" }}>
                <Box
                  sx={{
                    width: { lg: "100%", sm: "60%", xs: "100%" },
                    background: "#2E303A",
                    minHeight: "300px",
                    margin: "auto",
                    marginTop: "60px",
                    borderRadius: "20px",
                  }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                    }}>
                    <Button
                      variant='contained'
                      disableElevation
                      sx={{
                        marginTop: "20px",
                        width: "170px",
                        background: isBuyMode ? "#4ADE80" : "#1F2937",
                      }}
                      onClick={() => setIsBuyMode(true)}>
                      Buy
                    </Button>
                    <Button
                      variant='contained'
                      disableElevation
                      sx={{
                        marginTop: "20px",
                        width: "170px",
                        background: !isBuyMode ? "red" : "#1F2937",
                      }}
                      onClick={() => setIsBuyMode(false)}>
                      Sell
                    </Button>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}>
                    <Button
                      variant='contained'
                      disableElevation
                      sx={{
                        margin: "20px 0 0 10px",
                        fontSize: ".5em",
                        backgroundColor: "#1F2937",
                      }}>
                      Switch to solana
                    </Button>
                    <Button
                      variant='contained'
                      disableElevation
                      sx={{
                        margin: "20px 10px 0 0px",
                        fontSize: ".5em",
                        backgroundColor: "#1F2937",
                      }}
                      onClick={handleOpen}>
                      Set max slippage
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby='modal-modal-title'
                      aria-describedby='modal-modal-description'>
                      <Box sx={style}>
                        <Typography variant='h6' gutterBottom>
                          Set max. slippage (%)
                        </Typography>
                        <TextField
                          type='number'
                          fullWidth
                          variant='outlined'
                          onChange={(e) => setSlippage(e.target.value)}
                          InputProps={{
                            sx: {
                              "& input": {
                                color: "white", // This changes the input text color to white
                              },
                            },
                          }}
                          sx={{
                            marginBottom: 2,
                            backgroundColor: "#2A2A3B",
                            borderRadius: "5px",
                            fontSize: "1.2em",
                          }}
                          placeholder='0.0'
                        />

                        {/* Warning Text */}
                        <Typography
                          variant='body2'
                          color='gray'
                          sx={{ marginBottom: 2 }}>
                          This is the maximum amount of slippage you are willing
                          to accept when placing trades{" "}
                        </Typography>

                        {!frontRunningProtection ? (
                          <Typography
                            variant='body2'
                            color='error'
                            sx={{ marginBottom: 2 }}>
                            Warning: setting your slippage too high may result
                            in bots front-running your trades. We highly
                            recommend turning on front-running protection if you
                            have high slippage.
                          </Typography>
                        ) : null}

                        {/* Front Running Protection Switch */}
                        <Box
                          display='flex'
                          justifyContent='space-between'
                          alignItems='center'
                          sx={{ marginBottom: 2 }}>
                          <Typography variant='body1'>
                            Enable front-running protection
                          </Typography>
                          <Switch
                            checked={frontRunningProtection}
                            onChange={() =>
                              setFrontRunningProtection(!frontRunningProtection)
                            }
                            color='primary'
                          />
                        </Box>
                        {frontRunningProtection ? (
                          <Typography
                            variant='body2'
                            color='success'
                            sx={{ marginBottom: 2 }}>
                            Front-running protection stops bots from
                            front-running your buys. You can use high slippage
                            with front-running protection turned on. We
                            recommend setting a priority fee of at least 0.01
                            SOL with front-running protection enabled.
                          </Typography>
                        ) : null}
                        {/* Priority Fee Input */}
                        <Typography variant='h6' gutterBottom>
                          Priority Fee
                        </Typography>
                        <TextField
                          type='number'
                          fullWidth
                          variant='outlined'
                          value={priorityFee}
                          onChange={(e) => setPriorityFee(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position='end'
                                sx={{ color: "white" }}>
                                SOL
                              </InputAdornment>
                            ),
                            sx: {
                              "& input": {
                                color: "white", // This changes the input text color to white
                              },
                            },
                          }}
                          sx={{
                            marginBottom: 2,
                            backgroundColor: "#2A2A3B",
                            borderRadius: "5px",
                            fontSize: "1.2em",
                          }}
                        />

                        <Typography variant='body2' sx={{ marginBottom: 2 }}>
                          A higher priority fee will make your transactions
                          confirm faster. This is the transaction fee that you
                          pay to the Solana network on each trade.
                        </Typography>

                        {/* Close Button */}
                        <Box display='flex' justifyContent='center'>
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setOpen(false)}>
                            Close
                          </Button>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>

                  <Box
                    sx={{ px: "20px", display: "flex", position: "relative" }}>
                    <input
                      type='number'
                      style={{
                        width: "100%",
                        border: "1px solid white",
                        padding: "5px 10px",
                        height: "50px",
                        color: "white",
                        background: "#2E303A",
                        margin: "20px 0",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                      }}
                      placeholder='0.0'
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        right: "25px",
                        top: "25px",
                      }}>
                      <Typography
                        variant='body1'
                        sx={{ color: "white", marginRight: "10px" }}>
                        {TokenDetails?.ticker}
                      </Typography>
                      <img
                        alt='solana'
                        src={TokenDetails?.file}
                        width={35}
                        height={35}
                        style={{ borderRadius: "50%" }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ padding: "10px 20px" }}>
                    <Button
                      variant='contained'
                      disableElevation
                      sx={{
                        fontSize: "1em",
                        backgroundColor: "#4ADE80",
                        width: "100%",
                      }}>
                      Switch to solana
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Checkbox />
                    <Typography sx={{ color: "gray" }}>Add comment</Typography>
                  </Box>
                </Box>
                <CoinsDetails />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CoinData;
