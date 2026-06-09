<div align="center">
    <h1 align="center">NotesGPT</h1>
    <h5>NotesGPT seamlessly converts your voice notes into organized summaries and clear action items using AI.</h5>
</div>

<div align="center">
  <a href="https://notessgpt.vercel.app">notessgpt.vercel.app</a>
</div>
<br/>

![Thumbnail](/public/thumbnail.png)

Key Features:

- Landing page 🛬
- Light and Dark mode 🌓
- Authentication 🔐
- Real-time voice-to-text conversion 🗣️➡️📝
- Organized summaries generation 📑
- Generate transcript using AI 📑
- Use google gemini ai for title, summary generation 🚀
- Use assembly ai for generating transcript of voice 🔊
- Ability to add action items ✅
- Ability to search through action items 🔎
- Share note functionality 🌍

### Prerequisites

**You should have Node.js (v18+) installed on your system.**

### Cloning the repository

```shell
git clone https://github.com/abdtriedcoding/notesGPT.git
```

### Install packages

```shell
npm install
```

> The repo ships an `.npmrc` with `legacy-peer-deps=true` because a few UI
> libraries still declare React 18-only peer ranges while the app runs on
> React 19 (they are runtime-compatible).

### Setup .env file taking reference from .env.example file

### Setup Convex

```shell
npx convex dev
```

This populates `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` in your `.env.local`.

### Connect Clerk to Convex

In your Clerk dashboard create a **JWT template named `convex`**, then point your
Convex deployment at Clerk's issuer domain:

```shell
npx convex env set CLERK_JWT_ISSUER_DOMAIN https://<your-app>.clerk.accounts.dev
```

### Start the app

```shell
npm run dev
```
