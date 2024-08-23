import { CreateIndexOptions, Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";

export async function POST() {
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
  const exists = pc.index(options.name);
  if(exists) {
    return NextResponse.json({ status: 409, data: "Index already exists" });
  }

  await pc.createIndex(options);  
  return NextResponse.json({ status: 201, data: "Index created" });
}
