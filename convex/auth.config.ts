export default {
  providers: [
    {
      // Set in your Convex deployment:
      //   npx convex env set CLERK_JWT_ISSUER_DOMAIN https://<your-app>.clerk.accounts.dev
      // Find the value as the "Issuer" of your Clerk JWT template named "convex".
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: 'convex',
    },
  ],
}
