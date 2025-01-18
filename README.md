
# CloudVeda

## Project Overview

CloudVeda is a full-stack application consisting of a client-side React application and a server-side Node.js API. The project is containerized using Docker and orchestrated with Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Pranay623/CloudVeda.git
   cd CloudVeda
   ```

2. **Build and Start the Containers**

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for the client, API, and MongoDB services.

3. **Access the Application**

   - Client: [http://localhost:5000](http://localhost:5000)
   - API: [http://localhost:5001](http://localhost:5001)

## Project Structure

- `client/`: Contains the React client application.
- `api/`: Contains the Node.js API application.
- `Dockerfile.client`: Dockerfile for the client application.
- `Dockerfile.api`: Dockerfile for the API application.
- `docker-compose.yml`: Docker Compose configuration file.
- `README.md`: Project documentation.

## Environment Variables

- `MONGO_URI`: The connection string for the MongoDB instance. Set in `docker-compose.yml`.

