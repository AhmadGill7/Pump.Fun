"use client";
import Navbar from "@/components/Navbar/Navbar";
import MainHome from "@/components/Home/Mainhome";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import Footer from "@/components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import PumpStore from "@/store/store";


const ShowHome = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Navbar />
      <MainHome />
    </ThemeProvider>
  );
};

const Home = () => {
  return (
    <Provider store={PumpStore}>
      <ShowHome />
    </Provider>
  );
};
export default Home;
