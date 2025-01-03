import React from "react";
import { Container, Typography, Paper, TextField, Button } from "@mui/material";

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        sx={{
          padding: 3,
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#f0f4f8",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          For any inquiries, please email us at{" "}
          <strong>fitsum@example.com</strong>.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Alternatively, you can fill out the form below:
        </Typography>
        <form>
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Message
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;