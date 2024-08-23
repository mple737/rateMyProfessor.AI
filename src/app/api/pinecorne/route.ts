import { getPinecone } from "@/app/lib/utils/function";
import {  PineconeRecord, RecordMetadata } from "@pinecone-database/pinecone";
import { NextRequest, NextResponse } from "next/server";
const index = getPinecone()

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
  (await index).upsert(results)

  return NextResponse.json({ status: 201, data: "Records created" });
}