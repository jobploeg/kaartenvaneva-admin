import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: prompt,
      temperature: 0.8,
      max_tokens: 256,
    });

    // Extract the generated message from the response
    const generatedMessage = response.choices[0].message.content;

    // Create a new Response object with the generated message
    const httpResponse = new Response(
      JSON.stringify({ message: generatedMessage }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );

    return httpResponse;
  } catch (e) {
    return new Response(e, {
      status: 400,
    });
  }
}
