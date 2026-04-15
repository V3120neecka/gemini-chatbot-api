const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");
require('dotenv').config();

// Inisialisasi Google AI dengan API Key dari .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Gunakan model 'gemini-1.5-flash' yang terbaru
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Memori untuk menyimpan riwayat percakapan agar nyambung
let chatSession = model.startChat({
  history: [],
  generationConfig: {
    maxOutputTokens: 1000,
  },
});

async function askJimbo() {
  rl.question("\n[User]: ", async (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("[Jimbo]: Dadah! Sampai jumpa lagi.");
      rl.close();
      process.exit();
    }

    try {
      console.log("Jimbo sedang berpikir...");
      
      // Mengirim pesan ke sesi chat yang sedang berjalan (memory aktif)
      const result = await chatSession.sendMessage(userInput);
      const response = await result.response;
      const text = response.text();

      console.log("\n[Jimbo]:", text);

    } catch (error) {
      console.error("\n[Error]: Waduh, sepertinya ada masalah koneksi.");
      console.error("Detail:", error.message);
      console.log("Tips: Pastikan API Key di .env sudah benar.");
    }

    // Tanya lagi (looping)
    askJimbo();
  });
}
console.log("--- Chatbot Jimbo Aktif (Mode Memory) ---");
console.log("Ketik 'exit' untuk berhenti.");
askJimbo(); // Pastikan namanya askJimbo, bukan bo()
