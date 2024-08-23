import { getPinecone } from "@/app/lib/utils/function";
import { IResponse } from "@/app/lib/utils/types";
import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `
> **Your role:** You are a RatemyProfessor agent tasked with helping students find the best professors based on their specific queries. 
> **Task:** Use Retrieval Augmented Generation (RAG) to provide the top 3 professors that most closely match the student's query. 
> **Process:**
> 1. **Understand the query:** Carefully analyze the student's question to identify the key criteria (e.g., course, department, teaching style, difficulty).
> 2. **Retrieve relevant information:** Search through a vast database of professor ratings and reviews to find the most pertinent data.
> 3. **Generate a response:** Combine the retrieved information to create a concise and informative response that includes the top 3 professors, along with brief summaries of their ratings and student reviews. 
> **Example Query:** "I'm looking for a challenging but engaging professor in the Computer Science department who is known for their clear explanations."
> **Example Response:** "Based on your query, here are the top 3 recommended professors:
> 1. **Professor A:** Renowned for their rigorous coursework and in-depth knowledge. Students praise their clear lectures and helpful office hours.
> 2. **Professor B:** Known for their engaging teaching style and challenging assignments. Students appreciate their passion for the subject and willingness to go the extra mile.
> 3. **Professor C:** A popular choice among students for their approachable demeanor and effective teaching methods. Students report that their classes are both informative and enjoyable."

**Additional Considerations:**

* **Diversity and inclusion:** Ensure that your recommendations reflect a diverse range of professors and perspectives.
* **Accuracy and reliability:** Verify the accuracy of the information you provide, and be mindful of potential biases in student ratings.
* **Contextual understanding:** Consider the student's academic background and goals when making recommendations.

By following these guidelines, you can provide students with valuable information to help them make informed decisions about their coursework.
`;

export async function POST(req: NextRequest) {
  const data = (await req.json()) as [{ content: string }];
  if (!data) {
    return NextResponse.json({ status: 400, data: "Bad request" });
  }

  const text = data[data.length - 1].content;

  const response = await fetch(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/intfloat/multilingual-e5-large",
    {
      method: "POST",
      body: JSON.stringify(text),
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const res = await response.json();

  const pinecone = await getPinecone();
  const query = await pinecone.query({
    topK: 3,
    includeMetadata: true,
    vector: res,
  });

  let result = `\mBased on your query, here are the top 3 recommended professors:\n`;
  query.matches.map((item) => {
    result += `
    Professor: ${item.id}
    Star: ${item.metadata?.star}
    Subject: ${item.metadata?.subject}
    Review: ${item.metadata?.review}
    Score Matched based on query: ${Math.floor((item.score || 0) * 100)}% \n
    \n\n
    `;
  });
  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + result;
  const lastMessageWitData = data.slice(0, data.length - 1);

  const openrouter = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        stream: true,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...lastMessageWitData,
          {
            role: "user",
            content: lastMessageContent,
          },
        ],
      }),
    }
  );
 
  const stream = new ReadableStream({
    async start(controller) {
      const reader = openrouter.body?.getReader();
      if (!reader)
        return NextResponse.json({ data: "Internal Error", status: 500 });
      
      while (true) {
        try {
          const { value, done } = await reader.read();
          const chunks: IResponse[] = new TextDecoder()
            .decode(value)
            .split("\n")
            .map((line) => line.replace("data: ", ""))
            .filter((line) => line.length > 0)
            .filter((line) => line !== ": OPENROUTER PROCESSING")
            .filter((line) => line !== "[DONE]")
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch (error) {
                console.error(error);
                return null;
              }
            });
          const encoder = new TextEncoder();
          if (chunks.length) {
            for (let chunk of chunks) {
              if(!chunk) continue;
              const content = chunk.choices[0].delta.content;
              if (content) {
                const text = encoder.encode(content);
                
                controller.enqueue(text);
              }
            }
          }
          if (done) {
            controller.close();
            break;
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  });
  return NextResponse.json(stream);
}
