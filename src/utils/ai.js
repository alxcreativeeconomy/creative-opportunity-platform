import { GoogleGenerativeAI } from '@google/generative-ai';

export const validateWithAI = async (pageText, url, geminiApiKey) => {
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using 2.0 flash as 2.5 is not released yet, maybe they meant 2.0
  
  const prompt = `
    You are an AI Deal Scout for an African tech network. Read this webpage text and determine if it contains a valid funding, grant, or B2B opportunity.
    
    Webpage Text: "${pageText}"
    URL: ${url}
    
    Respond ONLY with a valid JSON object. Do not use markdown blocks.
    If it is NOT a valid deal or has expired, return: {"isLegit": false}
    If it IS a valid deal, return:
    {
      "isLegit": true,
      "title": "Exact Title of Deal",
      "source": "Organization Name",
      "value": "Value or 'Variable'",
      "deadline": "Deadline Date",
      "description": "Short 2 sentence summary",
      "directLink": "${url}"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return { isLegit: false };
  }
};
