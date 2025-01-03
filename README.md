# React + Vite


      Weather Item Frontend App
An application that displays the current weather for any given city and allows users to manage a list of items with names, descriptions, and prices. The app features a visually appealing design and provides an intuitive interface for both weather information and item management.

      Features
-View current weather conditions based on city input.
-Add, edit, and delete items with names, descriptions, and prices.
-Dynamic background images that relate to the current weather conditions.
-Responsive design for optimal viewing on different devices.
-User authentication with JWT (JSON Web Tokens) for secure login and user sessions.
- Manage user-specific items, ensuring each user sees only their own list.


       # Technologies Used
*React*: A JavaScript library for building user interfaces.
*Vite*: A build tool that provides a faster and leaner development experience for modern web projects.
*Material UI*: A popular React UI framework for implementing Material Design, used for styling the application.
*OpenWeatherMap API*: Used to fetch current weather data based on user input.
*Axios*: For making HTTP requests to the backend API.
*MongoDB*: A NoSQL database used to store the list of items.
*JWT Authentication*: For securely managing user sessions and protecting routes.

        Setup and Run Locally
   -Prerequisites
*Node.js* (version 12 or later)
*npm* (Node package manager) or yarn
*MongoDB* (local or cloud instance)

 ## Live Site
 *front-end Live site*:

 *back-end Live site*:


      *Backend Setup*
1.Clone the repository:
   git clone https://github.com/fitsumbabay/back-end

2.Navigate to the backend directory:
   cd back-end
3.Install dependencies:
   npm install
4.Set up environment variables:
   MONGODB_URI=your_mongodb_connection_string
5.Start the backend server:
   npm start
  The backend server should now be running on http://localhost:5000.


  
   *Frontend Setup*
1.Clone the repository:
   git clone https://github.com/fitsumbabay/client
2.Navigate to the frontend directory:
  cd ../client/
3.Install dependencies:
  npm install
4.Set up environment variables:
  VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key
5.Start the frontend development server:
  npm run dev
  The frontend server should now be running on http://localhost:5173


    # Frontend Functionality
*Weather Component*
Allows users to enter a city name and fetch current weather conditions using the OpenWeatherMap API.

*ItemManager Component*
-Users can add, update, and delete items from their personal list.
-Each item includes a name, description, and price.
-The list of items is specific to each user, ensuring privacy and organization

*User Authentication*
-Users can create an account and log in using JWT.
-Secure user sessions are maintained using JWT tokens.
-Logged-in users have access to their own list of items.

*How the Frontend Interacts with the Backend API*
 -The frontend communicates with the backend API to manage the list of items and user authentication.
 -The backend API is expected to be running at http://localhost:5000.


  API Endpoints
*GET /api/items*: Fetches all items.
*POST /api/items*: Adds a new item.
*PUT /api/items/:id*: Updates an existing item.
*DELETE /api/items/:id*: Deletes an item.

    Authentication Endpoints
*POST /api/auth/register*: Registers a new user.
*POST /api/auth/login*: Logs in an existing user and returns a JWT token for the session.

 Interactions
-*Fetching Items*: The frontend sends a GET request to http://localhost:5000/api/items to fetch the list of items.

-*Adding an Item*: When a user adds a new item, the frontend sends a POST request to http://localhost:5000/api/items with the item data.

-*Updating an Item*: When a user updates an item, the frontend sends a PUT request to http://localhost:5000/api/items/:id with the updated item data.

-*Deleting an Item*: When a user deletes an item, the frontend sends a DELETE request to http://localhost:5000/api/items/:id.