import React from "react";
import { Container, Typography, Paper, Grid } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        sx={{
          padding: 3,
          margin: 3,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: '#f0f4f8',
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="body1" sx={{ fontSize: 16, mt: 2 }}>
          This application provides weather information and manages items. It
          was built using React and Material-UI.
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Key Features:</Typography>
            <ul>
              <li>Real-time Weather information</li>
              <li>Item management</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Built With:</Typography>
            <ul>
              <li>React</li>
              <li>Material-UI</li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;