
import { setTokens } from "@/Slices/tokenSlice";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch } from "react-redux";

let socket;

const useSocket = () => {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();

useEffect(() => {
    // Connect to the socket server
    socket = io({
      path: "/api/socket",  // Match this path with the server-side socket path
      transports: ["websocket"],  // Ensure WebSocket transport is used
    });
    
    socket.on("connect", () => {
      setConnected(true);
      console.log("Connected to the socket server", socket.id);
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

    socket.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from the socket server");
    });

    socket.on("error", (error) => {
        console.error("Socket error:", error);
      });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [dispatch]);   
  return { socket, connected };
};

export default useSocket;