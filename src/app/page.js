"use client";
import { useState } from "react"; // Import useState
import BgStar from "@/components/startbg/BgStar";
import Navbar from "@/components/Navbar/Navbar";
import MainHome from "@/components/Home/Mainhome";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "@/components/Footer/Footer";
import ProfilePopup from "@/components/aditprofle/ProfilePopup";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <Provider store={PumpStore}>
      <ShowHome />
    </Provider>
  );
};

const ShowHome = () => {
  // const [openProfilePopup, setOpenProfilePopup] = useState(false); // State for opening the popup

  // const handleOpen = () => setOpenProfilePopup(true); // Function to open the popup
  // const handleClose = () => setOpenProfilePopup(false); // Function to close the popup
  // const user = useSelector((state) => state.user.user);

  return (
      <ThemeProvider theme={theme}>
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
        <BgStar>
          <Navbar />
          <MainHome />
          <Footer />
        </BgStar>
      </ThemeProvider>
  );
};

export default Home;
