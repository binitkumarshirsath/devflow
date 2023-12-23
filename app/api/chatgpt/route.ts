import console from "console";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { question } = await req.json();
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "you are a knowledgeable assistant which provides quality solutions with code snippets",
          },
          {
            role: "user",
            content: `Tell me ${question}`,
          },
        ],
      }),
    });

    const responseData = await response.json();

    const reply = responseData?.choices[0]?.message?.content;
    return NextResponse.json(reply);
  } catch (err) {
    console.error("Error whole posting question", err);
    return NextResponse.json(err, { status: 500 });
  }
};
