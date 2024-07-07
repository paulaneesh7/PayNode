import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { router as payRouter } from "./routes/index.route.js";
import cors from "cors";

const server = express();

const { PORT, MONGO_URL, CLIENT_URL } = process.env;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log(`Database connected`);
}

server.use(express.json());
server.use(
  cors({
    origin: CLIENT_URL, // specify the origin for CORS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the methods for CORS
    credentials: true, // this allows session cookies to be sent with requests
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  })
);
server.use("/api/v1", payRouter);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
