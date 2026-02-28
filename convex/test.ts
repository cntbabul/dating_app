import { action } from "./_generated/server";
import { generateChatCompletion, generateEmbedding } from "./lib/gemini";

export const testGemini = action({
    args: {},
    handler: async () => {
        try {
            const chat = await generateChatCompletion("Hello, are you there?");
            console.log("Chat result:", chat);

            const embedding = await generateEmbedding("Test text");
            console.log("Embedding result length:", embedding.length);

            return { chat, embeddingLength: embedding.length };
        } catch (e) {
            console.error("Test failed:", e);
            throw e;
        }
    }
});
