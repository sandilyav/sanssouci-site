---
description: how to refresh best time to visit data
dependencies: []
---

## Daily BTTV refresh workflow

1. **Ensure environment variables are configured**
   - `STORMGLASS_API_KEY` is stored securely (e.g., GitHub/Netlify/Render env vars).
   - Coordinates live in `src/config/location.ts` and should not be duplicated elsewhere.

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Schedule the generator**
   - Use your hosting provider's cron / scheduler to run:
     ```bash
     npm run bttv:generate
     ```
     from the repo root once every 24 hours.
   - Example cron expression (UTC): `0 1 * * *`.

4. **Command behavior**
   - Loads env vars via `dotenv`.
   - Calls the Stormglass API, computes scores, writes `public/data/best-times.json`.
   - If the API call fails, the previous JSON remains untouched, so the hero retains last-known data.

5. **Deploy/build integration**
   - Deploy pipelines can optionally run `npm run bttv:generate` once before `npm run build` to ensure the artifact contains fresh JSON.
   - Local developers can still run the script manually when needed; scheduled jobs keep production data current automatically.
