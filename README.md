# Cruxlog Backend

This repository contains the backend for Cruxlog, a workout logger designed for rock climbers. The backend is built with **Next.js**, utilizing the **App Router** for dynamic routing, **Drizzle ORM** for database interaction, and **PostgreSQL** for data storage. Cruxlog enables climbers to log and track their workouts, including bouldering, routes, and top rope climbing sessions.

## Features

- **Dynamic Routing**: Routes are dynamically generated for user IDs and climb IDs, enabling personalized and scalable endpoints.
- **Drizzle ORM**: Simplifies database interactions with a type-safe and developer-friendly interface.
- **PostgreSQL Database**: Provides a robust and scalable relational database for storing workout logs and user data.
- **Next.js App Router**: Modern routing approach with file-based routing, server-side rendering, and API routes.
- **Workout Logger**: Users can log their climbing activities, including:
  - **Boulders**
  - **Routes**
  - **Top Rope**
- **Authentication**: Supports user-specific data access to ensure secure logging and data management using **Clerk JWT** for authentication.

## Tech Stack

- **Framework**: Next.js
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Routing**: App Router with dynamic user and climb ID routes
- **Authentication**: Clerk JWT

## Installation and Setup

### Prerequisites

- Node.js (>= 16.x)
- PostgreSQL
- Yarn or npm

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/cruxlog-backend.git
   cd cruxlog-backend
   ```

2. **Install Dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and configure the following variables:

   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-publishable-key>
   CLERK_SECRET_KEY=<your-secret-key>
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   AWS_S3_REGION=<your-aws-region>
   AWS_S3_ACCESS_KEY_ID=<your-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   AWS_S3_BUCKET_NAME=<your-bucket-name>
   ```

4. **Run Database Migrations**

   Use Drizzle ORM to set up the database schema:

   ```bash
   yarn db:migrate
   # or
   npm run db:migrate
   ```

5. **Start the Development Server**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   The server will run at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Users

- `GET /api/users`: Retrieve all users.
- `GET /api/users/[userId]`: Retrieve a specific user by ID.

### Climbs

- `GET /api/users/[userId]/climbs`: Retrieve all climbs for a user.
- `GET /api/users/[userId]/climbs/[climbId]`: Retrieve a specific climb by ID.
- `POST /api/users/[userId]/climbs`: Add a new climb.
- `PUT /api/users/[userId]/climbs/[climbId]`: Update an existing climb.
- `DELETE /api/users/[userId]/climbs/[climbId]`: Delete a climb.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- Built with the support of the rock climbing community.
- Powered by Next.js, Drizzle ORM, PostgreSQL, and Clerk.

