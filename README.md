<div align="center">
  <a href="https://bloggrify.com">
    <img src="public/android-chrome-192x192.png"  width="80px" height="80px">
  </a>
  <h1 align="center">
    Bloggrify
  </h1>

[Getting started](https://bloggrify.com/introduction/getting-started) | [Homepage](https://bloggrify.com)

  <a href="https://github.com/bloggrify/bloggrify/releases/latest">
    <img src="https://img.shields.io/github/release/bloggrify/bloggrify.svg?style=flat-square" alt="">
  </a>

  <a href="https://github.com/bloggrify/bloggrify/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/bloggrify/bloggrify.svg?style=flat-square" alt="">
  </a>

</div>

Bloggrify is built on top of 
* Nuxt.js 
* Tailwind CSS
* Nuxt-Content 
* and other cool stuff (Hyvor Talk, RssFeedPulse, etc...)

It is a **static** blog generator that uses markdown files to generate blog posts.

Discover all features on the [official website](https://bloggrify.com)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/hlassiege)

If you use this project and it saves you time. [How about supporting it?](https://www.buymeacoffee.com/hlassiege)

## Contributing

I created this blog application because I know how **tedious** it is to assemble all the bricks needed to have an SEO-efficient blog, with a clean, accessible design, responsive, with features already integrated (comment system, rss feed, newsletter, sitemap etc...).

All this work, which can take days to do, I'll spare you - **and it's free**.

However, **if you consider that you've really saved time**, **you might consider supporting this work**.
It's optional, but it will be much appreciated.

The first option is to offer me a [virtual coffee](https://www.buymeacoffee.com/hlassiege) representing the value of the time you've saved.

But you can also contribute in many other ways:

- by **talking** about this project on social networks, on your blog, with your colleagues. 
- by giving this project **a star** on github
- by contributing to the open source project to improve it (see below)

**10% of the benefits will be donated to the [Unicef foundation](https://www.unicef.org/), an organization that helps children in need all over the world.**

## Contributing to the project

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install
```

### Development Server

Start the development server on [http://localhost:3000](http://localhost:3000)

Running bloggrify alone without templates won't be really useful.   


```bash
# npm
npm run dev

# pnpm
pnpm run dev
```

#### Editor Support

##### Visual Studio Code (VS Code)
This project includes VS Code configuration files to enhance the development experience:
- **Recommended extensions** for Nuxt, TailwindCSS, and TypeScript development.
- **Debug and launch configurations** for client and server to improve the debugging experience.

For more information on debugging in VS Code, visit the [VS Code debugging documentation](https://code.visualstudio.com/docs/editor/debugging).

The launch configuration is based on the example provided in the [Nuxt debugging guide](https://nuxt.com/docs/guide/going-further/debugging).

These extensions are optional and maintained by their respective developers or the VSCode users community. **Contributions to the selection and recommendation of these extensions are welcome!**

##### JetBrains IDEs

You can also debug the project in JetBrains IDEs using the Nuxt provided example [JetBrains IDEs debug configuration](https://nuxt.com/docs/guide/going-further/debugging#example-jetbrains-ides-debug-configuration).

### Production

Build the application for production:

```bash
# npm
npm run generate

# pnpm
pnpm run generate
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview
```

### Release

Each commit should respect the [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format.

The basic release process is as follows:
- Update the version in `package.json`
- create a tag with the version number
- push the tag to the repository
- publish the release on github
- publish the release on npm

In order to automate this process, you can use the following command:

```bash
# First, you need to install the changelogen package
npm install -g changelogen

# Then, you can run the following command to automate all the previous steps
npx changelogen --release --push && npm publish


```

In order to publish the release on npm, you need to be authenticated with the npm registry. You can do this by running `npm login`.  
In order to publish the release on github, you need to be authenticated with the github registry. You can do this by creating a personal access token and setting it in your environment variables (GITHUB_TOKEN).

