// next.config.js
module.exports = {
    env: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    },
    experimental: {
      appDir: true,  // Ensures the app directory is enabled for Next.js
    },
  };
  