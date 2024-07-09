
## PayNode

Welcome to the **PayNode** - A Platform for online monetary payment

### Backend Setup

To get the backend server up and running, please follow these steps:

1. Optionally, you can run the following command to install backend dependencies:

    ```bash
    npm install
    ```

2. Navigate to the backend directory:

    ```bash
    cd server
    npm install
    ```

3. In the backend directory, you'll find an `env.example` file. Duplicate this file and rename it to `.env`.

4. Open the `.env` file and populate it with the required environment variables:

    ```plaintext
    JWT_SECRET=//YourSecretKeyHere
    MONGODB_URL=//YourMongoDBURLHere
    ```

    Replace `//YourSecretKeyHere` with your chosen secret key for JWT (JSON Web Tokens) and `//YourMongoDBURLHere` with your MongoDB connection URL.

5. Save the `.env` file.

6. Start the server by running the following command:

    ```bash
    node index.js
    ```

    Once launched successfully, you should see the following output in your terminal:

    ```vbnet
    App listening on port 8080
    Database connected
    ```

### Frontend Setup

To begin with the frontend application, follow these steps:

1. Navigate to the frontend directory:

    ```bash
    cd client
    npm install
    ```

2. Run the following command to start the application:

    ```bash
    npm run dev
    ```

    This command will initiate the frontend application.
