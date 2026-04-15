const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");
require('dotenv').config();

// Inisialisasi
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GUNAKAN MODEL INI (Versi paling stabil untuk v1beta)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let chatSession = model.startChat({
    history: [],
});

async function askJimbo() {
    rl.question("\n[User]: ", async (userInput) => {
        if (userInput.toLowerCase() === 'exit') {
            rl.close();
            return;
        }

        try {
            console.log("Jimbo sedang berpikir...");
            const result = await chatSession.sendMessage(userInput);
            const response = await result.response;
            console.log("[Jimbo]:", response.text());
        } catch (error) {
            console.error("\n[Error]: Waduh, sepertinya ada masalah koneksi.");
            console.error("Detail:", error.message);
        }
        askJimbo();
    });
}

console.log("--- Chatbot Jimbo Aktif (Mode Memory) ---");
console.log("Ketik 'exit' untuk berhenti.");
askJimbo();