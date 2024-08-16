<div align="center">
  <a href="https://prototypr.io">
<img style="width:250px" src="https://prototypr.io/static/images/prototypr_logo.svg"/>
  </a>
<h3>Open-source Publishing Platform</h3>
<p>Built with <a href="https://github.com/Prototypr/prototypr-frontend/wiki/Building-the-Prototypr-Website">Next.js</a>, <a href="https://github.com/Prototypr/prototypr-frontend/wiki/Prototypr-Backend-CMS-(Strapi.io)">Strapi.io</a>, and <a href="https://github.com/prototypr/typr">Typr Editor</a>, by <a href="https://github.com/GraemeFulton">graeme</a>
  </p>
  <p>
<a href="https://github.com/sponsors/prototypr"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86"/>
  </p>
</div>
 
  
![Prototypr homepage screenshot](https://github.com/Prototypr/prototypr-frontend/assets/4354786/a13850b9-7b43-4333-a76b-acd3715c7b42)

[Prototypr](https://prototypr.io) is an open-source blogging platform that focuses on prototyping, UX design, front-end development, and beyond, serving as a hub for designers and developers to discover the latest tools, resources, and insights in these fields. 


_In the past, Prototypr has been backed by Adobe Fund, and [**Interledger Foundation**](https://interledger.org/) to build a [Web Monetized Publishing platform](https://open.prototypr.io/)._

**Important:**
**This repo is only the Next.js Frontend app, but the features below describe the whole project.**

---

## ⚠️ Use as reference only 

This repo is for reference only - there's currently no documentation or seed data that is required to set up the platform locally - so it's not advised to do it yet. You can install the [Prototypr Editor](https://github.com/Prototypr/typr) separately though (see below). 

💓 If you want to set it up, consider [sponsoring me](https://github.com/sponsors/prototypr) so I can create documentation, seed data, and all things necessary to install and run the project.

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/prototypr)


### Update: Prototypr Editor is here!
**[UPDATE: AUG 2024]** The [Prototypr Editor](https://github.com/Prototypr/typr) is now available as a standalone [NPM package](https://www.npmjs.com/package/tiptypr) that you can install separately (I still need to add a license, probably will put MIT).

<a href="https://github.com/Prototypr/typr"><img src="https://prototypr-media.sfo2.digitaloceanspaces.com/strapi/af968e21ccb808a0a57c4a7827a44237.png"/></a>


---

## Features Overview

Prototypr is an evolving community blogging ecosystem. Features have been added based on what has been needed for running the site, so ⚠️**it may be tricky to duplicate features for a new project**. But here is what has been built so far:

#### User Management
- ☑️ **User profiles** - customise profile picture, bio and personal info fields
- ☑️ **Login** - Log in with magic email or social providers
- ☑️ **Invite only system** - sign up with a global secret passcode, or invite users individually by email
- ☑️ **Verified profiles** (just a flag that defaults to unverified until manually approved)
- ☑️ **User onboarding** - basic onboarding steps 
- ☑️ **Creator Role** - Add multiple users as 'creator' of a post

#### Sponsorships
- ☑️ **Booking Calendar:** – Accept sponsorship bookings on a calendar through Lemon Squeezy checkout
- ☑️ **Auto Sponsor Placement:** – When a booking is made, it will show in the available slot automatically
- ☑️ **Sponsor fallback:** – Add a default sponsor fallback to fill in when there is no booked sponsor

#### Blogging
- ☑️ **Editor:** – Tiptap/prosemirror editor with:
  - ☑️ **Image upload** (to strapi/aws backend)
  - ☑️ **Video upload**
  - ☑️ **Tweet embed**
  - ☑️ **Youtube Embed**
  - [More to do](https://github.com/orgs/Prototypr/projects/5)
- ☑️ **Permissions:** – users can edit their own posts only, and drafts are only visible to post owner

That's a quick overview of what's done so far, and is available publicly. There's probably much more to list!

## Sponsorware

Some features are not available publicy because they're experimental – you can [sponsor for access](https://github.com/sponsors/prototypr) [![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/prototypr)
. These include:

### AI Content Helper 🤖

- **AI news aggregator** – The news section uses AI to summarize articles for the news feed - [here's an example](https://prototypr.io/news/linear-opiniated-software) 
- **AI product listing creator for Strapi** – An AI editor inside strapi that can create product listings and galleries for a given URL ([here's an example listing](https://prototypr.io/toolbox/cult-ui))

AI really helps speed up content curation on Prototypr. While it's a great starting point, all the content still needs to be checked and edited by humans! Nothing generated by AI goes without editing.

---
## Running the project

Here's some notes on how the project was built, and how to run it. These notes are old, so please report any issues!

* This site uses Next.js's [Static Generation](https://nextjs.org/docs/basic-features/pages) feature using [Strapi](https://strapi.io/) as the data source.
* [Learn more about how the app was created over here](https://prototypr-gftw.vercel.app/front-end).

## Prerequisites
This Next.js app depends on a Strapi CMS backend, which is used as a headless CMS.

You don't need to install the Strapi CMS backend to run the front end - instead, you can connect to the development version we have running in the cloud by adding our hosted Strapi url in your `.env` file (see ['Set up .env variables' section](https://github.com/Prototypr/prototypr-frontend#set-up-env-variables)).

If you do want to run the backend locally though, [here is a guide](https://prototypr-gftw.vercel.app/back-end). 

## How to run

1. Clone this repo to your machine
2. Run `npm install --no-optional` from the project folder (we are using node v14.17.4)
3. Set up the environmental variables (see nect section)
4. `npm run dev` 

`npm install --no-optional` - some @prototypr packages are not public, --no-optional is required to skip installing them.   

## Set up .env variables

Once you've cloned the repo, create a `.env.local` file, and add the following:

```code
STRAPI_PREVIEW_SECRET=_genrate_key
NEXT_PUBLIC_STRAPI_API_URL=yourstrapiapiurl.com

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=_genrate_key
NEXT_PUBLIC_API_URL=yourstrapiapiurl.com

NEXT_PUBLIC_DATABASE_URL=postgresql://[dbusername]:[dbpassword]@[dburl]:[db-port]/[name]
```
[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/Y8Y71QU45)

---

### Switch between npm packages and local packages

There is a script in the root of the repo to switch between npm packages and local packages.

- `./switch-mode.sh local` to switch to local development mode
- `./switch-mode.sh npm` to switch to npm packages mode

switch-mode will update the package.json in the root directory to point to the correct version of the package.
