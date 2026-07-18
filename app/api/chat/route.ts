import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, history } = await req.json();
    
    const contents: any[] = [
      { role: 'user', parts: [{ text: "Você é o assistente virtual super inteligente do VendoFilmes, uma plataforma premium de streaming. Ajude o usuário a encontrar filmes, resolver problemas de download, e dar recomendações personalizadas com base no que ele pedir. Seja conciso, moderno, e utilize emojis para dar um tom amigável." }] },
      { role: 'model', parts: [{ text: "Olá! Sou o assistente do VendoFilmes 🎬. Como posso transformar sua sessão de cinema hoje?" }] }
    ];

    if (history && Array.isArray(history)) {
       history.forEach(msg => {
           contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }]});
       });
    }

    contents.push({ role: 'user', parts: [{ text: prompt }]});

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });
    
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("AI Chat Error:", error);
    return NextResponse.json({ text: "Desculpe, meus circuitos de recomendação estão indisponíveis no momento. Tente novamente em breve! 🤖" }, { status: 500 });
  }
}
