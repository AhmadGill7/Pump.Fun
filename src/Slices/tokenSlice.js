import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTokens } from "@/reducerapis/apisToken";
// import io from "socket.io-client"; // Import Socket.io client

// let socket;


export const fetchTokenAsync = createAsyncThunk(
    "TokenSlice/fetchTokens",
    async (params) => {
        const { page, limit, ...otherParams } = params;
        const tokensResponse = await fetchTokens({
            page,
            limit,
            ...otherParams
        });
        return tokensResponse; // API response contains `data`, `totalPages`, `currentPage`, `totalTokens`
    }
);

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }


const INITIAL_STATE = {
    tokens: [],          // to store the tokens data
    status: "idle",      // track loading state
    error: null,         // store error message
    totalTokens: 0,      // total count of tokens
    totalPages: 0,       // total pages for pagination
      // current page being displayed
    shuffleKey: 0 ,
    currentPage: 1,   
    marcketCap:{
        to:'0k',
        from:'0k'
    },
    Volume:{
        to:'0k',
        from:'0k'
    }    
};

const TokenSlice = createSlice({
    name: "token",
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setPageSize(state, action) {
            state.pageSize = action.payload;
        },
        shuffleTokens(state) {
            state.tokens = shuffleArray(state.tokens);
            state.shuffleKey += 1; // Increment to trigger re-render
        },
        setTokens(state, action) {
            console.log(state,'reduxxx');
            
            state.tokens = action.payload;
          } ,
        marcketCapData : (oldData,NewData) => {
            oldData.marcketCap.to = NewData.payload.to + 'k'
            oldData.marcketCap.from = NewData.payload.from + 'k'

        },
        VOlumeData : (oldData,NewData) => {
            oldData.Volume.to = NewData.payload.to + 'k'
            oldData.Volume.from = NewData.payload.from + 'k'

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTokenAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTokenAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tokens = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalTokens = action.payload.totalTokens;
            })
            .addCase(fetchTokenAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { setCurrentPage, setPageSize, shuffleTokens,marcketCapData ,VOlumeData,setTokens} = TokenSlice.actions;

// export const initializeSocket = createAsyncThunk(
//     'tokens/initializeSocket',
//     async (_, { dispatch }) => {
//       if (!socket) {
//         const socket = io("http://localhost:3000", {
//             path: "./app/api/socket",
//             transports: ["websocket"],
//             credentials: true
//           });
//           socket.on('connect_error', (error) => {
//             console.error('Socket connection error:', error);
//           });
//         socket.on('connect', () => console.log('Socket connected successfully.'));
        
//         socket.on('tokens', (tokens) => {
//           dispatch(setTokens(tokens));
//         });
        
//       }
//     }
//   );

export default TokenSlice.reducer;
