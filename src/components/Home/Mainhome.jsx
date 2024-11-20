"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { writeContract, readContract } from "@wagmi/core";
import { useConfig } from "wagmi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import { fetchTokenAsync } from "@/Slices/tokenSlice";
import Footer from "../Footer/Footer";

const ShowMainHome = () => {
  const user = useSelector((state) => state.user.user);
  const [tokenData, setTokenData] = useState({});
  const [timeAgo, setTimeAgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [tokenss, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchLatestToken = async () => {
      try {
        const response = await axios.get("/api/get-latest-token");

        setTokenData(response.data.token);
        setTimeAgo(response.data.timeAgo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching latest token:", error);
        setError("Failed to fetch the latest token.");
        setLoading(false);
      }
    };

    fetchLatestToken();
  }, []);

  const dispatch = useDispatch();
  const { tokens, currentPage, totalPages } = useSelector(
    (state) => state.token
  );

  useEffect(() => {

    dispatch(fetchTokenAsync({ page: currentPage, limit: 15 }));
  }, [dispatch, currentPage]);


  // Handle input change
  const fetchTokens = async (query = '') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery: query }),
      });

      const data = await response.json();
      if (!data || !data.tokens || data.tokens.length === 0) {
        setTokens([]); // Clear tokens
        setError('No tokens found'); // Show error
        return;
      }
      setTokens(data.tokens);
    } catch (err) {
      console.error('Error in fetchTokens:', err);
      setError(err.message || 'Failed to fetch tokens');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically fetch all tokens when input is cleared
  useEffect(() => {
    if (searchInput.trim() === '') {
      fetchTokens(); // Fetch all tokens when input is empty
    }
  }, [searchInput]);

  // Handle manual search on button click
  const handleSearch = () => {
    if (!searchInput.trim()) {
      setError('Please enter a search term');
      return;
    }

    fetchTokens(searchInput.trim());
  };
  
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          mt: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            cursor: "pointer",
            maxWidth: { lg: "400px" },
            mt: "20px",
          }}
        >
          <Link href="/coinCreation" style={{ textDecoration: "none" }}>
            <Typography variant="h2" sx={{ color: "white" }}>
              [Start your own coin]
            </Typography>
          </Link>
        </Box>
        <img src="/king-of-the-hill.webp" alt="king-of-the-hill" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          mt: "20px",
        }}
      >
        <Link
          href={"/Coinsdata/" + tokenData.tokenAddress}
          style={{ textDecoration: "none", width: "400px" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              alignItems: "center",
              mt: "10px",
              p: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box>
              <img
                src={tokenData?.file}
                alt="logo"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Box>
            <Box>
              <Typography variant="body1">
                Created by {tokenData?.userName || "Salman"}{" "}
                <span style={{ color: "#1AB75E" }}>{timeAgo}</span>
              </Typography>
              <Typography variant="body1" color="#1AB75E">
                Marketcap:3.345
              </Typography>
              <Typography variant="body1">replies:0</Typography>
              <Typography variant="body1">
                {tokenData?.description || "This is a meam coin "} [Ticker :
                {tokenData?.ticker || "$"}]
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          mt: 2,
          p: 1,
        }}
      >
        <TextField
          type="text"
          sx={{
            backgroundColor: "#222222", // Set your desired background color
            borderRadius: "10px", // Set border radius to 20px
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Remove the outer border
              },
            },
            input: {
              color: "#fff",
              border: "1px solid #ffff",
              borderRadius: "10px",
            },
            width: { xs: "100%", sm: "450px" }, // Full width on small screens
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search tokens..."
          disabled={isLoading}
        />

        <Button
          sx={{
            backgroundColor: "#2563EB",
            color: "white",
            "&:hover": { backgroundColor: "#1D4ED8" },
            padding: "10px 40px",
          }}
          onClick={handleSearch}
          disabled={isLoading}
        >
          <Typography variant="subtitle1">search</Typography>
        </Button>
      </Box>
      <Footer tokens={tokens} filteredTokens={tokenss} searchInput={searchInput} />
    </>
  );
};

const MainHome = () => {
  return (
    <Provider store={PumpStore}>
      <ShowMainHome />
    </Provider>
  );
};

export default MainHome;
