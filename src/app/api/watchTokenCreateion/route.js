import { createPublicClient, http, watchContractEvent } from "viem";
import { bscTestnet } from "viem/chains";
import {contractAddress} from "@/contract/contract"; // Adjust path to your ABI file
import dbConnect from "@/dbConnect";
import Token from "@/Model/Tokens";
import User from '@/Model/Users';

// Initialize viem client for Binance Smart Chain
const PublicClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});

// Initialize event listener at server startup (runs only once)
let listenerStarted = false;
const startEventListener = async () => {
  if (listenerStarted) return;
  listenerStarted = true;

  // Ensure database connection is established
  await dbConnect();

  console.log("Initializing event listener for MemeTokenCreated...");

  PublicClient.watchEvent({
    address: contractAddress,
    event: {
      anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "MemeTokenCreated",
    type: "event",
    },
  
    onLogs: async (logs) => {
      console.log("Event detected:", logs); // Confirm event detection
      try {

        const { args } = logs?.[0];

        const {
          creator,
          name,
          symbol,
          tokenAddress,
          description,
          imageUrl,
        } = args;
  
        console.log(
          creator,
          name,
          symbol,
          tokenAddress,
          description,
          imageUrl,
          "server logs"
        );


        const walletAddress = creator; // This is your wallet address (creator)
        console.log(walletAddress, "server-side wallet address");

        // Use the correct query object with the field name `walletAddress`
        const user = await User.findOne({ walletAddress: walletAddress });
        
        // Check if the user was found, and if not, return "Unknown User"
        const userName = user ? user.name : "Unknown User";
        console.log(user, "server-side user name");
        

          // Construct token data for saving to database
          const tokenEventData = {
            userName: userName,
            name: name,
            ticker: symbol,
            tokenAddress: tokenAddress,
            description: description,
            file: imageUrl,
            createdAt: new Date(),
            walletAddress:creator,
          };

          // Save token data to the database
          const response = await Token.create(tokenEventData);
          console.log("Token data saved successfully:", response);
        
      } catch (error) {
        console.error("Failed to save token data:", error);
      }
    },
  });
};

// API route handler to initialize the listener
export async function POST(req, res) {
  // Start the event listener
  await startEventListener();
  return new Response(
        JSON.stringify({
          success: true,
          message: "event watching started" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
}
