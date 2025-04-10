import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "./handler";

const app = express();
const port = 9090; // 서버 포트

app.use(cors({ origin: "http://localhost:9999", optionsSuccessStatus: 200, credentials: true }));
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
