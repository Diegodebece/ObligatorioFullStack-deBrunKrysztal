import axios from "axios";

export const getModels = (req, res) => {
    res.json({ message: 'List of AI models' });
};

export const useGemini25Flash = async (prompt) => {
    const API_KEY = process.env.GEMINI_25_API_KEY;
    const MODEL = 'gemini-2.5-flash';
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

    const headers = {
        'Content-Type': 'application/json',
        'x-goog-api-key': API_KEY
    };

    const body = {
        contents: [
            { parts: [{ text: prompt }] }
        ]
    };

    const response = await axios.post(ENDPOINT, body, { headers });
    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
};