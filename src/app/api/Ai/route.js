import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';


export async function POST(req) {
    const genAI = new GoogleGenerativeAI("AIzaSyBjgc6ur1iko7Ii8WIXOCFhNiRhtqB2oU4");
    const data = await req.json();
    const prePrompt = "Give a suitable answer if the following is relevant to product enquiries otherwise repond with 'I Cannot help you with that' : ";
    const prompt = data.prompt;
    const aiPrompt = `
You are an assistant that generates a list of required ingredients or items based on the user's task description. 

Your output must be:
- A plain text list
- Each item on a new line
- No extra explanation or formatting
- Only the list

Example:
Noodles
Water
Salt
Vegetables
Oil
Soy Sauce

User Task: ${prompt}
`;

    console.log(`Prompt: ${prompt}`);

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
        });
        const result = await model.generateContent(`List the required items needed to accomplish this task: ${aiPrompt}`);
        const response = result.response;
        const output = response.text();

        let cleanedText = output
            .split('\n')
            .map(line => line.replace(/^[\d\.\-\*]\s*/, '').trim())
            .filter(line => line.length > 0)
            .join('\n');

        // Return as plain text list

        console.log(`Output: ${cleanedText}`);
        return NextResponse.json({ cleanedText });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while generating content' }, { status: 500 });
    }
}



