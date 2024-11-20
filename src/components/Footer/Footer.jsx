"use client";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTokenAsync,
  initializeSocket,
  setCurrentPage,
  setTokens,
  shuffleTokens,
} from "@/Slices/tokenSlice"; // Ensure correct path
import { toast } from "react-toastify";
import Link from "next/link";
import { io } from "socket.io-client";
// import useSocket from "@/app/useSocket";

const socket = io("/api/socket", { 
  transports: ['polling', 'websocket'], 
});

const AdsBoxes = ({ name, maketcap, desc, img, index, comments }) => {
  return (
    <Box
      className={index === 0 ? "animationDiv" : ""}
      sx={{
        width: "400px",
        minHeight: "180px",
        display: "flex",
        marginTop: "40px",
        "&:hover": {
          outline: "2px solid white",
          cursor: "pointer",
          borderRadius: "8px",
        },
      }}
    >
      <Box
        style={{
          width: "180px",
          height: "auto",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt="Ad Image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "8px", // optional, for rounded corners
          }}
        />
      </Box>{" "}
      <Box>
        <Typography sx={{ margin: "20px 0 0 20px", fontSize: ".8em" }}>
          Created By : {name}
        </Typography>
        <Typography
          sx={{
            margin: "0px 0 0 20px",
            fontSize: ".8em",
            color: "#ED6C02",
          }}
        >
          market cap : {maketcap}
        </Typography>
        <Typography
          sx={{
            margin: "0px 0 0 20px",
            fontSize: ".8em",
            color: "#ED6C02",
          }}
        >
          replies:{comments}
        </Typography>
        <Typography sx={{ margin: "10px 0 0 20px", fontSize: ".8em" }}>
          <span style={{ fontSize: "1.3em", fontWeight: "700" }}>{name}</span> :{" "}
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

const Footer = ({ tokens, currentPage, filteredTokens, searchInput }) => {

  let [allMess, setallMess] = useState([]);
  let [whichTab, setwhichTab] = useState("following");
  const [age, setAge] = useState(10);
  let [showSlector2, setshowSlector2] = useState(false);
  let [whichBtn, setwhichBtn] = useState(true);
  let [whichBtn2, setwhichBtn2] = useState(true);
  let boxesShower = useRef();

  const [animationTrigger, setAnimationTrigger] = useState(true);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [hoverMessage, setHoverMessage] = useState(false);
  const toastShownRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.token);
  // useEffect(() => {
  //   // Connect to Socket.io server
  //   socket = io('http://localhost:3000',{ path : '/api/socket' , transports: ["websocket"] , withCredentials: true} );

  //   socket.on('connect', () => {
  //     console.log('Socket connected:', socket.id);
  //   });

  //   // Event listener for connection error
  //   socket.on('connect_error', (error) => {
  //     console.error('Connection error:', error);
  //   });

  //   // Listen for the 'newToken' event and update Redux store
  //   socket.on('newToken', (tokens) => {
  //     console.log('Received new tokens:', tokens);
  //     dispatch(setTokens(tokens));
  //   });

  //   // Event listener for disconnection
  //   socket.on('disconnect', (reason) => {
  //     console.log('Socket disconnected:', reason);
  //   });

  //   // Cleanup on unmount
  //   return () => {
  //     socket.disconnect();
  //     console.log('Socket disconnected on component unmount');
  //   };

  // }, [dispatch]);

  // const { socket, connected } = useSocket();

  // useEffect(() => {
  //   if (socket) {
  //     socket.on('newToken', (tokens) => {
  //       console.log('Received new tokens:', tokens);
  //       dispatch(setTokens(tokens));
  //     });
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.off("newToken");
  //     }
  //   };
  // }, [socket]);

  useEffect(() => {
    // Listen for tokens from the server
    socket.on("newToken", (tokens) => {
      console.log("Tokens received:", tokens);
    });

    socket.on("error", (error) => {
      console.error("Error:", error);
    });

    // Example: emit event to fetch tokens
    socket.emit("getTokens");

    // Cleanup when component unmounts
    return () => {
      socket.off("newToken");
      socket.off("error");
    };
  }, []);

  useEffect(() => {
    if (hoverMessage && !toastShownRef.current) {
      setIsPaused(true);
      toastShownRef.current = true; // Set flag to true to prevent additional toasts
    } else {
      setIsPaused(false);
    }

    if (animationTrigger) {
      const intervalId = setInterval(() => {
        // Shuffle only if not hovering
        if (!hoverMessage) {
          dispatch(shuffleTokens());
          if (boxesShower.current && boxesShower.current.children[0]) {
            if (whichBtn) {
              boxesShower.current.children[0].classList.remove("animationDiv");
            }
          }
          setTimeout(() => {
            if (boxesShower.current && boxesShower.current.children[0]) {
              if (whichBtn) {
                boxesShower.current.children[0].classList.add("animationDiv");
              }
            }
          }, 50); // Adjust delay as needed
        }
      }, 2000);

      return () => clearInterval(intervalId);
    }
  }, [animationTrigger, hoverMessage, whichBtn]);

  function animationHandle() {
    setAnimationTrigger(false);
    setHoverMessage(true);
  }

  function animationHandleoff() {
    setAnimationTrigger(true);
    setHoverMessage(false);
    toastShownRef.current = false;
  }

  const handleChange = (event) => {
    setAge(event.target.value); // Update the state with the selected value
  };

  return (
    <Box sx={{ marginTop: "30px", padding: "10px" }}>
      <Box
        sx={{
          display: "flex",
          cursor: "pointer",
          justifyContent: { sm: "normal", xs: "space-around" },
        }}
      >
        <Typography
          variant="body1"
          sx={
            whichTab === "following"
              ? {
                  marginLeft: "20px",
                  color: "#fff",
                  borderBottom: "4px solid #1D4ED7",
                }
              : { marginLeft: "20px", color: "#6B7280" }
          }
          onClick={() => {
            setwhichTab("following");
          }}
        >
          {" "}
          Following
        </Typography>
        <Typography
          variant="body1"
          sx={
            whichTab === "termainal"
              ? {
                  marginLeft: "20px",
                  color: "#fff",
                  borderBottom: "4px solid #1D4ED7",
                }
              : { marginLeft: "20px", color: "#6B7280" }
          }
          onClick={() => {
            setwhichTab("termainal");
          }}
        >
          {" "}
          Termianl
        </Typography>
      </Box>
      {whichTab == "termainal" ? (
        <Box>
          <Box sx={{ display: { sm: "flex", xs: "block" } }}>
            {whichTab == "termainal" ? (
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 170,
                  margin: "20px 0 0 20px",
                  borderRadius: "15px",
                }}
                size="small"
              >
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age} // Bind the select value to the state
                  label="Age"
                  onChange={handleChange}
                  sx={{
                    backgroundColor: "#1D4ED7", // Set default background color
                    color: "#fff", // Set text color
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set hover border color
                    },
                    ".MuiSvgIcon-root": {
                      color: "#fff", // Set color for dropdown arrow
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#1D4ED7", // Maintain background when focused/open
                      color: "#fff",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1D4ED7", // Change background color of the dropdown
                        color: "#fff", // Change text color of the dropdown
                      },
                    },
                  }}
                >
                  <MenuItem value={10} onClick={() => setshowSlector2(false)}>
                    sort: featured 🔥
                  </MenuItem>
                  <MenuItem value={20} onClick={() => setshowSlector2(true)}>
                    sort: bump Order
                  </MenuItem>

                  <MenuItem value={20} onClick={() => setshowSlector2(true)}>
                    sort: creation time
                  </MenuItem>
                  <MenuItem value={30} onClick={() => setshowSlector2(true)}>
                    sort: last reply
                  </MenuItem>
                  <MenuItem value={40} onClick={() => setshowSlector2(false)}>
                    sort: currently live
                  </MenuItem>
                  <MenuItem value={50} onClick={() => setshowSlector2(true)}>
                    sort: market cap
                  </MenuItem>
                </Select>
              </FormControl>
            ) : null}

            {showSlector2 ? (
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 130,
                  margin: "20px 0 0 20px",
                  borderRadius: "15px",
                }}
                size="small"
              >
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={age} // Bind the select value to the state
                  label="Age"
                  sx={{
                    backgroundColor: "#1D4ED7", // Set default background color
                    color: "#fff", // Set text color
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set hover border color
                    },
                    ".MuiSvgIcon-root": {
                      color: "#fff", // Set color for dropdown arrow
                    },
                    "&.Mui-focused": {
                      backgroundColor: "#1D4ED7", // Maintain background when focused/open
                      color: "#fff",
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: "#1D4ED7", // Change background color of the dropdown
                        color: "#fff", // Change text color of the dropdown
                      },
                    },
                  }}
                >
                  <MenuItem value={10}>order: asc</MenuItem>

                  <MenuItem value={20}>order: desc</MenuItem>
                </Select>
              </FormControl>
            ) : null}

            <Box sx={{ marginTop: "20px" }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "20px", color: "white", cursor: "pointer" }}
                >
                  Show animation
                </Typography>
                <Typography
                  variant="body1"
                  sx={
                    whichBtn
                      ? {
                          marginLeft: "10px",
                          backgroundColor: "#1D4ED7",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                      : {
                          marginLeft: "10px",
                          color: "white",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => setwhichBtn(true)}
                >
                  on
                </Typography>
                <Typography
                  variant="body1"
                  sx={
                    !whichBtn
                      ? {
                          marginLeft: "10px",
                          backgroundColor: "#1D4ED7",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                      : {
                          marginLeft: "10px",
                          color: "white",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => {
                    console.log(whichBtn);
                    setwhichBtn(false);
                  }}
                >
                  off
                </Typography>
                <Typography
                  variant="body1"
                  color="white"
                  sx={{
                    marginLeft: "10px",
                    backgroundColor: "blue",
                    px: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    display: isPaused ? "flex" : "none",
                  }}
                >
                  Paused
                </Typography>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="h6"
                  sx={{ marginLeft: "20px", color: "white", cursor: "pointer" }}
                >
                  Include nsfw:
                </Typography>
                <Typography
                  variant="body1"
                  sx={
                    whichBtn2
                      ? {
                          marginLeft: "10px",
                          backgroundColor: "#1D4ED7",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                      : {
                          marginLeft: "10px",
                          color: "white",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => setwhichBtn2(true)}
                >
                  on
                </Typography>
                <Typography
                  variant="body1"
                  sx={
                    !whichBtn2
                      ? {
                          marginLeft: "10px",
                          backgroundColor: "#1D4ED7",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                      : {
                          marginLeft: "10px",
                          color: "white",
                          px: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => setwhichBtn2(false)}
                >
                  off
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "Wrap",
        }}
        ref={boxesShower}
        onMouseEnter={animationHandle}
        onMouseLeave={animationHandleoff}
      >
        {/* filteredTokens */}
        {/* {filteredTokens?.length > 0 ? (
          filteredTokens.map((data, index) => (
            <Link href={"/Coinsdata/" + data.tokenAddress} key={index}>
              <AdsBoxes
                name={data.name}
                index={index} 
                maketcap={data.maketcap}
                desc={data.description}
                img={data.file}
                comments={data.allComments.length}
              />
            </Link>
          ))
        ) : */}

{searchInput?.trim() ? ( // Check if search query exists
  filteredTokens?.length > 0 ? (
    filteredTokens.map((data, index) => (
      <Link href={"/Coinsdata/" + data.tokenAddress} key={index}>
        <AdsBoxes
          name={data.name}
          index={index}
          maketcap={data.maketcap}
          desc={data.description}
          img={data.file}
          comments={data.allComments.length}
        />
      </Link>
    ))
  ) : (
    <Typography>No tokens found</Typography>
  )
) : tokens?.length > 0 ? ( // No search query, show all tokens
  tokens.map((data, index) => (
    <Link href={"/Coinsdata/" + data.tokenAddress} key={index}>
      <AdsBoxes
        name={data.name}
        index={index}
        maketcap={data.maketcap}
        desc={data.description}
        img={data.file}
        comments={data.allComments.length}
      />
    </Link>
  ))
) : (
  <Typography>No tokens found</Typography>
)}




      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={7}>
        <Button
          variant="outlined"
          sx={{ backgroundColor: "#fff" }}
          disabled={currentPage === 1}
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          Previous
        </Button>

        <Typography sx={{ mx: 2 }}>
          Page {currentPage} of {totalPages}
        </Typography>

        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          sx={{ backgroundColor: "#fff" }}
        >
          Next
        </Button>
      </Box>
      <Typography
        variant="body1"
        sx={{ textAlign: "center", mt: "30px", fontSize: ".9em" }}
      >
        This site is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply
      </Typography>
    </Box>
  );
};

export default Footer;
