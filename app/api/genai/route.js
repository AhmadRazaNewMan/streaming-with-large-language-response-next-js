import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req, res) {
    try {
        const reqBody = await req.json();
        console.log(reqBody);
        const prompt = reqBody.data.prompt;

        const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
        const streamingResponse = await model.generateContentStream(prompt);

        return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
    } catch (error) {
        console.error("Error in POST /api/genai:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
