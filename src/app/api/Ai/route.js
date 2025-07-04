  import { GoogleGenerativeAI } from '@google/generative-ai';
  import { NextResponse } from 'next/server';

  export async function POST(req) {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
      const data = await req.json();
      const prePrompt = "Give a suitable answer if the following is relevant to product enquiries otherwise repond with 'I Cannot help you with that' : ";
      const prompt =  prePrompt+data.prompt;
         console.log(`Prompt: ${prompt}`);
      try {
          const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
          const result = await model.generateContent(prompt);
          const response =  result.response;
          const output =  response.text();
          return NextResponse.json({ output });
      } catch (error) {
          console.error(error);
          return NextResponse.json({ error: 'An error occurred while generating content' }, { status: 500 });
      }
  }
  
