This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Instructions

### Criteria

- You must create a user listing page.
  - You do not have to be logged in to see this.
  - You must be able to filter by a users name.
- A user must be able to edit their own details.
- You must create a user profile page.
  - You do not have to be logged in to see this.
  - There must be a section for a users profile image.
    - You **do not** need to handle file upload and storage, you can simply store a URL against the user e.g. using [Faker](https://fakerjs.dev/api/image.html#avatar) for example.
  - There must be a section for a users bio/description.
  - There must be a section for a users favourite songs.
    - Database columns should include at least: title, artist, genre, rating.
    - A user must be able to add/update/remove music.
    - (Optional) A user should be able to export/download their favourite music as a JSON file.
  - (Optional) Feel free to add other sections to the profile page to flesh it out a bit more.
- A users profile must be viewable by other users.
- (Optional) Make some notes on what else you would've added, changed or liked to have done better if given more time.

This is more-or-less a fresh install of NextJS, I've only created an extremely rudamentary signup/login system and file-based database to get you going. As per the installation process, TypeScript and Tailwind CSS is already installed and ready to use.

Jest is set up, however unit tests are optional.

### Constraints

- Please use TypeScript, not JavaScript.
- Don't feel you have to use my attempt at a database, no offense will be taken if you would prefer to use a package e.g. [drizzle-orm](https://www.npmjs.com/package/drizzle-orm) instead. However, **please use a file-based database driver** if you do.

Other than that, feel free to use whatever resources you like, whether thats documentation, component libraries or other npm packages to accomplish this practical (within reason, if I see libraries like [this one](https://www.npmjs.com/package/isarray) being used...😑). There isn't a time limit on this, spend as little or as much time as you like (please don't invest too much, this is still only a practical). I encourage you to show off a bit if applicable (maybe comment where you're showing off so I can properly appreciate its splendor).

### What we're looking for in this practical

- Where/how you abstract logic/UI into components.
- Good architectural principles like abstraction layers.
- Attention to detail.

## Getting Started

Fork this repository into your own.

First, install dependencies:

```bash
npm i
```

next, initialise the app:
(this script is set up to work on Linux based systems, all it does is set the project root directory based on your local filesystem, you can adjust the script or do this manually yourself if this doesn't work out of the box)

```bash
npm run init
```

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Submission

Once you are happy with your work, open a pull request back into the source repository to be reviewed. It will be reviewed the day before your interview, so feel free to push changes once the pull request is opened.

Please ensure the following:
- We will be using your application in production mode, so please ensure your application builds successfully when `npm run build` is executed.
  - We will attempt dev-mode if production mode doesn't work for whatever reason, however, tut-tut-tut. If we think there is enough time, we will try to give you an opportunity to fix any build errors.
- Please make sure your database files are committed so we can use your application as you were using it.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
