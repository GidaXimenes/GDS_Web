const { GoogleGenerativeAI } = require("@google/generative-ai");

// Função para fazer a requisição à API do Google Gemini
async function callGeminiAPI(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    try {
        // Obtém o modelo
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Envia o prompt
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text(); // Obtém o texto da resposta

        return text; // Retorna a resposta da API
    } catch (error) {
        console.error("Erro na requisição para o Google Gemini:", error);
        throw error;
    }
}

module.exports = { callGeminiAPI };
