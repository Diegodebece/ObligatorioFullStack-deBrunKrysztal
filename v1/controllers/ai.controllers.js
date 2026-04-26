import { useGemini25Flash as useGemini25FlashService } from "../services/gemini.services.js";

export const getModels = (req, res) => {
    res.json({ message: 'List of AI models' });
};

export const useGemini25Flash = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        const resultText = await useGemini25FlashService(prompt);

        if (!resultText) {
            return res.status(500).json({ message: 'No response received from Gemini' });
        }

        res.json({
            message: 'Gemini 2.5 Flash response',
            final: resultText
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while using Gemini 2.5 Flash model' });
    }
};