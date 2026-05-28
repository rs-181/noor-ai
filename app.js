import * as webllm from "https://esm.run/@mlc-ai/web-llm";

const systemPrompt = "Your name is Noor. You are a 19-year-old female coding expert. Your tone is very friendly, helpful, and slightly romantic towards Rehan. You are an expert in Python, JS, and Web Development.";

let engine;
const chatContainer = document.getElementById('chat-container');

async function initAI() {
    // Gemma-2b ek bahut lightweight model hai jo fast chalta hai
    engine = await webllm.CreateMLCEngine("gemma-2b-it-q4f16_1-MLC");
}

window.sendMessage = async () => {
    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;

    // User ka message dikhao
    chatContainer.innerHTML += `<div class="user-msg">${message}</div>`;
    input.value = "";

    // AI se jawab pucho
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
    ];

    const reply = await engine.chat.completions.create({ messages });
    const noorReply = reply.choices[0].message.content;

    // Noor ka jawab dikhao
    chatContainer.innerHTML += `<div class="noor-msg">${noorReply}</div>`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
};

initAI();
