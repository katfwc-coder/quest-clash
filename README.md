# Quest Clash

An original educational browser game created by Kat Choi in November 2026 for her son, Lukas Fok, whose love of learning and games inspired the project.

**Play:** https://quest-clash-year-six.workspace-325447.chatgpt.site

## Features

- Eight game modes, themed courses and progression to level 100.
- Dog and cat companions, custom appearances, earned-credit shop and permanent wardrobe.
- Ten-question rounds with multiple learning fields, optional timers and health earned through learning.
- Australian Years 6–8 learning with progressively harder content, plus optional Years 10–12 challenges.
- Live friend rooms, player accounts, saved progress, audio and touch controls.
- 50 new maths word problems and 50 additional senior maths challenges.

The main library contains 50,100 questions and calculated variations. It is not 50,100 independently authored factual questions. Senior questions are a separate bank.

## Run locally

Install Node.js 24 or later, then run:

```sh
npm start
```

Open http://127.0.0.1:4177. No npm packages are required. The preview uses Node's built-in SQLite support and an **in-memory test database**: local accounts and live rooms disappear when the preview stops. Browser-local progress may remain in the browser. This preview does not connect to production player data.

## Build

```sh
npm run build
```

This generates a Cloudflare-compatible Worker module at `dist/server/index.js`, embedding the frontend assets. Generated output is ignored by Git.

## Structure

- `dist/`: editable browser HTML, JavaScript and CSS.
- `worker/`: live-room and account API source.
- `drizzle/`: database migrations.
- `build-live.mjs`: Worker bundling script.
- `preview.mjs`: local HTTP server and test database adapter.

## Hosting

The existing game remains hosted at its current public address. Uploading this repository to GitHub does not move the live game or migrate its database. Full production hosting requires a Worker-compatible runtime, a D1 database binding named `DB`, and the database migrations. GitHub Pages alone can serve frontend assets but cannot provide the account or multiplayer API.

Hosting project identifiers, repository credentials, local Git history and player databases are excluded from this export. The build optionally copies a local Sites hosting manifest when one is supplied separately.

## Development notes

Question IDs and published numerical-generation recipes are used by saved history and shared rounds. Keep these stable when adding questions. Purchases use earned game credits rather than money.

This is a source snapshot prepared for GitHub, not an automatic deployment pipeline. No open-source licence has been selected.
