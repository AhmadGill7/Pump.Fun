// /src/app/api/socket/route.js

import { Server } from "socket.io";
import { NextResponse } from "next/server";
import Token from "@/Model/Tokens";

let io;

export async function GET(req) {
  try {
    const server = req.socket?.server;  // Ensure this is pointing to the correct server instance

    if (!server) {
      return NextResponse.json({ error: "Server is not available" }, { status: 500 });
    }

    if (!server.io) {
      console.log("Initializing Socket.IO...");

      io = new Server(server, {
        path: "/api/socket",  // Ensure this path is correct
        transports: ["polling", "websocket"], // Allow both polling and websocket
      });
      
      server.io = io;

      io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("getTokens", async () => {
          try {
            const tokens = await Token.find({});
            socket.emit("newToken", tokens);  // Send tokens to the client
          } catch (error) {
            console.error("Error fetching tokens:", error);
            socket.emit("error", { message: "Failed to fetch tokens" });
          }
        });

        socket.on("disconnect", () => {
          console.log("User disconnected:", socket.id);
        });
      });
    } else {
      console.log("Socket.IO server already initialized.");
    }

    return NextResponse.json({ message: "Socket.IO server is running" });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// import { Server } from "socket.io";
// import Token from "@/Model/Tokens";

// // Handle GET requests
// export async function GET(req, res) {
//   if (!res.socket.server.io) {
//     console.log("Initializing Socket.IO...");

//     // Initialize Socket.IO on the server
//     const io = new Server(res.socket.server, {
//       path: "/api/socket", // Set the path for the socket connection
//       transports: ['websocket'],

//     });

//     // Store the io instance on the server object to avoid re-initialization
//     res.socket.server.io = io;

//     // Event listener for when a client connects
//     io.on("connection", async (socket) => {
//       console.log("A user connected:", socket.id);

//       try {
//         const tokens = await Token.find({}); // Fetch tokens from the database
//         socket.emit("newToken", tokens); // Emit tokens to the client
//       } catch (error) {
//         console.error("Error fetching tokens:", error);
//       }

//       socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//       });
//     });
//   } else {
//     console.log("Socket.IO server already initialized.");
//   }

//   res.status(200).json({ message: "Socket.IO server is running" }); // Respond with success message
// }

// // server.js
// import { createServer } from 'http';
// import next from 'next';
// import { Server } from 'socket.io';
// import Token from "@/Model/Tokens";

// const dev = process.env.NODE_ENV !== 'production';
// const hostname = 'localhost';
// const port = 3000;
// const app = next({ dev, hostname, port });
// const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server(httpServer, {
//     path: '/api/socket',
//     cors: {
//       origin: "http://localhost:3000", // Replace with your client URL if needed
//       methods: ["GET", "POST"],
//       credentials: true // Include credentials if your setup requires them
//     }
//   });
//   io.on('connection', async (socket) => {
//     console.log('A user connected');

//     // Emit token data on new connection if necessary
//     try {
//             const tokens = await Token.find({});
//             socket.emit("newToken", tokens);
//           } catch (error) {
//             console.error("Error fetching tokens:", error);
//           }

//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

//   httpServer.listen(port, () => {
//     console.log(`> Ready on http://${hostname}:${port}`);
//   });
// });

// // pages/api/socket.js

// import { Server } from "socket.io";
// import Token from "@/Model/Tokens";

// // Create a handler for the API route
// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js body parsing to allow socket.io to work
//   },
// };

// const handler = (req, res) => {
//   if (req.method === "GET") {
//     res.status(200).json({ message: "Socket server running" });
//   }
// };

// export default (req, res) => {
//   if (res.socket.server.io) {
//     console.log("Socket is already set up");
//     return res.end();
//   }

//   console.log("Setting up Socket.IO server...");
//   const io = new Server(res.socket.server, {
//     path: "/api/socket", // You can customize the path if needed
//     addTrailingSlash: false, // Make sure the path matches on both client and server sides
//   });

//   io.on("connection", async (socket) => {
//     console.log("A user connected", socket.id);

//     try {
//       const tokens = await Token.find({});
//       socket.emit("newToken", tokens);
//     } catch (error) {
//       console.error("Error fetching tokens:", error);
//     }

//     socket.on("disconnect", () => {
//       console.log("A user dissconnected", socket.id);
//     });

//     // Handle custom events
//   });

//   res.socket.server.io = io;
//   res.end();
// };

// // pages/api/socket.js
// import { Server } from 'socket.io';
// import Token from "@/Model/Tokens"; // Make sure the path to your model is correct

// export default async function SocketHandler(req, res) {
//   if (!res.socket.server.io) {
//     const io = new Server(res.socket.server, {
//       path: "/api/socket",
//       cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//       },
//       transports: ['websocket'],
//     });

//     res.socket.server.io = io;

//     io.on('connection', async (socket) => {
//       console.log('New client connected');

//       try {
//         const tokens = await Token.find({});
//         socket.emit('newToken', tokens);
//       } catch (error) {
//         console.error('Error fetching tokens:', error);
//       }

//       socket.on('disconnect', () => {
//         console.log('Client disconnected');
//       });
//     });
//   }
//   res.end();
// }
