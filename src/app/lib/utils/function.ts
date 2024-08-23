import { CreateIndexOptions, Pinecone } from "@pinecone-database/pinecone";

const options: CreateIndexOptions = {
    name: "rmp",
    dimension: 1024,
    metric: "cosine",
    spec: {
      serverless: { cloud: "aws", region: "us-east-1" },
    },
    waitUntilReady: true,
  };

  
export async function getPinecone() {
  const pc = new Pinecone({
    apiKey: process.env.PINE_CONE_API_KEY as string,
  });
  const result = pc.index(options.name);
  if(!result) {
    await pc.createIndex(options);
  }
  return pc.index(options.name).namespace("ns1");
}
