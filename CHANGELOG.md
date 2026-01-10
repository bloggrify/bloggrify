# Changelog


## v3.1.2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.1.1...v3.1.2)

### 🩹 Fixes

- Breaking change. The id is now deprecated in version 3.x. This is now a reserved item for nuxt content ([7a5d75d](https://github.com/bloggrify/bloggrify/commit/7a5d75d))
- Breaking change related to nuxt content. id is now a reserved keyword, hence we should use pageid for the comment system ([540064c](https://github.com/bloggrify/bloggrify/commit/540064c))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.1.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.1.0...v3.1.1)

### 🩹 Fixes

- Html tag was incorrect in the toc ([e413213](https://github.com/bloggrify/bloggrify/commit/e413213))
- Dom manipulation on non existing block ([bd4d2a7](https://github.com/bloggrify/bloggrify/commit/bd4d2a7))
- Key conflict and type conversion issue ([65d4655](https://github.com/bloggrify/bloggrify/commit/65d4655))
- Table of content, value should be converted to computed ([1f83ed6](https://github.com/bloggrify/bloggrify/commit/1f83ed6))
- Try to fix bunny upload deployment issue ([fc7741c](https://github.com/bloggrify/bloggrify/commit/fc7741c))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.1.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.0.3...v3.1.0)

### 🚀 Enhancements

- Add composable to find surrounded and related content ([2b49df3](https://github.com/bloggrify/bloggrify/commit/2b49df3))

### 🩹 Fixes

- Tags page were broken ([832d402](https://github.com/bloggrify/bloggrify/commit/832d402))

### 🏡 Chore

- Update content ([df6b06b](https://github.com/bloggrify/bloggrify/commit/df6b06b))
- App.config.ts is now removed from the package. We can use this one for the demo ([9514b00](https://github.com/bloggrify/bloggrify/commit/9514b00))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.0.3

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.0.2...v3.0.3)

### 🩹 Fixes

- No reference to css file without an alias defined in nuxt-config.ts ([e472bf5](https://github.com/bloggrify/bloggrify/commit/e472bf5))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.0.2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.0.1...v3.0.2)

### 🩹 Fixes

- App.config.ts should be empty ([cacaa8e](https://github.com/bloggrify/bloggrify/commit/cacaa8e))
- Fix the content.config.ts file in order to be usable ([19bf843](https://github.com/bloggrify/bloggrify/commit/19bf843))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.0.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v3.0.0...v3.0.1)

### 🩹 Fixes

- Theme components should not use direct call to the nuxt content api ([d9ef9a0](https://github.com/bloggrify/bloggrify/commit/d9ef9a0))
- Add content.config.ts to the deployed npm package but comment the sitemap until issue https://github.com/harlan-zw/nuxt-seo/issues/498 is fixed ([f3db61d](https://github.com/bloggrify/bloggrify/commit/f3db61d))
- Missing file from the last commit ([2814bd3](https://github.com/bloggrify/bloggrify/commit/2814bd3))
- Try to find a way to embed an asset in the final package ([0f89825](https://github.com/bloggrify/bloggrify/commit/0f89825))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v3.0.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v2.1.1...v3.0.0)

### 🚀 Enhancements

- Improve RSS discoverability ([150703b](https://github.com/bloggrify/bloggrify/commit/150703b))
- Add search button from nuxt ui (better integration with nuxt content) ([5cffb4c](https://github.com/bloggrify/bloggrify/commit/5cffb4c))
- Add automatic generation of og:image when cover is missing + add missing og tags ([0e7a798](https://github.com/bloggrify/bloggrify/commit/0e7a798))
- Avif format is added to the default format nuxt image should manage ([b59494b](https://github.com/bloggrify/bloggrify/commit/b59494b))
- Author pages ([0fe1463](https://github.com/bloggrify/bloggrify/commit/0fe1463))
- Add bloggrify cli with several features (add post, validate, stats, add author etc...) ([4eb2574](https://github.com/bloggrify/bloggrify/commit/4eb2574))
- Link checker ([5d19816](https://github.com/bloggrify/bloggrify/commit/5d19816))

### 🔥 Performance

- Use zero runtime on the nuxt sitemap module ([8d55f75](https://github.com/bloggrify/bloggrify/commit/8d55f75))

### 🩹 Fixes

- Folder structure is different with nuxt 4, fix file path ([a59b60c](https://github.com/bloggrify/bloggrify/commit/a59b60c))
- Fix partially the reload problem with nuxt content. But there is still a problem due to https://github.com/harlan-zw/nuxt-seo/issues/498 ([3620038](https://github.com/bloggrify/bloggrify/commit/3620038))
- Setup the code to highlight the incompability problem with nuxt seo and nuxt content ([82ad0f2](https://github.com/bloggrify/bloggrify/commit/82ad0f2))
- Eslint and typecheck errors ([dd75ac9](https://github.com/bloggrify/bloggrify/commit/dd75ac9))
- Fix github action build ([3a30b86](https://github.com/bloggrify/bloggrify/commit/3a30b86))
- Fix build, prepare step was missing ([1d92063](https://github.com/bloggrify/bloggrify/commit/1d92063))
- I think the readme was not honest enough regarding what this projects bring to the final user. ([be8aacf](https://github.com/bloggrify/bloggrify/commit/be8aacf))
- Fix eslint ([32ce480](https://github.com/bloggrify/bloggrify/commit/32ce480))
- Fix eslint and typecheck ([d8ef33c](https://github.com/bloggrify/bloggrify/commit/d8ef33c))
- DateFormat is an util and not a composable ([a4f3e67](https://github.com/bloggrify/bloggrify/commit/a4f3e67))

### 🏡 Chore

- Upgrade to nuxt 4, nuxt content 3 ([8211a3b](https://github.com/bloggrify/bloggrify/commit/8211a3b))
- Improve typing, remove useless stuff ([b7c73fc](https://github.com/bloggrify/bloggrify/commit/b7c73fc))
- Update git submodule ([f9b6b36](https://github.com/bloggrify/bloggrify/commit/f9b6b36))
- Update github action file descriptor ([f4a87f9](https://github.com/bloggrify/bloggrify/commit/f4a87f9))
- Improve build to insert a quality gate ([b75ace7](https://github.com/bloggrify/bloggrify/commit/b75ace7))
- Fix the license (copy pasted from another project) ([e573fd5](https://github.com/bloggrify/bloggrify/commit/e573fd5))
- Try to deploy on bunny ([e1e6a9c](https://github.com/bloggrify/bloggrify/commit/e1e6a9c))
- Try to deploy on bunny (again) ([c8fe045](https://github.com/bloggrify/bloggrify/commit/c8fe045))
- Try to deploy on bunny (missing keys) ([057413f](https://github.com/bloggrify/bloggrify/commit/057413f))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v2.1.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v2.0.2...v2.1.0)

### 🚀 Enhancements

- Add umami to the list of analytics provider ([befd81d](https://github.com/bloggrify/bloggrify/commit/befd81d))
- Add shortcode for X, Youtube, Instagram and Vimeo ([ae23eab](https://github.com/bloggrify/bloggrify/commit/ae23eab))

### 🩹 Fixes

- Rssfeedpulse became blogtally ([b784d1d](https://github.com/bloggrify/bloggrify/commit/b784d1d))

### 📖 Documentation

- Add blog article for new version ([485223d](https://github.com/bloggrify/bloggrify/commit/485223d))

### 🏡 Chore

- Upgrade some dependencies ([c3581e5](https://github.com/bloggrify/bloggrify/commit/c3581e5))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>

## v2.0.2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v2.0.1...v2.0.2)

### 📦 Build

- Playwright should not be a prerequisite ([8f2cf7c](https://github.com/bloggrify/bloggrify/commit/8f2cf7c))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>

## v2.0.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v2.0.0...v2.0.1)

### 🚀 Enhancements

- Allows custom properties on analytic providers ([fb7d4e5](https://github.com/bloggrify/bloggrify/commit/fb7d4e5))

### 🩹 Fixes

- Social sharing should use the new url variable ([16eb2f5](https://github.com/bloggrify/bloggrify/commit/16eb2f5))
- Manage absent variables ([170ed9c](https://github.com/bloggrify/bloggrify/commit/170ed9c))
- The warning message on startup was not appearing correctly ([4d02b2e](https://github.com/bloggrify/bloggrify/commit/4d02b2e))

### 📖 Documentation

- Add article about the new version ([922a1a8](https://github.com/bloggrify/bloggrify/commit/922a1a8))
- Fix article name. Don't use dots in file name ([5284bb1](https://github.com/bloggrify/bloggrify/commit/5284bb1))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>

## v2.0.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.8.0...v2.0.0)

### 🚀 Enhancements

- Invalid layout ([caa956d](https://github.com/bloggrify/bloggrify/commit/caa956d))
- Add xsl to the sitemap and include cover if they exist ([bad8e9f](https://github.com/bloggrify/bloggrify/commit/bad8e9f))
- Use nuxtjs/robots and nuxtjs/sitemap module instead of custom code ([c08a6cc](https://github.com/bloggrify/bloggrify/commit/c08a6cc))
- Add support for blogtally, googleGA and fathom (for web analytics) ([03510f9](https://github.com/bloggrify/bloggrify/commit/03510f9))
- Add support for search feature into the minimalist template ([2b0adf9](https://github.com/bloggrify/bloggrify/commit/2b0adf9))
- #issue13 add a component to demonstrate how to list pages (and manage pagination) ([df5d784](https://github.com/bloggrify/bloggrify/commit/df5d784))
- #13 show listing by prefix ([#13](https://github.com/bloggrify/bloggrify/issues/13))
- Add author to the meta tags ([b07d90c](https://github.com/bloggrify/bloggrify/commit/b07d90c))
- Add author to the meta tags (bis) + add reading time. ([e47f9ca](https://github.com/bloggrify/bloggrify/commit/e47f9ca))
- Add schema.org capabilities ([f3506e0](https://github.com/bloggrify/bloggrify/commit/f3506e0))
- Add blogPosting annotation for blog posts ([45a064d](https://github.com/bloggrify/bloggrify/commit/45a064d))
- Add timeRequired to the schema.org ([a882753](https://github.com/bloggrify/bloggrify/commit/a882753))
- Allow multiple providers for analytics ([2903e3c](https://github.com/bloggrify/bloggrify/commit/2903e3c))
- Add comment system to the minimalist template ([8b670ef](https://github.com/bloggrify/bloggrify/commit/8b670ef))
- Add support for algolia (not working currently) ([04a6173](https://github.com/bloggrify/bloggrify/commit/04a6173))

### 🩹 Fixes

- Fix problem of contrast ration globally by forcing the light mode by default https://github.com/bloggrify/bloggrify-mistral/issues/3 ([680139f](https://github.com/bloggrify/bloggrify/commit/680139f))
- Improve accessibility by using aria-label ([d9ecb5b](https://github.com/bloggrify/bloggrify/commit/d9ecb5b))
- A table of content is semantically a nav element ([0b81984](https://github.com/bloggrify/bloggrify/commit/0b81984))
- Fix missing page for the demo site ([4361a57](https://github.com/bloggrify/bloggrify/commit/4361a57))
- Don't crash the build if the url is not provided ([42f38c4](https://github.com/bloggrify/bloggrify/commit/42f38c4))
- Fix the configuration file for github workflows (only usefull as a backup) ([e007762](https://github.com/bloggrify/bloggrify/commit/e007762))
- Internal url on the demo content ([111e69e](https://github.com/bloggrify/bloggrify/commit/111e69e))
- Minimalist template was referring to category pages, not implemented on this theme ([23fbec7](https://github.com/bloggrify/bloggrify/commit/23fbec7))
- Don't display reading time if it's equal to 0 ([a42f7b7](https://github.com/bloggrify/bloggrify/commit/a42f7b7))
- FindAuthor returns an author object and not a string ([6078556](https://github.com/bloggrify/bloggrify/commit/6078556))
- FindAuthor should not return "undefined" or null ([bd1eab2](https://github.com/bloggrify/bloggrify/commit/bd1eab2))
- CommentSystem should manage when configuration is empty ([70cd503](https://github.com/bloggrify/bloggrify/commit/70cd503))
- Images were missing on this blog post. Rewrite the content to send readers to the official documentation instead of having outdated documentation here ([22c8f3c](https://github.com/bloggrify/bloggrify/commit/22c8f3c))
- Bad link in the home template ([aaf90d0](https://github.com/bloggrify/bloggrify/commit/aaf90d0))
- Id was not unique, preventing pagination ([98010c5](https://github.com/bloggrify/bloggrify/commit/98010c5))
- Temporarily disable algolia module ([95dfe35](https://github.com/bloggrify/bloggrify/commit/95dfe35))
- Prerendering don't expect 204 http code ([9a95ff9](https://github.com/bloggrify/bloggrify/commit/9a95ff9))
- Disable the algolia component for the moment ([0ecb204](https://github.com/bloggrify/bloggrify/commit/0ecb204))
- #30 The default version don't use trailing slash. If user try to get the version with trailing slash, he is redirected to the version without trailing slash ([#30](https://github.com/bloggrify/bloggrify/issues/30))
- Middleware was not included in the published package ([21d975d](https://github.com/bloggrify/bloggrify/commit/21d975d))
- Remove algolia support completely. Too many problems with it ([229e957](https://github.com/bloggrify/bloggrify/commit/229e957))
- Remove algolia docsearch dependencies ([ec115ef](https://github.com/bloggrify/bloggrify/commit/ec115ef))

### 💅 Refactors

- Config file should be empty by default. All components using it should handle empty configuration ([3f7c17d](https://github.com/bloggrify/bloggrify/commit/3f7c17d))
- Huge simplification to avoid mixing tag, category and standard pages ([670376e](https://github.com/bloggrify/bloggrify/commit/670376e))
- Remove useless variable ([065d9cf](https://github.com/bloggrify/bloggrify/commit/065d9cf))
- It's not user friendly to ask them to create the archives.md file. It should be a logic managed by the framework ([698d0a9](https://github.com/bloggrify/bloggrify/commit/698d0a9))
- For user experience, it's better to propose the indexable setting from within env variables ([44448ef](https://github.com/bloggrify/bloggrify/commit/44448ef))

### 📖 Documentation

- Modify documentation. The demo app is now deployed on each commit ([84403b8](https://github.com/bloggrify/bloggrify/commit/84403b8))
- Add a warning about the listing component ([8948bc4](https://github.com/bloggrify/bloggrify/commit/8948bc4))
- Show schema.org frontmatter on the about page ([9a3256f](https://github.com/bloggrify/bloggrify/commit/9a3256f))
- Remove current content of the blog (to replace by git a git submodule) ([d0571a9](https://github.com/bloggrify/bloggrify/commit/d0571a9))
- Add submodule (that way, the content of the blog will be shared by all demo blog) ([66983cc](https://github.com/bloggrify/bloggrify/commit/66983cc))
- Add content for the future blog ([df84056](https://github.com/bloggrify/bloggrify/commit/df84056))
- Update git folder ([27ac545](https://github.com/bloggrify/bloggrify/commit/27ac545))
- Update github actions to manage submodule ([0fec655](https://github.com/bloggrify/bloggrify/commit/0fec655))

### 📦 Build

- Default config file for minimalist theme, using by CI ([7925d22](https://github.com/bloggrify/bloggrify/commit/7925d22))
- Install playwright before the build ([a7397f3](https://github.com/bloggrify/bloggrify/commit/a7397f3))

### 🏡 Chore

- Fix email in changelog ([0bc0d70](https://github.com/bloggrify/bloggrify/commit/0bc0d70))
- Prepare next major version ([080f0ee](https://github.com/bloggrify/bloggrify/commit/080f0ee))
- Generate changelog ([a8a2f6a](https://github.com/bloggrify/bloggrify/commit/a8a2f6a))
- Use HTTPS for submodule ([d310df9](https://github.com/bloggrify/bloggrify/commit/d310df9))
- Migrate content from submodule to main repo ([fcf25ab](https://github.com/bloggrify/bloggrify/commit/fcf25ab))
- Migrate content from submodule to main repo" ([e942333](https://github.com/bloggrify/bloggrify/commit/e942333))
- **release:** V2.0.0-beta2 ([aa11a57](https://github.com/bloggrify/bloggrify/commit/aa11a57))

### ❤️ Contributors

- Hugo Lassiège <hugo@malt.com>
- IO-Fire ([@IO-Fire](http://github.com/IO-Fire))

## v2.0.0-beta2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v2.0.0-beta1...v2.0.0-beta2)

### 🚀 Enhancements

- Allow multiple providers for analytics ([2903e3c](https://github.com/bloggrify/bloggrify/commit/2903e3c))
- Add comment system to the minimalist template ([8b670ef](https://github.com/bloggrify/bloggrify/commit/8b670ef))

### 🩹 Fixes
- FindAuthor should not return "undefined" or null ([bd1eab2](https://github.com/bloggrify/bloggrify/commit/bd1eab2))
- CommentSystem should manage when configuration is empty ([70cd503](https://github.com/bloggrify/bloggrify/commit/70cd503))
- Images were missing on this blog post. Rewrite the content to send readers to the official documentation instead of having outdated documentation here ([22c8f3c](https://github.com/bloggrify/bloggrify/commit/22c8f3c))
- Bad link in the home template ([aaf90d0](https://github.com/bloggrify/bloggrify/commit/aaf90d0))
- Id was not unique, preventing pagination ([98010c5](https://github.com/bloggrify/bloggrify/commit/98010c5))
- Temporarily disable algolia module ([95dfe35](https://github.com/bloggrify/bloggrify/commit/95dfe35))
- Prerendering don't expect 204 http code ([9a95ff9](https://github.com/bloggrify/bloggrify/commit/9a95ff9))
- Disable the algolia component for the moment ([0ecb204](https://github.com/bloggrify/bloggrify/commit/0ecb204))
- #30 The default version don't use trailing slash. If user try to get the version with trailing slash, he is redirected to the version without trailing slash ([#30](https://github.com/bloggrify/bloggrify/issues/30))

### 💅 Refactors

- It's not user friendly to ask them to create the archives.md file. It should be a logic managed by the framework ([698d0a9](https://github.com/bloggrify/bloggrify/commit/698d0a9))
- For user experience, it's better to propose the indexable setting from within env variables ([44448ef](https://github.com/bloggrify/bloggrify/commit/44448ef))

### 📖 Documentation

- Remove current content of the blog (to replace by git a git submodule) ([d0571a9](https://github.com/bloggrify/bloggrify/commit/d0571a9))
- Add submodule (that way, the content of the blog will be shared by all demo blog) ([66983cc](https://github.com/bloggrify/bloggrify/commit/66983cc))
- Add content for the future blog ([df84056](https://github.com/bloggrify/bloggrify/commit/df84056))
- Update git folder ([27ac545](https://github.com/bloggrify/bloggrify/commit/27ac545))
- Update github actions to manage submodule ([0fec655](https://github.com/bloggrify/bloggrify/commit/0fec655))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>
- IO-Fire ([@IO-Fire](http://github.com/IO-Fire))

## v2.0.0-beta.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.8.0...v2.0.0-beta-1)

### 🚀 Enhancements

- Invalid layout ([caa956d](https://github.com/bloggrify/bloggrify/commit/caa956d))
- Add xsl to the sitemap and include cover if they exist ([bad8e9f](https://github.com/bloggrify/bloggrify/commit/bad8e9f))
- Use nuxtjs/robots and nuxtjs/sitemap module instead of custom code ([c08a6cc](https://github.com/bloggrify/bloggrify/commit/c08a6cc))
- Add support for blogtally, googleGA and fathom (for web analytics) ([03510f9](https://github.com/bloggrify/bloggrify/commit/03510f9))
- Add support for search feature into the minimalist template ([2b0adf9](https://github.com/bloggrify/bloggrify/commit/2b0adf9))
- #issue13 add a component to demonstrate how to list pages (and manage pagination) ([df5d784](https://github.com/bloggrify/bloggrify/commit/df5d784))
- #13 show listing by prefix ([#13](https://github.com/bloggrify/bloggrify/issues/13))
- Add author to the meta tags ([b07d90c](https://github.com/bloggrify/bloggrify/commit/b07d90c))
- Add author to the meta tags (bis) + add reading time. ([e47f9ca](https://github.com/bloggrify/bloggrify/commit/e47f9ca))
- Add schema.org capabilities ([f3506e0](https://github.com/bloggrify/bloggrify/commit/f3506e0))
- Add blogPosting annotation for blog posts ([45a064d](https://github.com/bloggrify/bloggrify/commit/45a064d))
- Add timeRequired to the schema.org ([a882753](https://github.com/bloggrify/bloggrify/commit/a882753))

### 🩹 Fixes

- Fix problem of contrast ration globally by forcing the light mode by default https://github.com/bloggrify/bloggrify-mistral/issues/3 ([680139f](https://github.com/bloggrify/bloggrify/commit/680139f))
- Improve accessibility by using aria-label ([d9ecb5b](https://github.com/bloggrify/bloggrify/commit/d9ecb5b))
- A table of content is semantically a nav element ([0b81984](https://github.com/bloggrify/bloggrify/commit/0b81984))
- Fix missing page for the demo site ([4361a57](https://github.com/bloggrify/bloggrify/commit/4361a57))
- Don't crash the build if the url is not provided ([42f38c4](https://github.com/bloggrify/bloggrify/commit/42f38c4))
- Fix the configuration file for github workflows (only usefull as a backup) ([e007762](https://github.com/bloggrify/bloggrify/commit/e007762))
- Internal url on the demo content ([111e69e](https://github.com/bloggrify/bloggrify/commit/111e69e))
- Minimalist template was referring to category pages, not implemented on this theme ([23fbec7](https://github.com/bloggrify/bloggrify/commit/23fbec7))
- Don't display reading time if it's equal to 0 ([a42f7b7](https://github.com/bloggrify/bloggrify/commit/a42f7b7))
- FindAuthor returns an author object and not a string ([6078556](https://github.com/bloggrify/bloggrify/commit/6078556))

### 💅 Refactors

- Config file should be empty by default. All components using it should handle empty configuration ([3f7c17d](https://github.com/bloggrify/bloggrify/commit/3f7c17d))
- Huge simplification to avoid mixing tag, category and standard pages ([670376e](https://github.com/bloggrify/bloggrify/commit/670376e))
- Remove useless variable ([065d9cf](https://github.com/bloggrify/bloggrify/commit/065d9cf))

### 📖 Documentation

- Modify documentation. The demo app is now deployed on each commit ([84403b8](https://github.com/bloggrify/bloggrify/commit/84403b8))
- Add a warning about the listing component ([8948bc4](https://github.com/bloggrify/bloggrify/commit/8948bc4))
- Show schema.org frontmatter on the about page ([9a3256f](https://github.com/bloggrify/bloggrify/commit/9a3256f))

### 📦 Build

- Default config file for minimalist theme, using by CI ([7925d22](https://github.com/bloggrify/bloggrify/commit/7925d22))
- Install playwright before the build ([a7397f3](https://github.com/bloggrify/bloggrify/commit/a7397f3))

### 🏡 Chore

- Fix email in changelog ([0bc0d70](https://github.com/bloggrify/bloggrify/commit/0bc0d70))
- Prepare next major version ([080f0ee](https://github.com/bloggrify/bloggrify/commit/080f0ee))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>
- IO-Fire ([@IO-Fire](http://github.com/IO-Fire))

## v1.8.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.7.1...v1.8.0)

### 🚀 Enhancements

- Add vscode debug launch config ([b774663](https://github.com/bloggrify/bloggrify/commit/b774663))
- Add config easy access to sourcemaps ([e660299](https://github.com/bloggrify/bloggrify/commit/e660299))
- Add Nuxt MDC extension ([bbf9c9d](https://github.com/bloggrify/bloggrify/commit/bbf9c9d))
- Add Nuxtr extension ([a94f34d](https://github.com/bloggrify/bloggrify/commit/a94f34d))
- Add Nuxtr Extension pack ([bf917dd](https://github.com/bloggrify/bloggrify/commit/bf917dd))
- Add tailwindcss extension ([b1dc85f](https://github.com/bloggrify/bloggrify/commit/b1dc85f))
- Add Pretty TS Errors ([d2a0213](https://github.com/bloggrify/bloggrify/commit/d2a0213))
- Add Flame Chart Visualiser extension ([98c9ab4](https://github.com/bloggrify/bloggrify/commit/98c9ab4))

### 🩹 Fixes

- Rss image URL missing leading slash ([702d45a](https://github.com/bloggrify/bloggrify/commit/702d45a))
- Pagination ([949bbeb](https://github.com/bloggrify/bloggrify/commit/949bbeb))

### 📖 Documentation

- Fix release process ([7b29fa3](https://github.com/bloggrify/bloggrify/commit/7b29fa3))
- Add editor support ([63ea2af](https://github.com/bloggrify/bloggrify/commit/63ea2af))
- Make dev server url into link ([9a6ac97](https://github.com/bloggrify/bloggrify/commit/9a6ac97))

### 🏡 Chore

- Set file eof ([b34e47d](https://github.com/bloggrify/bloggrify/commit/b34e47d))

### ❤️ Contributors

- IO-Fire ([@IO-Fire](http://github.com/IO-Fire))
- Hugo Lassiège <hlassiege@gmail.com>

## v1.7.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.7.0...v1.7.1)

### 🩹 Fixes

- Fetch error handling ([92a211a](https://github.com/bloggrify/bloggrify/commit/92a211a))
- Verify twitter links to check if it's a link to a tweet or a page  https://github.com/bloggrify/bloggrify/issues/10 ([5ae352c](https://github.com/bloggrify/bloggrify/commit/5ae352c))
- Search ([8fba98a](https://github.com/bloggrify/bloggrify/commit/8fba98a))
- Remove await within async useAsyncData composables ([c09f3c9](https://github.com/bloggrify/bloggrify/commit/c09f3c9))

### 📖 Documentation

- Pnpm support ([072b5e7](https://github.com/bloggrify/bloggrify/commit/072b5e7))
- Add information about the release process ([482f4c9](https://github.com/bloggrify/bloggrify/commit/482f4c9))

### 🏡 Chore

- Nuxt is not yet ready for the new version of sass ([104da42](https://github.com/bloggrify/bloggrify/commit/104da42))
- Use last version of eslint.config and configure it accordingly ([51bb927](https://github.com/bloggrify/bloggrify/commit/51bb927))
- Fix all eslint errors ([698cfda](https://github.com/bloggrify/bloggrify/commit/698cfda))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>
- IO-Fire ([@IO-Fire](https://github.com/IO-Fire))

## v1.7.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.5...v1.7.0)

### 🚀 Enhancements

- Upgrade social share module and benefit from bluesky share feature ([448a0c5](https://github.com/bloggrify/bloggrify/commit/448a0c5))

### 🩹 Fixes

- Warning about non inheritable attributes ([9423b9d](https://github.com/bloggrify/bloggrify/commit/9423b9d))
- Seo meta tags ([6531338](https://github.com/bloggrify/bloggrify/commit/6531338))
- Wrong html markup ([7d9120b](https://github.com/bloggrify/bloggrify/commit/7d9120b))

### 🏡 Chore

- Update dependencies ([a2b5d9a](https://github.com/bloggrify/bloggrify/commit/a2b5d9a))
- **release:** V1.6.0 ([caa5bba](https://github.com/bloggrify/bloggrify/commit/caa5bba))
- Update dependencies (again) ([fcc7e8f](https://github.com/bloggrify/bloggrify/commit/fcc7e8f))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>
- IO-Fire ([@IO-Fire](https://github.com/IO-Fire))

## v1.6.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.5...v1.6.0)

### 🚀 Enhancements

- Upgrade social share module and benefit from bluesky share feature ([448a0c5](https://github.com/bloggrify/bloggrify/commit/448a0c5))

### 🩹 Fixes

- Warning about non inheritable attributes ([9423b9d](https://github.com/bloggrify/bloggrify/commit/9423b9d))
- Seo meta tags ([6531338](https://github.com/bloggrify/bloggrify/commit/6531338))
- Wrong html markup ([7d9120b](https://github.com/bloggrify/bloggrify/commit/7d9120b))

### 🏡 Chore

- Update dependencies ([a2b5d9a](https://github.com/bloggrify/bloggrify/commit/a2b5d9a))

### ❤️ Contributors

- Hugo Lassiège <hlassiege@gmail.com>
- IO-Fire ([@IO-Fire](https://github.com/IO-Fire))

## v1.5.0

Never released (skipped)

## v1.4.4

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.3...v1.4.4)

### 📦 Build

- Add dependency to playwright for build purpose ([f1480c5](https://github.com/bloggrify/bloggrify/commit/f1480c5))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.4.3

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.2...v1.4.3)

### 🩹 Fixes

- Bug related to https://github.com/nuxt/content/issues/2711 ([c4d72fa](https://github.com/bloggrify/bloggrify/commit/c4d72fa))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.4.2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.1...v1.4.2)

### 📦 Build

- Add files to the final package ([297da67](https://github.com/bloggrify/bloggrify/commit/297da67))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.4.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.4.0...v1.4.1)

### 🩹 Fixes

- Fix toc links ([1c9b23e](https://github.com/bloggrify/bloggrify/commit/1c9b23e))
- Colors in dark mode for mermaid and custom components ([4174719](https://github.com/bloggrify/bloggrify/commit/4174719))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.4.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.3.2...v1.4.0)

### 🚀 Enhancements

- Add copy paste ability to all block of code and add the filename if available on top of the block ([5e6ee80](https://github.com/bloggrify/bloggrify/commit/5e6ee80))
- Add new custom component to show markdown and preview all together ([dfd5391](https://github.com/bloggrify/bloggrify/commit/dfd5391))
- Add new custom component : code group to display several files grouped alltogether ([5e52b1e](https://github.com/bloggrify/bloggrify/commit/5e52b1e))
- Add support for mermaid graphs ([34d998f](https://github.com/bloggrify/bloggrify/commit/34d998f))
- Expand table of content with H3 headers (optional) See https://github.com/bloggrify/bloggrify/issues/2 ([0840cbe](https://github.com/bloggrify/bloggrify/commit/0840cbe))
- Add style configuration to the MDD component ([0b660cb](https://github.com/bloggrify/bloggrify/commit/0b660cb))
- Add style configuration to the code group component ([b889016](https://github.com/bloggrify/bloggrify/commit/b889016))
- Add style configuration to alert component ([a135e6c](https://github.com/bloggrify/bloggrify/commit/a135e6c))

### 🩹 Fixes

- Twitter thread embedding was not working correctly ([db5ae9d](https://github.com/bloggrify/bloggrify/commit/db5ae9d))
- Weird behaviour with alert component ([568a9df](https://github.com/bloggrify/bloggrify/commit/568a9df))

### 📦 Build

- Add github action to check the application builds correctly after each commit ([5dab332](https://github.com/bloggrify/bloggrify/commit/5dab332))

### 🎨 Styles

- Some styling for the default theme ([af60d82](https://github.com/bloggrify/bloggrify/commit/af60d82))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.3.2

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.3.1...v1.3.2)

### 🩹 Fixes

- Revert refactoring that breaks the website with "nuxt instance called outside of a plugin" ([69f0dd9](https://github.com/bloggrify/bloggrify/commit/69f0dd9))
- Add title to automatic pages ([7bc7aac](https://github.com/bloggrify/bloggrify/commit/7bc7aac))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.3.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/v1.3.0...v1.3.1)

### 🩹 Fixes

- This control don't work with folder presents in extended module... ([2312532](https://github.com/bloggrify/bloggrify/commit/2312532))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.3.0

[compare changes](https://github.com/bloggrify/bloggrify/compare/1.0.0...v1.3.0)

### 🚀 Enhancements

- Add the possibility for each theme to not have pagination ([58fe387](https://github.com/bloggrify/bloggrify/commit/58fe387))
- /archives is now a special page. Pagination is managed automatically ([9f4ebc9](https://github.com/bloggrify/bloggrify/commit/9f4ebc9))
- Simplify analytics integration. Analytics are now configurable from app.config.ts ([5c9ff52](https://github.com/bloggrify/bloggrify/commit/5c9ff52))
- Detect if the user tries to start bloggrify without a theme folder ([20509e6](https://github.com/bloggrify/bloggrify/commit/20509e6))
- Add support for mathematical formulas ([a69e5eb](https://github.com/bloggrify/bloggrify/commit/a69e5eb))
- Add very basic default layout to avoid errors for all people starting directly with this repository ([e63d4a7](https://github.com/bloggrify/bloggrify/commit/e63d4a7))

### 📖 Documentation

- Add a big warning on startup when someone try to use bloggrify without any content ([be86263](https://github.com/bloggrify/bloggrify/commit/be86263))
- Small shoutout to Blogtally ([0437712](https://github.com/bloggrify/bloggrify/commit/0437712))

### 📦 Build

- Break the build if the content folder is missing ([a634ead](https://github.com/bloggrify/bloggrify/commit/a634ead))
- Add github repository information to package.json ([d397522](https://github.com/bloggrify/bloggrify/commit/d397522))

### 🏡 Chore

- Upgrade nuxt version ([920585e](https://github.com/bloggrify/bloggrify/commit/920585e))
- Transfer repository to bloggrify ([6aa252a](https://github.com/bloggrify/bloggrify/commit/6aa252a))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

## v1.2.1

[compare changes](https://github.com/bloggrify/bloggrify/compare/1.0.0...v1.2.1)

### 📖 Documentation

- Add a big warning on startup when someone try to use bloggrify without any content ([be86263](https://github.com/bloggrify/bloggrify/commit/be86263))

### 📦 Build

- Break the build if the content folder is missing ([a634ead](https://github.com/bloggrify/bloggrify/commit/a634ead))
- Add github repository information to package.json ([d397522](https://github.com/bloggrify/bloggrify/commit/d397522))

### 🏡 Chore

- Upgrade nuxt version ([920585e](https://github.com/bloggrify/bloggrify/commit/920585e))

### ❤️ Contributors

- Hlassiege <hlassiege@gmail.com>

