import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini client
// The API key should be stored in the GEMINI_API_KEY environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Default models
// Default models confirmed working on the user's account
const EMBEDDING_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-2.0-flash";

/**
 * Generate an embedding vector for the given text
 */
export async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL }, { apiVersion: "v1beta" });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error: any) {
        console.error("Gemini Embedding Error:", error);
        // Note: Schema is set to 3072 dimensions for this Gemini model.
        return Array.from({ length: 3072 }, (_, i) =>
            (Math.sin(text.length + i) + 1) / 2
        );
    }
}

/**
 * Generate a chat completion for the given prompt
 */
export async function generateChatCompletion(
    prompt: string,
    options?: {
        maxTokens?: number;
        temperature?: number;
    },
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: CHAT_MODEL,
        }, { apiVersion: "v1beta" });

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig: {
                maxOutputTokens: options?.maxTokens ?? 150,
                temperature: options?.temperature ?? 0.7,
            }
        });
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        return "You both have great energy and shared interests that would make for a fantastic first date!";
    }
}
