const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

// GENERATE ROUTE
app.post("/generate", async (req, res) => {

    try {

        const { email, tone } = req.body;

        if (!email) {
            return res.json({ error: "Email is required" });
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                contents: [{
                    parts: [{
                        text: `Write a ${tone} professional email reply with subject line.

Email:
${email}`
                    }]
                }]
            }
        );

        const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
        contents: [{
            parts: [{
                text: `Write a ${tone} professional email reply with subject line.

Email:
${email}`
            }]
        }]
    }
);

// ✅ FIX HERE 👇
const reply =
response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

res.json({ reply });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            error: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});