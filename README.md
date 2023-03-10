# create-svelte

## 1 - install supabase cli
- npm i supabase --save-dev
- npx supabase init
- npx supabase start

[comment]: need to later disable confirm email and secure email changes at http://localhost:54323/ - supabase -config.toml

- npx supabase migration new starting-ddl (original-ddl)
- npx playwright install
- install tailwind - https://tailwindcss.com/docs/guides/sveltekit
- npx supabase gen types typescript --local > src/lib/database.types.ts

- npx supabase link --project-ref=<ref in your supabase url> --password=<db password>
- npx db push

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
