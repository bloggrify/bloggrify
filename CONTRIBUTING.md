# Contributing to Bloggrify

Thanks for taking the time to contribute.

## Where to open an issue

Bloggrify is split across several repositories:

| Repository | Scope |
|---|---|
| [bloggrify](https://github.com/bloggrify/bloggrify) | the engine, and the bundled `minimalist` theme |
| [bloggrify-mistral](https://github.com/bloggrify/bloggrify-mistral) | Mistral theme |
| [bloggrify-bento](https://github.com/bloggrify/bloggrify-bento) | Bento theme |
| [bloggrify-epoxia](https://github.com/bloggrify/bloggrify-epoxia) | Epoxia theme |
| [bloggrify.com](https://github.com/bloggrify/bloggrify.com) | website and documentation |

Open the issue in the repository the problem belongs to. If a rendering bug shows up in
a theme but the cause is in the engine, `bloggrify` is the right place.

## Local setup

Requirements: Node.js `^22.12.0 || ^24.11.0 || >=26.0.0` (Nuxt 4), and npm.

The `content/` directory is a git submodule holding the demo content. Without it the
dev server starts on an empty site:

```bash
git clone --recurse-submodules https://github.com/bloggrify/bloggrify.git
cd bloggrify
npm install
npm run dev
```

If you already cloned without `--recurse-submodules`:

```bash
git submodule update --init
```

The dev server runs on [http://localhost:3000](http://localhost:3000) with the bundled
`minimalist` theme.

Build and preview the static output:

```bash
npm run generate
npm run preview
```

### Editor support

The repository ships VS Code configuration: recommended extensions for Nuxt, Tailwind CSS
and TypeScript, plus client and server debug configurations. They are optional, and
suggestions for the extension list are welcome. See the
[VS Code debugging documentation](https://code.visualstudio.com/docs/editor/debugging) and
the [Nuxt debugging guide](https://nuxt.com/docs/guide/going-further/debugging).

For JetBrains IDEs, use the
[configuration from the Nuxt guide](https://nuxt.com/docs/guide/going-further/debugging#example-jetbrains-ides-debug-configuration).

## Before opening a pull request

```bash
npm run lint
npm run typecheck
```

Both must pass. There is no test suite yet, so describe how you checked your change.

## Commit messages

Bloggrify follows [Conventional Commits](https://www.conventionalcommits.org/), in English,
one line, lowercase description, no trailing period:

```
feat: add composable to find surrounded and related content
fix: tags page were broken
docs: add recipe to use ai
chore: update dependencies
```

Types in use: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
`chore`, `revert`.

## Conventions in the codebase

A few rules the project holds to. A pull request that breaks one of them will be asked
to change:

- **No business logic in themes.** Data fetching and content logic live in the engine. A theme
  that fetches its own data would have to be duplicated in every other theme.
- **Composables over page-level code.** Shared logic goes in `app/composables`.
- A theme does not have to implement every page. `invalid.vue` is the fallback when a layout
  is missing.

## License

By contributing you agree that your contribution is licensed under the MIT license.
