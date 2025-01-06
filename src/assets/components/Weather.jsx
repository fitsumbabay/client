import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [background, setBackground] = useState("");
  const [unit, setUnit] = useState("metric"); 

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
    setError("");
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
            units: unit,
          },
        }
      );
      setWeatherData(response.data);
      setCity("");

    //  Change background based on weather conditions
            const condition = response.data.weather[0].main.toLowerCase();
            if (condition.includes("clear")) {
              setBackground("sunny");
            } else if (condition.includes("rain")) {
              setBackground("rainy");
            } else if (condition.includes("cloud")) {
              setBackground("cloudy");
            } else if (condition.includes("snow")) {
              setBackground("snowy");
            } else {
              setBackground("default");
            }
          } catch (error) {
            setError("An error occurred while fetching the weather data");
          }
        };

     
  

 const handleUnitChange = async (event, newUnit) => {
   if (newUnit) {
     setUnit(newUnit);
     if (weatherData) {
       try {
         const response = await axios.get(
           `https://api.openweathermap.org/data/2.5/weather`,
           {
             params: {
               q: weatherData.name, // Use the already fetched city name
               appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
               units: newUnit,
             },
           }
         );
         setWeatherData(response.data);
       } catch (error) {
         setError("An error occurred while updating the temperature unit");
       }
     }
   }
 };

 const backgroundStyles = {
   hot: {
     backgroundImage:
       "url('https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=600')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   warm: {
     backgroundImage:
       "url('https://images.pexels.com/photos/241756/pexels-photo-241756.jpeg?auto=compress&cs=tinysrgb&w=600')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   cold: {
     backgroundImage:
       "url('https://images.pexels.com/photos/376364/pexels-photo-376364.jpeg?auto=compress&cs=tinysrgb&w=600')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   sunny: {
     backgroundImage:
       "url('https://images.pexels.com/photos/1198507/pexels-photo-1198507.jpeg?auto=compress&cs=tinysrgb&w=600')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   rainy: {
     backgroundImage:
       "url('https://images.pexels.com/photos/3240914/pexels-photo-3240914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   cloudy: {
     backgroundImage:
       "url('https://images.pexels.com/photos/29989542/pexels-photo-29989542/free-photo-of-foggy-sunrise-over-meadow-in-limburg.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   snowy: {
     backgroundImage:
       "url('https://images.pexels.com/photos/754268/pexels-photo-754268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
     backgroundSize: "cover",
     backgroundPosition: "center",
   },
   default: {
     backgroundColor: "#f0f4f8",
   },
 };


  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        height: "100vh",
        ...backgroundStyles[background],
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "20px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "white" }}
        >
          Weather Information
        </Typography>
        <form onSubmit={fetchWeather} style={{ marginBottom: "20px" }}>
          <TextField
            label="Enter city name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            sx={{
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Get Weather
          </Button>
        </form>
        <ToggleButtonGroup
          value={unit}
          exclusive
          onChange={handleUnitChange}
          aria-label="temperature unit"
          sx={{ display: "flex", justifyContent: "center", mb: 2 }}
        >
          <ToggleButton
            value="metric"
            aria-label="Celsius"
            sx={{
              backgroundColor: unit === "metric" ? "cyan" : "white", 
              color: unit === "metric" ? "white" : "black", 
              "&:hover": {
                backgroundColor:
                  unit === "metric" ? "deepskyblue" : "lightgray",
              },
            }}
          >
            Celsius
          </ToggleButton>
         <ToggleButton 
    value="imperial" 
    aria-label="Fahrenheit" 
    sx={{ 
      backgroundColor: unit === 'imperial' ? 'orange' : 'white', 
      color: unit === 'imperial' ? 'white' : 'black', 
      '&:hover': {
        backgroundColor: unit === 'imperial' ? 'darkorange' : 'lightgray', 
      },
    }}
  >
    Fahrenheit
  </ToggleButton>
</ToggleButtonGroup>

        {error && <Alert severity="error">{error}</Alert>}
        {weatherData && (
          <Paper
            sx={{ padding: 2, marginTop: 2, textAlign: "center" }}
            elevation={3}
          >
            <Typography variant="h6">{weatherData.name}</Typography>
            <Typography variant="h4">
              {Math.round(weatherData.main.temp)}{" "}
              {unit === "metric" ? "°C" : "°F"}
            </Typography>
            <Typography>{weatherData.weather[0].description}</Typography>
          </Paper>
        )}
      </div>
    </Container>
  );
};

export default Weather;
