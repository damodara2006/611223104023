import express from "express";
import dotenv from "dotenv";
import { Log } from "./log.js";

dotenv.config();

const app = express();
app.use(express.json());

const url = "http://4.224.186.213/evaluation-service/notifications";

app.get("/notifications", async (req, res) => {
    await Log(
        "backend",
        "debug",
        "handler",
        "Testing the /notifications endpoint"
    );

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`
                // Or paste your token here while testing
            }
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        await Log(
            "backend",
            "info",
            "handler",
            "/notifications fetched successfully"
        );

        res.status(200).json(data);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "handler",
            error.message
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(8000, () => {
    console.log("Backend is running on port 8000");
});