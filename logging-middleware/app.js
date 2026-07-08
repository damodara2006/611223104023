import express from "express";
import dotenv from "dotenv";
import { Log } from "./log.js";
const app = express()
dotenv.config();
let AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkYW1vZGFyYTIwMDZAZ21haWwuY29tIiwiZXhwIjoxNzgzNDk0ODI2LCJpYXQiOjE3ODM0OTM5MjYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4YTMwYzQwZS1lN2Y1LTQ0MGItOTAyYi04NDU1NGIzMjU2ZDEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJkYW1vZGFyYSBwcmFrYXNoIHAiLCJzdWIiOiIxZGE5MGMwMi01YTk4LTQ4ZTEtOWVmMy04YjYwMWI0YjBmYWEifSwiZW1haWwiOiJkYW1vZGFyYTIwMDZAZ21haWwuY29tIiwibmFtZSI6ImRhbW9kYXJhIHByYWthc2ggcCIsInJvbGxObyI6IjYxMTIyMzEwNDAyMyIsImFjY2Vzc0NvZGUiOiJ2VGF4dXIiLCJjbGllbnRJRCI6IjFkYTkwYzAyLTVhOTgtNDhlMS05ZWYzLThiNjAxYjRiMGZhYSIsImNsaWVudFNlY3JldCI6IkNqY2tNREhQWnlCbnNOd1IifQ.jd5tVcVipKvztyWV7GkUfuHc4N2qGBzi8DZwUl4UvGU"
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
                Authorization: `Bearer ${AUTH_TOKEN}`
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


app.get("/notifications/unread-count", async (req, res) => {
    await Log("backend", "debug", "handler", "GET unread count");

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`}
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const notifications = await response.json();

        const unreadCount = notifications.filter(
            notification => notification.isRead === false
        ).length;

        await Log(
            "backend",
            "info",
            "handler",
            "Unread count fetched successfully"
        );

        res.status(200).json({
            unreadCount
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "handler",
            error.message
        );

        res.status(500).json({
            message: error.message
        });
    }
});
app.listen(8000, () => {
    console.log("Backend is running on port 8000");
});