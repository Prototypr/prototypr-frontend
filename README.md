# Prototypr Front End Application

This example showcases Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Strapi](https://strapi.io/) as the data source.

## Prerequisites
This Next.js app depends on a Strapi CMS backend, which is used as a headless CMS.

You don't need to install the Strapi CMS backend to run the front end - instead, you can connect to the development version we have running in the cloud by adding our hosted Strapi url in your `.env` file (see ['Set up .env variables' section](https://github.com/Prototypr/prototypr-frontend#set-up-env-variables)).

If you do want to run the backend locally though, [here is a guide](https://prototypr-gftw.vercel.app/back-end). 

## Demo

[https://prototypr-frontend.vercel.app/](https://prototypr-frontend.vercel.app/)


## How to run

1. Clone this repo to your machine
2. Run `npm install` from the project folder (we are using node v14.17.4)
3. Set up the environmental variables (see nect section)
4. `npm run dev` 


## Set up .env variables

Once you've cloned the repo, create a `.env.local` file, and add the following:

```code
STRAPI_PREVIEW_SECRET=_genrate_key
NEXT_PUBLIC_STRAPI_API_URL=https://prototypr-backend-e8a72.ondigitalocean.app

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=_genrate_key
NEXT_PUBLIC_API_URL=https://prototypr-backend-e8a72.ondigitalocean.app

NEXT_PUBLIC_DATABASE_URL=postgresql://db:1ZU2k7DZPkRb7iEW@app-c58bb3a6-5c2d-4dea-b5bf-491b9914532a-do-user-2421263-0.b.db.ondigitalocean.com:25060/db?ssl=no-verify&synchronize=true
```