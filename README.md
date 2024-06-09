# Trips Backend

This is a simple backend project for managing trips and their locations using Node.js, Express, and Sequelize. This project allows users to create, update, retrieve, and delete trips, as well as submit locations associated with specific trips.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Models](#models)
- [Controllers](#controllers)
- [Routes](#routes)
- [Testing](#testing)
- [Running the Server](#running-the-server)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (version 14 or later)
- PostgreSQL database setup

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/trips-backend.git
   cd trips-backend
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   DATABASE_URL=your_database_url
   ```

4. Configure the database:
   Edit the `config/config.json` file to match your PostgreSQL database configuration:

   ```json
   {
     "development": {
       "username": "username",
       "password": "password",
       "database": "database-name",
       "host": "hostname",
       "dialect": "postgres"
     },
     "test": {
       "username": "username",
       "password": "password",
       "database": "database-name",
       "host": "hostname",
       "dialect": "postgres"
     },
     "production": {
       "username": "username",
       "password": "password",
       "database": "database-name",
       "host": "hostname",
       "dialect": "postgres"
     }
   }
   ```

5. Run database migrations:
   ```sh
   npx sequelize-cli db:migrate
   ```

## Usage

Start the development server:

```sh
npm run dev
```

The server will start on the port specified in the `.env` file (default is 3000).

## API Endpoints

### Trip Endpoints

- **Create Trip**

  - **URL:** `POST /trips`
  - **Description:** Creates a new trip.
  - **Body:** `{"status": "ongoing"}`

- **Get All Trips**

  - **URL:** `GET /trips`
  - **Description:** Retrieves all trips.

- **Get Trip by ID**

  - **URL:** `GET /trips/:id`
  - **Description:** Retrieves a trip by its ID.

- **Update Trip**

  - **URL:** `PUT /trips/:id`
  - **Description:** Updates a trip by its ID.
  - **Body:** `{"status": "completed"}`

- **Delete Trip**

  - **URL:** `DELETE /trips/:id`
  - **Description:** Deletes a trip by its ID.

- **Update Trip Status**
  - **URL:** `PATCH /trips/:id/status`
  - **Description:** Updates the status of a trip.
  - **Body:** `{"status": "completed"}`

### Location Endpoints

- **Submit Location**
  - **URL:** `POST /trips/:id/locations`
  - **Description:** Submits a location for a specific trip.
  - **Body:** `{"latitude": 12.34, "longitude": 56.78}`

## Project Structure

```sh
trips-backend/
├── config/
│   └── config.json
├── controllers/
│   ├── location.controller.js
│   └── trip.controller.js
├── models/
│   ├── index.js
│   ├── location.js
│   └── trip.js
├── routes/
│   ├── location.routes.js
│   └── trip.routes.js
├── tests/
│   ├── trip.test.js
│   └── location.test.js
├── mocks/
├── migrations/
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md

```

## Models

### Trip Model

- **Fields:**

  - `status` (STRING)

- **Associations:**
  - `Trip` has many `Location`

### Location Model

- **Fields:**

  - `tripId` (INTEGER)
  - `latitude` (FLOAT)
  - `longitude` (FLOAT)

- **Associations:**
  - `Location` belongs to `Trip`

## Controllers

### Location Controller

- **submitLocation:** Submits a location for a specific trip.

### Trip Controller

- **createTrip:** Creates a new trip.
- **getTrips:** Retrieves all trips.
- **getTrip:** Retrieves a trip by its ID.
- **updateTrip:** Updates a trip by its ID.
- **deleteTrip:** Deletes a trip by its ID.
- **updateTripStatus:** Updates the status of a trip.

## Routes

### Location Routes

- **POST /trips/:id/locations** - Calls `submitLocation` in the Location Controller.

### Trip Routes

- **POST /trips** - Calls `createTrip` in the Trip Controller.
- **GET /trips** - Calls `getTrips` in the Trip Controller.
- **GET /trips/:id** - Calls `getTrip` in the Trip Controller.
- **PUT /trips/:id** - Calls `updateTrip` in the Trip Controller.
- **DELETE /trips/:id** - Calls `deleteTrip` in the Trip Controller.
- **PATCH /trips/:id/status** - Calls `updateTripStatus` in the Trip Controller.

## Testing

To test the API endpoints, you can use a tool like Postman or write automated tests using a testing framework like Jest and Supertest.

### Using Postman

1. **Create Trip**

   - **Method:** POST
   - **URL:** `http://localhost:3000/trips`
   - **Body:** `{"status": "ongoing"}`
   - **Expected Response:**
     ```json
     {
       "id": 1,
       "status": "ongoing",
       "createdAt": "2024-06-08T12:34:56.789Z",
       "updatedAt": "2024-06-08T12:34:56.789Z"
     }
     ```

2. **Get All Trips**

   - **Method:** GET
   - **URL:** `http://localhost:3000/trips`
   - **Expected Response:**
     ```json
     [
       {
         "id": 1,
         "status": "ongoing",
         "createdAt": "2024-06-08T12:34:56.789Z",
         "updatedAt": "2024-06-08T12:34:56.789Z"
       }
     ]
     ```

3. **Get Trip by ID**

   - **Method:** GET
   - **URL:** `http://localhost:3000/trips/1`
   - **Expected Response:**
     ```json
     {
       "id": 1,
       "status": "ongoing",
       "createdAt": "2024-06-08T12:34:56.789Z",
       "updatedAt": "2024-06-08T12:34:56.789Z"
     }
     ```

4. **Update Trip**

   - **Method:** PUT
   - **URL:** `http://localhost:3000/trips/1`
   - **Body:** `{"status": "completed"}`
   - **Expected Response:**
     ```json
     {
       "id": 1,
       "status": "completed",
       "createdAt": "2024-06-08T12:34:56.789Z",
       "updatedAt": "2024-06-08T12:40:00.789Z"
     }
     ```

5. **Delete Trip**

   - **Method:** DELETE
   - **URL:** `http://localhost:3000/trips/1`
   - **Expected Response:** `204 No Content`

6. **Submit Location**

   - **Method:** POST
   - **URL:** `http://localhost:3000/trips/1/locations`
   - **Body:** `{"latitude": 12.34, "longitude": 56.78}`
   - **Expected Response:**
     ```json
     {
       "id": 1,
       "tripId": 1,
       "latitude": 12.34,
       "longitude": 56.78,
       "createdAt": "2024-06-08T12:45:00.789Z",
       "updatedAt": "2024-06-08T12:45:00.789Z"
     }
     ```
