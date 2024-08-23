import { CreateIndexOptions, Pinecone, PineconeRecord, RecordMetadata, RecordValues } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";


const pc = new Pinecone({
  apiKey: process.env.PINE_CONE_API_KEY as string,
});

const options: CreateIndexOptions = {
  name: "rmp",
  dimension: 1024,
  metric: "cosine",
  spec: {
    serverless: { cloud: "aws", region: "us-east-1" },
  },
  waitUntilReady: true,
};

export async function GET() {
  const exists = pc.index(options.name);

  if(exists) {
    return NextResponse.json({ status: 409, data: "Index already exists" });
  }

  await pc.createIndex(options);  
  return NextResponse.json({ status: 201, data: "Index created" });
}
interface Reviews {
  professor: string;
  star: number;
  subject: string;
  review: string;
}
export async function POST(req: NextRequest) {
  const data = await req.json() as Reviews[];
  if (!data) {
    return NextResponse.json({ status: 400, data: "Bad request" });
  }
  const indexes = pc.index(options.name);

  const fetchPromises = data.map(async (item) => {
    const response = await fetch("https://api-inference.huggingface.co/pipeline/feature-extraction/intfloat/multilingual-e5-large", {
      method: "POST",
      body: JSON.stringify(item.review),
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      }
    });
    const res = await response.json();
    return {
      values: res,
      id: item.professor,
      metadata: {
        star: item.star,
        subject: item.subject,
        review: item.review,
      }
    };
  });

  const results: PineconeRecord<RecordMetadata>[] = await Promise.all(fetchPromises);
  await indexes.namespace("ns1").upsert(results)
  
  return NextResponse.json({ status: 201, data: "Records created" });
  // Continue with the rest of your logic
}