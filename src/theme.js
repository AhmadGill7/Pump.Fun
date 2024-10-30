import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
  palette: {
    primary: {
      main: "#08339c",
    },
    notification: {
      main: "#FF0000",
    },
    checkBox: {
      main: "#1E1E2D",
    },
  },
  fontFamily: ['Inter, sans-serif'].join(","),
  typography: {
    h1: {
      fontFamily: ['Inter, sans-serif'].join(","),
      color: "#fff",
      fontSize: " 3rem",
      textTransform: "capitalize",
      lineHeight: 1.067,
      fontWeight: 700,
      "@media (max-width:800px)": {
        fontSize: "2rem",
      },
    },
    h2: {
      fontFamily: ['Inter, sans-serif'].join(","),
      color: "#fff",
      fontSize: " 2rem",
      textTransform: "default",
      lineHeight: 2.067,
      fontWeight: 700,
      // letterSpacing: "-0.00833em",
      "@media (max-width:800px)": {
        fontSize: "1.5rem",
        lineHeight: 1.067,
      },
    },
    h3: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 700,
      color: "#fff",
      fontSize: "1.333rem",
      // lineHeight: 1,
      // lineHeight: 1.9,
      letterSpacing: "0em",
      "@media (max-width:800px)": {
        fontSize: "1rem",
      },
    },
    h4: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 500,
      color: "#fff",
      fontSize: "1rem",
      lineHeight: 1.807,
      letterSpacing: "0em",
      "@media (max-width:800px)": {
        fontSize: "0.8588rem",
      },
    },
    h5: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#fff",
      fontSize: "1.125rem",
      lineHeight: 1.318,
      letterSpacing: "0em",
      "@media (max-width:800px)": {
        fontSize: "14px",
      },
    },
    h6: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#fff",
      fontSize: "14px",
      lineHeight: 1.025,
      letterSpacing: "0.0075em",
    },
    h7: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#fff",
      fontSize: "1.5rem",
      lineHeight: 1.025,
      letterSpacing: "0.0075em",
      "@media (max-width:800px)": {
        fontSize: "1.1rem",
      },
    },
    subtitle1: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 500,
      color: "#fff",
      textTransform: "capitalize",
      fontSize: "1.375rem",
      lineHeight: 1.15,
      letterSpacing: "0.00938em",
      "@media (max-width:800px)": {
        fontSize: "1.2rem",
      },
    },

    subtitle2: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#495FCA",
      fontSize: "1rem",
      lineHeight: 1,
      letterSpacing: "0.00714em",
      "@media (max-width:800px)": {
        fontSize: "0.7rem",
      },
    },
    body1: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 500,
      color: "#fff",
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.00938em",
    },
    body2: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 500,
      color: "#fff",
      fontSize: "14px",
      lineHeight: 1.43,
      letterSpacing: "0.01071em",
      "@media (max-width:800px)": {
        fontSize: "0.775rem",
      },
    },
    button: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#000",
      fontSize: "0.875rem",
      lineHeight: 1.75,
      letterSpacing: "0.02857em",
      textTransform: "uppercase",
    },
    caption: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#000",
      fontSize: "0.75rem",
      lineHeight: 1.66,
      letterSpacing: "0.03333em",
    },
    overline: {
      fontFamily: ['Inter, sans-serif'].join(","),
      fontWeight: 400,
      color: "#000",
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
});