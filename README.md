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
- [Running the Server](#running-the-server)
- [License](#license)

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

4. Run database migrations:
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
├── migrations/
├── .env
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

## Running the Server

To run the server in development mode:

```sh
npm run dev
```

The server will start and listen for incoming requests on the port specified in the `.env` file.

## License

This project is licensed under the ISC License.