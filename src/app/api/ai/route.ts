// src/app/api/ai/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@clerk/nextjs/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Handle GET requests here
      res.status(200).json({ message: 'GET request to Clerk API route' });
      break;
    case 'POST':
      // Handle POST requests here
      res.status(200).json({ message: 'POST request to Clerk API route' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

// Wrap the handler with Clerk authentication
export default withAuth(handler);
