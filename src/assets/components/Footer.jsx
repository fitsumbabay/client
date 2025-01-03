import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#f1f1f1",
        padding: "10px 0",
        position: "fixed",
        bottom: 0,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} My Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
