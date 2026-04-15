require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Log ini untuk memastikan API Key terbaca (Hanya untuk tes)
console.log("Mengecek API Key...");
if (!process.env.GEMINI_API_KEY) {
    console.error("Error: API Key tidak ditemukan di file .env!");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runChat() {
    try {
        // Kita pakai gemini-1.5-flash lagi karena ini yang paling baru
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Halo, jika kamu membaca ini artinya chatbot saya berhasil!";

        console.log("Sedang memanggil AI...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        console.log("--- BERHASIL! ---");
        console.log("Respon AI:", response.text());
        console.log("-----------------");
    } catch (error) {
        console.error("Error Detail:", error.message);
    }
}

runChat();