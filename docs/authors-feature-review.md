# Revue de la feature "Auteurs"

Audit réalisé le 2026-07-17 sur `bloggrify` (core) et les thèmes `bloggrify-bento`, `bloggrify-epoxia`, `bloggrify-mistral`.

Ce document est un plan de travail réutilisable d'une session à l'autre. Les cases à cocher indiquent l'avancement. Les chemins sans préfixe de dépôt sont relatifs à `bloggrify` (le core) ; les autres sont préfixés par le nom du dépôt.

**Dernière mise à jour : 2026-07-17, fin du lot 1 + N2 + P18.**

---

## 0. Tableau de bord

### Feature auteurs (détail en sections 2 et 2 bis, plan en section 3)

| # | Problème | État | Lot |
|---|---|---|---|
| P1 | Pages auteurs cassées sur les 3 thèmes | ✅ Fait | 1 |
| P2 | Prerender des routes auteurs | ✅ Clos sans code (infaisable et inutile) | 1 |
| P3 | Contenu de démo désaligné avec la config | ✅ Fait | 1 |
| P4 | Fallback asymétrique et silencieux | ✅ Fait (warn dev) | 1 |
| P5 | Deux sources d'identité concurrentes | ⬜ À faire | 3 |
| P6 | Le typage ment (3 vérités) | ⬜ À faire | 3 |
| P7 | Auteur absent du SEO (schema.org, RSS, OG) | ⬜ À faire | 2 |
| P8 | Un seul auteur par article | ⬜ À faire | 3 |
| P9 | Rendu des socials dupliqué dans les thèmes | ⬜ À faire | 2 |
| P10 | Déréférencements non gardés (crash potentiel) | ✅ Fait | 1 |
| P11 | Contrat incohérent entre pages de listing | ⬜ À faire | 3 |
| P12 | Page `/authors` manquante | ⬜ À faire | 2 |
| P13 | Core publié ne propage pas le type `Author` | 🟡 Contourné, à nettoyer après release | 3 |
| P14 | Core publié casse le build de Mistral | 🟡 Déjà fixé dans le git du core, à vérifier après release | 3 |
| P15 | `BentoListing` / `EpoxiaListing` ignoraient `author` | ✅ Fait | 1 |
| P16 | Le core référence 2 images inexistantes | ⬜ À faire (inerte) | 3 |
| P17 | `bluesky` rendu mais absent du type | ⬜ À faire | 3 |
| P18 | Le fallback s'applique à l'affichage mais pas au listing | ✅ Fait | 1 |

P13 à P17 ont été découverts pendant le lot 1, voir la section 2 bis. P18 a été découvert pendant la session N2, voir la section 2 ter.

### Notes annexes, hors périmètre auteurs (détail en section 4)

Aucune n'est corrigée. Collectées pendant la session du lot 1.

| # | Note | Gravité | Dépôt concerné |
|---|---|---|---|
| N1 | Le bug de P1 à l'identique pour les **catégories** : pas de `category.vue` sur minimalist (thème par défaut) ni Mistral | 🔴 Feature cassée, masquée par l'absence de `category:` dans le contenu | core, mistral |
| N2 | `fallback='invalid'` renvoie une erreur développeur au visiteur au lieu d'une 404 | ✅ Fait (404 + warn dev) | core |
| N3 | `sharing_networks` rangé dans `socials` alors que ce n'en est pas un, casse le typage des thèmes | 🟠 Erreur de typecheck réelle | core (+ tous les thèmes) |
| N9 | Le template publié sur npm embarque `url: 'https://minimalist.bloggrify.com/'` | 🟠 Impact SEO sur chaque nouveau blog | core (`SAMPLE.app.config.ts`) |
| N4 | Dette de typecheck des thèmes : Bento 42, Epoxia 24, Mistral 31, core 0 | 🟡 Aucune CI ne la retient | les 3 thèmes |
| N8 | `useAuthor()` est mort, seul le `findAuthor` **déprécié** est utilisé. `hasAuthor` jamais appelé | 🟡 La dépréciation est à l'envers de l'usage | core |
| N5 | Warnings CSS `Expected ";" but found "}"` à chaque build | 🟡 Bruit permanent | core + thèmes |
| N6 | Fichiers parasites : `nul` à la racine de la galaxie, `bash.exe.stackdump` ×2 | ⚪ Cosmétique | galaxie, core, bloggrify.com |
| N7 | `// FIXME : remove when updated to the latest version` sur `url` | ⚪ À trancher à la prochaine montée de version | mistral |

**N1 et N2 relèvent du lot 1 par nature** (feature cassée). N2 est fait. **N1 reste le meilleur candidat à traiter ensuite** si on ne passe pas directement au lot 2, mais il n'est plus urgent : N2 lui a retiré son impact visiteur.

---

## 1. État des lieux

### Comment la feature est construite aujourd'hui

Le principe est sain : un tableau `authors` dans `app.config.ts`, un champ `author: z.string()` en frontmatter qui sert de clé étrangère vers `username`, et un composable qui centralise la résolution.

**Définition du type** : `app/types/app-config.d.ts:4-20`, en augmentation de `@nuxt/schema`.

```ts
declare module '@nuxt/schema' {
  type Author = {
    default?: boolean
    username?: string
    name?: string
    description?: string
    avatar?: string
    socials?: {
      twitter?: string
      twitter_username?: string
      mastodon?: string
      youtube?: string
      linkedin?: string
      facebook?: string
      instagram?: string
      github?: string
    }
  }
```

`AppConfig` déclare `authors: Array<Author>` (requis, non optionnel) à la ligne 97.

Le type est propagé aux thèmes consommateurs par le module `modules/bloggrify/index.ts:19-21` :

```ts
nuxt.hook('prepare:types', ({references}) => {
    references.push({path: resolve('../../app/types/app-config.d.ts')})
})
```

**Résolution** : `app/composables/useAuthor.ts` est le point unique.

```ts
const findAuthor = (authorId?: string): Author | undefined => {
    if (!authorId) {
        // Return default author if no authorId provided
        return config.authors?.find((author: Author) => author.default)
    }
    return config.authors?.find((author: Author) => author.username === authorId)
}
```

Le fichier expose aussi `hasAuthor` (lignes 24-26) et un `findAuthor` top-level déprécié (lignes 35-38) conservé pour rétrocompatibilité. C'est ce wrapper que tous les thèmes utilisent en pratique via l'auto-import.

**Schéma de contenu** : `content.config.ts:45`, dans la collection `page` : `author: z.string().optional()`.

**Page auteur** : `app/pages/authors/[...username].vue` existe bien en core. Elle gère la pagination (`/authors/username/page/2`), résout l'auteur, fait un 404 si introuvable, pose le SEO, et délègue à `themes-${configTheme}-author` avec `fallback='invalid'`. La pagination fonctionne parce que `app/composables/usePagination.ts` dérive la page depuis `route.path.match(/\/page\/(\d+)$/)`.

**Layout auteur** : `app/layouts/themes/minimalist/author.vue` (avatar, nom, description, socials en SVG inline, puis `MinimalistListing` filtré par auteur).

**Filtrage** : `app/composables/useContentListing.ts`, option `author?: string` (ligne 19), clé de cache `author-${author}` (ligne 91), filtre lignes 113-115 :

```ts
if (author) {
  query = query.where('author', '=', author)
}
```

**SEO** : `app/pages/[...slug].vue:86-94` construit un `Person` schema.org, injecté dans `defineArticle` (lignes 100-108) et dans les meta `author` / `articleAuthor` (lignes 124-125).

**CLI** : `cli/utils/author.ts` (`getAllAuthors`, `addAuthor`), `cli/commands/author.ts`, `cli/index.ts:82-98` (`bloggrify author list|add`), `cli/commands/new.ts:57-70` (option `-a, --author`), `cli/commands/validate.ts:63-64` et `86-87`, `cli/commands/stats.ts:96-98`, `cli/utils/config.ts:8-34`.

### Constat principal

Contrairement à l'impression initiale, **les pages auteurs existent**. Le problème est qu'elles n'existent que pour `minimalist`, et que la feature est annoncée comme disponible sur des thèmes où elle ne fonctionne pas.

---

## 2. Problèmes identifiés, par gravité

> ⚠️ **Cette section décrit l'état AVANT le lot 1** et sert de mémoire du diagnostic. Chaque problème porte son état actuel. Les corrections d'analyse sont en section 2 bis.

### P1. Les pages auteurs sont cassées sur les 3 thèmes publiés

> ✅ **RÉSOLU (lot 1).** `author.vue` créé dans les 3 thèmes, liens posés. Le passage ci-dessous décrit l'état d'origine.

`app/pages/authors/[...username].vue` résout `themes-${configTheme}-author`. Or aucun des trois thèmes n'a de layout `author.vue` :

- `bloggrify-bento/app/layouts/themes/bento/` : `archives`, `category`, `default`, `home`, `portfolio`, `tag`
- `bloggrify-epoxia/app/layouts/themes/epoxia/` : `archives`, `category`, `default`, `home`, `portfolio`, `tag`
- `bloggrify-mistral/app/layouts/themes/mistral/` : `archives`, `default`, `home`, `tag`

Le `fallback='invalid'` renvoie donc vers `app/layouts/invalid.vue`, qui fait délibérément un `createError({ name: 'Invalid layout', fatal: false, statusMessage: 'Invalid layout' })`. Concrètement, `/authors/hlassiege` sur Mistral affiche une page d'erreur.

Aggravant : `bloggrify-mistral/content/2025/version-3-0.md:30` annonce aux utilisateurs de Mistral que « Author pages are automatically generated based on the authors you define in your app.config.ts file ». On documente une feature qui ne marche pas sur le thème concerné. Le `CHANGELOG.md:104` liste « Author pages » comme livré en 3.0.

Second aggravant : aucun de ces thèmes ne pose de lien vers `/authors/...`. Seul `app/components/minimalist/MinimalistAuthorBio.vue:7` le fait. En déploiement statique (le seul mode supporté), le crawler Nitro ne découvre donc jamais la route et ne la prérend pas. Ajouter le layout ne suffira pas, il faut aussi le lien ou le prerender explicite (voir P2).

### P2. Le prerender des routes auteurs n'est pas garanti

> ✅ **CLOS SANS CODE (lot 1).** L'analyse ci-dessous est **erronée** : le hook proposé est infaisable (`appConfig` indisponible au build) et inutile (le crawl suffit). Voir la correction en section 2 bis avant d'y retoucher.

`nuxt.config.ts:108-110` ne liste que `/rss.xml` dans `nitro.prerender.routes`. Les pages auteurs ne sortent que par crawl des liens. C'est fragile alors que la liste des auteurs est connue statiquement au moment du build.

Un hook `nitro:config` qui énumère `config.authors` et pousse `/authors/${username}` (plus les `/page/N` selon le nombre d'articles) rendrait le prerender déterministe et indépendant du fait qu'un thème pose ou non un lien. C'est la même mécanique qui servira pour un futur index `/authors`.

À noter : `@nuxtjs/sitemap` est configuré avec `zeroRuntime: true` (`nuxt.config.ts:54-56`) et aucune source auteur. Les pages auteurs sont donc absentes du sitemap.

### P3. Le contenu de démo ne correspond pas à la config

> ✅ **RÉSOLU (lot 1)**, mais le tableau ci-dessous est **partiellement faux** : Bento et Epoxia n'étaient pas concernés. Voir la correction en section 2 bis.

Le submodule `content` utilise `author: "hlassiege"` dans tous ses articles (`content/2025/version-3-0.md:3`, `version-2-0.md`, `version-2-1.md`, `new-custom-component.md`).

Mais les configs déclarent :

| Dépôt | `username` déclaré | `default: true` |
|---|---|---|
| `bloggrify` (core) | `john-doe` (`app/app.config.ts:52`) | oui (ligne 51) |
| `bloggrify-bento` | `john-doe` (`app/app.config.ts:68`) | oui (ligne 67) |
| `bloggrify-epoxia` | `john-doe` (`app/app.config.ts:55`) | oui (ligne 54) |
| `bloggrify-mistral` | `hlassiege` (`app/app.config.ts:52`) | oui (ligne 54) |

Seul Mistral est aligné. Sur la démo du core, sur Bento et sur Epoxia, `findAuthor('hlassiege')` retourne `undefined` : la bio, le `Person` schema.org et les meta `author` disparaissent silencieusement. La vitrine tourne avec la feature désactivée sans que personne ne le voie. C'est P4 qui explique pourquoi ça n'a pas été détecté.

`app/SAMPLE.app.config.ts:48-68` contient le même bloc `john-doe` que `app/app.config.ts:48-68`.

### P4. Le fallback est asymétrique et silencieux

> ✅ **RÉSOLU (lot 1)** côté signalement : un `console.warn` en dev liste les usernames connus quand un auteur ne résout pas. **Le comportement lui-même n'a pas changé** : un auteur inconnu retourne toujours `undefined` sans fallback. C'était volontaire (un fallback silencieux masquerait la faute de frappe), mais reste discutable.

```ts
if (!authorId) return config.authors?.find(a => a.default)  // fallback
return config.authors?.find(a => a.username === authorId)   // pas de fallback
```

- Auteur **absent** du frontmatter : fallback sur l'auteur `default: true`. Si aucun auteur n'est marqué `default`, retourne `undefined`.
- Auteur **inconnu** (faute de frappe, ou config désalignée) : retourne `undefined`, sans fallback.

En aval, tout le monde fait `v-if="author"` (`app/layouts/themes/minimalist/default.vue:21`, les `AuthorCard` des thèmes) ou laisse `schemaAuthor` undefined (`app/pages/[...slug].vue:89-94`). L'utilisateur perd sa bio et son SEO sans aucun signal. Seule `/authors/{inconnu}` fait un vrai 404.

`bloggrify validate` détecte le cas (`cli/commands/validate.ts:63-64` : `Author '${post.author}' not found in app.config.ts`), mais seulement si on le lance. Un `console.warn` en dev quand un `authorId` non vide ne résout pas coûterait trois lignes et aurait attrapé P3 immédiatement.

### P5. Deux sources d'identité concurrentes

Il y a le bloc racine `name` / `avatar` / `description` / `socials` (`app/app.config.ts:8-27`, identité du **site**) et le tableau `authors`. Les thèmes piochent dans les deux :

| Composant | Source |
|---|---|
| `bloggrify-bento/app/components/themes/bento/AuthorCard.vue:49-51` | `findAuthor(props.author)` |
| `bloggrify-epoxia/app/components/themes/epoxia/AuthorCard.vue:47-49` | `findAuthor(props.author)` |
| Les 3 `ArticleHeader` (bento:33, epoxia:38, mistral:72) | `findAuthor(article.author)` |
| `bloggrify-bento/app/components/content/BentoAuthorCard.vue` | `useAppConfig()` racine (site) |
| `bloggrify-mistral/app/components/themes/mistral/MistralFooter.vue:29` | `config.socials` (site) |
| `bloggrify-mistral/app/components/content/MistralSideAuthorCard.vue:27` | `findAuthor()` sans argument (auteur par défaut) |
| `bento/portfolio.vue:6` et `epoxia/portfolio.vue:4` | `AuthorPortfolioHeader` sans prop, donc `findAuthor(undefined)` |

Pour un blog mono-auteur, on configure son identité deux fois. Et deux composants presque homonymes (`BentoAuthorCard` en `components/content/` vs `AuthorCard` en `components/themes/bento/`) affichent des données de sources différentes.

Le commentaire de `bloggrify-bento/app/app.config.ts:11-12` assume ce mélange : « If you only have one author, you can set the author here / It will be used as the default author for all posts AND as the general logo/description/socials for the website ».

Piste : faire dériver l'identité du site de l'auteur `default: true` quand elle n'est pas explicitement fournie, ou assumer franchement la séparation avec des noms qui ne se ressemblent pas.

### P6. Le typage ment (trois vérités pour un même objet)

- `Author.username` est `optional` alors que c'est la clé de résolution **et** le segment d'URL.
- `AppConfig.authors` est déclaré non optionnel (`app/types/app-config.d.ts:97`) mais tout le code fait `config.authors?.`.
- `cli/utils/author.ts:5-21` redéfinit sa **propre** interface `Author` où `username` / `name` / `description` / `avatar` sont **requis**.

Corollaires dans le CLI :

- `cli/utils/config.ts:20` : `getDefaultAuthor()` prend le **premier** `username:` du tableau, pas celui marqué `default: true` :
  ```ts
  const defaultAuthorMatch = authorsMatch[1].match(/username:\s*['"]([^'"]+)['"]/m)
  ```
  Dès que l'auteur par défaut n'est pas en première position, le CLI et le runtime divergent.
- `cli/utils/author.ts:32` et `cli/utils/config.ts:14` parsent le même tableau avec des regex différentes (`/authors:\s*\[([\s\S]*?)\n\s*\]/m` vs `/authors:\s*\[([\s\S]*?)\]/m`). La seconde est non-greedy jusqu'au **premier** `]`, donc elle tronque au premier crochet imbriqué.

### P7. L'auteur est absent partout où il aurait de la valeur SEO

- **RSS** : `server/routes/rss.xml.ts` ne lit jamais `author`. `feed.addItem({...})` (lignes 33-41) passe title/id/link/description/date/image uniquement. Pas de `<author>` ni de `<dc:creator>`.
- **OG images** : `app/components/OgImage/BlogPost.satori.vue` n'accepte que `title` et `description`. `defineOgImage('BlogPostSatori', {...})` (`app/pages/[...slug].vue:150-153`) ne passe pas l'auteur.
- **Schema.org** : le `Person` de `app/pages/[...slug].vue:89-94` ne pose que `name`. Ni `url` vers `/authors/{username}`, ni `sameAs` avec les socials.

Le `sameAs` + `url` est le gain le plus facile du lot : les données sont déjà là, il n'y a qu'à les mapper.

### P8. Un seul auteur par article

`content.config.ts:45` : `author: z.string().optional()`. Pas de support des articles co-écrits, pourtant courant en blogging. Passer à `z.union([z.string(), z.array(z.string())])` est peu coûteux maintenant, beaucoup plus tard (ça touche `useContentListing`, tous les `ArticleHeader`, le schema.org et le CLI).

### P9. Duplication qui viole la règle "pas de logique métier dupliquée dans les thèmes"

Chaque thème réimplémente le rendu des socials avec ses propres SVG inline :

- `app/layouts/themes/minimalist/author.vue:29-62` rend 4 réseaux sur 8 (`twitter`, `github`, `linkedin`, `mastodon`). `youtube`, `facebook` et `instagram` sont dans le type mais jamais rendus.
- `bloggrify-epoxia/app/components/themes/epoxia/AuthorPortfolioHeader.vue:23-127` en rend 6 (le plus complet de la galaxie).
- Bento délègue à `BentoPostAuthorSocialLinks`.

Le mapping social → icône → URL n'a rien de thématique. Il devrait vivre dans un composant core que les thèmes stylent.

### P10. Deux fragilités concrètes (crash potentiel)

> ✅ **RÉSOLU (lot 1).** `MistralSideAuthorCard` enveloppé dans `<template v-if="author">`, `v-if` d'Epoxia passés en `author.socials?.`. Bonus : le `NuxtImg` de `mistral/ArticleHeader` est désormais gardé par `v-if="author.avatar"`.

- `bloggrify-mistral/app/components/content/MistralSideAuthorCard.vue:4,18` lit `author.avatar` et `author.socials` **sans garde** à la racine du template, alors que `findAuthor()` sans argument retourne `undefined` si aucun auteur n'a `default: true`. Ce composant est rendu sur la home (`layouts/themes/mistral/home.vue:8`).
- `bloggrify-epoxia/app/components/themes/epoxia/AuthorPortfolioHeader.vue` déréférence `author.socials.x` sans optional chaining alors que `socials` est optionnel dans le type.

### P11. Incohérence de contrat entre les pages de listing

`app/pages/authors/[...username].vue` résout l'objet et passe `:author="author"` (un objet `Author`) au layout. `app/pages/tags/[...slug].vue` et `app/pages/categories/[...slug].vue` passent une **string** brute.

Le choix de la page auteur est le bon au regard de la règle « pas de data fetching dans les thèmes ». Mais alors les `ArticleHeader` des thèmes ne devraient pas appeler `findAuthor` eux-mêmes : la résolution devrait descendre depuis le layout `default.vue`, comme le fait déjà `app/layouts/themes/minimalist/default.vue:40`.

### P12. Il manque `/authors`

Pas de page listant les auteurs. Sur un blog multi-auteurs, les pages auteurs ne sont atteignables que depuis un article. L'arbre des pages est exactement : `[...slug].vue`, `archives/[...slug].vue`, `authors/[...username].vue`, `categories/[...slug].vue`, `tags/[...slug].vue`.

---

## 2 bis. Corrections d'analyse et découvertes faites pendant le lot 1

Cette section corrige des erreurs de l'audit initial et enregistre ce que l'implémentation a révélé. **Lire avant de se fier à la section 2.**

### Correction de P3 : Bento et Epoxia n'étaient PAS concernés

L'audit affirmait que le core, Bento et Epoxia étaient cassés. Faux. Le submodule `blog-content` n'est utilisé que par **le core et Mistral** (`.gitmodules`). Bento et Epoxia ont leur **propre** `content/` local (12 et 11 fichiers) sans **aucun** champ `author` : ils tombent donc sur le fallback par défaut `john-doe`, qui résout. Seul le core était réellement cassé.

Nuance utile : dans le submodule, seuls les 4 articles de 2025 portent `author:`. Ceux de 2024 n'en ont pas et passent par le fallback.

### Correction de P2 : le hook était infaisable ET inutile

Deux constats vérifiés empiriquement, à ne pas re-tenter :

1. **`nuxt.options.appConfig` ne contient PAS `app.config.ts` au build.** Sonde posée dans un hook `nitro:config` : `authors = undefined`, `keys = ["nuxt","ui","icon"]` (uniquement les défauts fournis par les modules). Le hook « énumérer `config.authors` au build » est donc impossible sans ajouter un parser d'`app.config.ts`, ce qui ferait un **troisième** parser après les deux du CLI (cf. P6c). Rejeté.
2. **Le crawl suffit.** `nuxt generate` produit `/authors/hlassiege/` dès que P3 rend l'auteur résolvable, parce que `MinimalistAuthorBio` pose le lien et que `crawlLinks` le suit. C'est exactement le mécanisme des tags et catégories, qui ne sont pas non plus dans `prerender.routes`.

**Gap résiduel accepté** : un auteur sans aucun article n'est jamais lié, donc jamais généré. Identique au cas d'un tag inutilisé. Non traité.

### Nouveau P13 : le core 3.1.2 publié ne propage pas le type `Author` aux thèmes

Le hook `prepare:types` de `modules/bloggrify/index.ts:19-21` **n'existe que dans le git du core**, pas dans le 3.1.2 publié que les 3 thèmes consomment (`grep -c "prepare:types"` = 0 sur `node_modules/@bloggrify/core`). Le 3.1.2 ship pourtant bien `app/types/app-config.d.ts`, mais rien ne le référence côté thème.

Conséquence : dans un thème, `import type { Author } from '@nuxt/schema'` échoue avec `TS2305: Module '"@nuxt/schema"' has no exported member 'Author'`. Personne ne l'avait vu parce qu'**aucun** composant de thème ne nomme le type : ils passent tous par l'inférence de `findAuthor`.

Contournement en place dans les 3 `author.vue`, à retirer après la prochaine release du core :
```ts
type Author = NonNullable<ReturnType<typeof findAuthor>>
```
Il dérive de la même source de vérité (pas de duplication du type, contrairement à ce que fait le CLI en P6b).

### Nouveau P14 : le core 3.1.2 publié casse le build de Mistral

`node_modules/@bloggrify/core/app/components/CommentSystem.vue:4` fait :
```
:website-id="config.comments?.hyvor_talk.website_id"
```
L'optional chaining s'arrête à `comments` et ne couvre pas `hyvor_talk`. Mistral a `provider: 'hakanai'` et son bloc `hyvor_talk` est commenté, donc `hyvor_talk` est `undefined` → `Cannot read properties of undefined (reading 'website_id')` sur **toutes** les pages d'articles → `nuxt generate` sort en erreur.

**Déjà corrigé dans le git du core** (`app/components/CommentSystem.vue` a bien `hyvor_talk?.website_id`), donc ça se résoudra à la prochaine release. Aucune action à faire sur le core. À vérifier après release.

### Nouveau P15 : `BentoListing` et `EpoxiaListing` avaient oublié l'option `author`

Les deux re-wrappent `useContentListing` et ne forwardaient que `category` / `tag` / `prefix`, alors que le core supporte `author`. Corrigé dans le lot 1. Illustration directe de P9 : chaque thème réimplémente un wrapper et perd des options au passage. `MistralListing` n'existe pas, Mistral utilise directement `MinimalistListing` du core, et n'avait donc pas le problème.

### Nouveau P16 : le core référence deux images inexistantes (inerte)

`app/app.config.ts` et `SAMPLE.app.config.ts` déclarent `logo: '/images/logo.png'` et `avatar: '/images/profile-john.jpg'`. Or `public/images/` du core ne contient que `logo.svg`. Aucun des deux fichiers n'existe.

**Sans effet visible** : `logo` et `avatar` ne sont lus **nulle part** dans le code du core (`minimalist` n'affiche que `config.name`), ils ne sont consommés que par les thèmes, qui ont leurs propres configs et images. C'est de la config morte et trompeuse. Pour cette raison l'entrée auteur du core créée en P3 **omet `avatar`** plutôt que de pointer vers un fichier absent.

### Nouveau P17 : `bluesky` est rendu par les thèmes mais absent du type `Author`

`bloggrify-mistral/app/app.config.ts:59` déclare `socials.bluesky` sur un auteur, et `MistralAuthorCardSocialLinks` sait le rendre (idem `BentoPostAuthorSocialLinks`). Mais le type `Author.socials` de `app/types/app-config.d.ts:10-19` ne déclare pas `bluesky`. À intégrer dans P6a/P9.

### P5 est devenu visible sur la démo du core

Après P3, la page auteur du core affiche « Hugo », mais le `<h1>` du header affiche toujours « John Doe » (c'est `config.name`, l'identité **site**). Le blog sert donc de vrais articles Bloggrify signés Hugo sous un titre « John Doe ». Mistral fait ça proprement : `name: 'Bloggrify'` (le blog) + auteur « Hugo ». **Décision volontairement non prise** dans le lot 1 : renommer `config.name` du core est visible sur `minimalist.bloggrify.com` et relève de P5 (lot 3).

### Baselines de typecheck (pour mesurer une régression)

Les thèmes ont des erreurs de typecheck pré-existantes. Toute comparaison future doit partir de là : **Bento 42, Epoxia 24, Mistral 31, core 0.** Méthode : `git stash -u` puis `npx nuxt typecheck` pour obtenir la baseline, comparer, `git stash pop`.

## 2 ter. Découvertes de la session N2 (2026-07-17)

### Nouveau P18 : le fallback s'appliquait à l'affichage mais pas au listing

> ✅ **RÉSOLU.** Trouvé en regardant `/authors/john-doe` sur la démo en ligne, qui listait 0 article.

Deux chemins de code appliquaient deux règles différentes pour un même article :

```ts
// Affichage, minimalist/default.vue:40
const author = computed(() => findAuthor(props.doc?.author))   // pas d'auteur -> auteur par défaut

// Listing, useContentListing.ts:113 (avant correctif)
query = query.where('author', '=', author)                      // NULL ne matche jamais un username
```

Un article sans champ `author` **affichait** l'auteur par défaut grâce au fallback de `findAuthor`, mais n'apparaissait **jamais** sur la page de cet auteur, la requête comparant une colonne nulle à une chaîne. Sur la démo du core : 10 articles affichent « Hugo », sa page en listait 4.

**Ce n'est pas un problème de démo mais de framework** : tout blog mono-auteur qui fait ce que le fallback l'invite à faire, ne pas répéter `author:` dans chaque article, obtient une page auteur vide alors que chaque article porte son nom.

**Correctif** : quand le filtre porte sur l'auteur marqué `default: true`, le listing matche aussi les articles sans auteur. La règle devient « le fallback fait partie de la résolution, donc il s'applique partout ou nulle part ».

```ts
if (author === defaultAuthorUsername) {
  query = query.orWhere(q => q.where('author', '=', author).where('author', 'IS NULL'))
} else {
  query = query.where('author', '=', author)
}
```

L'auteur par défaut est dérivé via `useAuthor().findAuthor()` sans argument, donc sans dupliquer la règle du fallback. C'est le **premier appelant réel de `useAuthor()`**, ce qui entame la résorption de N8.

**Piège lié, vérifié et écarté** : le filtre de visibilité juste en dessous ressemble à un bug mais n'en est pas un. Dans `@nuxt/content`, `orWhere(q => q.where(a).where(b))` produit `(a OR b)` (`query.js:53`), et les conditions successives sont jointes par AND (`query.js:132`). Le SQL final est donc `(author = X OR author IS NULL) AND (listed = true OR listed IS NULL) AND (draft = false OR draft IS NULL)`. Ne pas « corriger » ce passage.

**Le lot 1 est passé à côté** : sa validation notait « 4 articles listés » comme un succès, sans voir que 6 autres articles affichaient Hugo sans figurer sur sa page.

### Validation effectuée (ne pas refaire ce travail)

| Vérification | Résultat |
|---|---|
| `/authors/hlassiege` page 1 / page 2 | 6 + 4 = **10 articles**, contre 4 avant |
| Auteur non-défaut (ajouté temporairement en config) | **0 article**, le fallback ne déborde pas |
| `/`, `/archives` | 6 articles, identique à la page auteur (attendu en mono-auteur) |
| `/tags/release` | 4 articles, aucune régression |
| `/categories/foo` | 404, N2 tient |
| Typecheck core / ESLint | 0 erreur / clean |

### `about.md` n'est pas un oubli

`content/about.md` et `content/index.md` portent `listed: false`. Leur absence des listings est un choix éditorial explicite, ce sont des pages et non des articles. `content/seo.md` en revanche est bien listé (pas de `listed: false`) et compte donc dans les 10.

### Fausses pistes de la session, à ne pas rejouer

- **Le `node_modules` du core n'est pas cassé** (nuxt 4.4.8, binaire présent). Un diagnostic contraire vient d'un usage de chemins git-bash (`/c/Dev/...`) avec le node Windows, qui ne les résout pas. Utiliser PowerShell ou des chemins natifs pour sonder l'install.
- **Le 500 observé sur `/`** pendant la session venait d'un serveur de dev en train de mourir, pas d'un bug. `/` répond 200.

---

## 3. Plan d'action

### Lot 1 : la feature est cassée — TERMINÉ le 2026-07-17

- [x] **P3** Aligné. **Sens retenu : les configs s'alignent sur le contenu, pas l'inverse.** Le submodule `blog-content` porte les **vrais** articles du blog Bloggrify, donc `author: "hlassiege"` reste. Seul `bloggrify/app/app.config.ts` change (`john-doe` → `hlassiege` / « Hugo »). `SAMPLE.app.config.ts` **garde `john-doe`** : c'est lui qui est publié sur npm comme template. Bento, Epoxia et Mistral non touchés.
- [x] **P4** `console.warn` ajouté dans `app/composables/useAuthor.ts`, gardé par `import.meta.dev`, listant les usernames connus.
- [x] **P2** Rescopé, aucun hook écrit. Voir la section « Corrections d'analyse » : le hook était infaisable **et** inutile.
- [x] **P1** Livré. `author.vue` créé dans les 3 thèmes + lien `/authors/{username}` posé + prop `author` câblée dans `BentoListing` / `EpoxiaListing`.
- [x] **P10** `MistralSideAuthorCard` enveloppé dans `<template v-if="author">` (multi-root), `v-if` d'Epoxia passés en `author.socials?.`. Bonus : `NuxtImg` de `mistral/ArticleHeader` gardé par `v-if="author.avatar"` (`avatar` est optionnel, un `src` undefined est un bug latent).

**Validation effectuée** (ne pas refaire ce travail) :

| Vérification | Résultat |
|---|---|
| `nuxt generate` du core | `/authors/hlassiege/` **généré**, titre « Hugo », 4 articles listés |
| `nuxt generate` de Mistral | `/authors/hlassiege/` **généré**, aucun « Invalid layout » |
| Meta tags sur article | `<meta name="author" content="Hugo">` + `article:author` présents |
| schema.org | `Person` émis avec `name` seul → confirme P7a |
| Typecheck core | **0 erreur** |
| Typecheck Bento / Epoxia / Mistral | 42 / 24 / 31 erreurs, **identique à la baseline** → 0 régression |
| ESLint (tous fichiers touchés) | clean |

**Non validé au runtime** : Bento et Epoxia ne buildent pas sans `BLOGGRIFY_BENTO_LICENSE` / `BLOGGRIFY_EPOXIA_LICENSE` (thèmes payants), absentes de la machine. Leurs layouts sont validés par typecheck + lint uniquement. **À rejouer avec une licence.**

### Lot 2 : valeur immédiate

- [ ] **P7a** Ajouter `url` (vers `/authors/{username}`) et `sameAs` (les socials) au `Person` schema.org dans `app/pages/[...slug].vue:89-94`. Le gain le plus facile du lot.
- [ ] **P7b** Ajouter l'auteur au flux RSS (`<dc:creator>` ou `<author>`) dans `server/routes/rss.xml.ts`.
- [ ] **P9** Extraire un composant core de rendu des socials (mapping réseau → icône → URL), couvrant les 8 réseaux du type, et le faire consommer par les thèmes. Supprime la duplication et le fait que minimalist n'en rende que 4 sur 8. Meilleure base de départ : `MistralAuthorCardSocialLinks`, déjà data-driven avec une map d'icônes. Traiter en même temps P17 (`bluesky`), N3 (`sharing_networks` qui pollue `socials`) et les erreurs d'indexation de N4, qui ont tous la même racine.
- [ ] **P12** Ajouter une page `/authors` listant les auteurs. Attention : sans lien entrant, elle ne sera pas crawlée donc pas générée. Il faut la lier depuis les menus/footers des thèmes (cf. la correction de P2).
- [ ] **P7c** Passer l'auteur aux OG images (`BlogPost.satori.vue` + l'appel dans `[...slug].vue:150-153`).

### Lot 3 : dette

- [ ] **P13** Après la prochaine release du core, retirer le `type Author = NonNullable<ReturnType<typeof findAuthor>>` des 3 `author.vue` et repasser à `import type { Author } from '@nuxt/schema'`, une fois le hook `prepare:types` publié.
- [ ] **P14** Après la prochaine release du core, vérifier que `nuxt generate` de Mistral repasse au vert sans désactiver les commentaires (le fix `hyvor_talk?.` est déjà dans le git du core).
- [ ] **P17** Ajouter `bluesky` à `Author.socials` dans `app/types/app-config.d.ts` : les thèmes le rendent déjà et Mistral le configure.
- [ ] **P16** Nettoyer `logo: '/images/logo.png'` et `avatar: '/images/profile-john.jpg'` du core (fichiers inexistants), ou ajouter les images. Décider aussi du sort de ces champs dans `SAMPLE.app.config.ts`, qui est publié : un utilisateur qui copie le template hérite de chemins morts.
- [ ] **P6a** Rendre `Author.username` requis dans `app/types/app-config.d.ts`.
- [ ] **P6b** Faire importer le type `Author` du core par le CLI au lieu de la duplication de `cli/utils/author.ts:5-21`.
- [ ] **P6c** Corriger `getDefaultAuthor()` (`cli/utils/config.ts:20`) pour qu'il cherche `default: true` et non le premier `username`. Unifier les deux regex de parsing du tableau `authors`.
- [ ] **P6d** Réconcilier `AppConfig.authors` (déclaré requis) avec les `config.authors?.` du code : soit le rendre optionnel, soit retirer les optional chaining.
- [ ] **P5** Unifier les deux identités (site vs auteur par défaut). Décider d'une stratégie : dérivation depuis `default: true`, ou séparation explicite avec un renommage des composants ambigus (`BentoAuthorCard` vs `bento/AuthorCard`).
- [ ] **P11** Harmoniser le contrat des layouts : faire descendre l'auteur résolu depuis les `default.vue` des thèmes plutôt que d'appeler `findAuthor` dans chaque `ArticleHeader`.
- [ ] **P8** Supporter les articles multi-auteurs (`z.union([z.string(), z.array(z.string())])` dans `content.config.ts:45`, plus la propagation dans `useContentListing`, les `ArticleHeader`, le schema.org et le CLI).
- [ ] Nettoyer le `findAuthor` top-level déprécié de `app/composables/useAuthor.ts:35-38` une fois les thèmes migrés vers `useAuthor()`. Voir la note N8 : le rapport de force est inversé, c'est `useAuthor()` qui est mort.

---

## 4. Notes annexes (hors périmètre auteurs)

Observations collectées pendant la session du lot 1. Elles ne concernent pas la feature auteurs. Seule **N2 est corrigée** (session du 2026-07-17) ; les autres valent d'être traitées un jour. Triées par gravité.

### N1. Le bug de P1 existe à l'identique pour les CATÉGORIES, sur le thème par défaut

C'est la trouvaille la plus sérieuse de la session. Le core expose `app/pages/categories/[...slug].vue`, qui résout `themes-${configTheme}-category`. Or :

| Thème | `category.vue` |
|---|---|
| `minimalist` (core, **thème par défaut**) | ❌ absent |
| `mistral` | ❌ absent |
| `bento` | ✅ présent |
| `epoxia` | ✅ présent |

Donc `/categories/n-importe-quoi` sur minimalist ou Mistral tombe sur le layout `invalid` et affiche une erreur, exactement comme les pages auteurs avant le lot 1.

Pourquoi ça ne se voit pas aujourd'hui : le submodule `blog-content` n'a **aucun** frontmatter `category:`, donc aucun lien n'existe, donc le crawler ne génère jamais ces routes. Le bug ne se manifeste qu'en accès direct par URL, ou dès que quelqu'un ajoute une catégorie à un article.

Deux façons de traiter : livrer `category.vue` pour minimalist et mistral, ou décider que la page catégorie est optionnelle et faire en sorte que le core réponde un vrai 404 plutôt qu'une erreur de layout. La seconde piste est probablement la bonne réponse générale au pattern `fallback='invalid'` (cf. N2).

### N2. Le pattern `fallback='invalid'` transforme une page manquante en erreur, pas en 404

> ✅ **RÉSOLU (2026-07-17).** `app/layouts/invalid.vue` renvoie désormais `createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })`, plus un `console.warn` gardé par `import.meta.dev` qui nomme la route et le thème concernés. Le droit d'un thème à ne pas implémenter une page est inchangé, seule la réponse au visiteur l'est. Le passage ci-dessous décrit l'état d'origine.

`app/layouts/invalid.vue` fait un `createError({ name: 'Invalid layout', fatal: false, statusMessage: 'Invalid layout' })`. Quand un thème n'implémente pas une page (ce que `CLAUDE.md` autorise explicitement : « Un thème peut ne pas implémenter toutes les pages »), l'utilisateur voit « Invalid layout » et non une 404. C'est un message destiné au développeur du thème qui fuit vers le visiteur, et le code HTTP est faux pour un crawler. C'est le mécanisme commun derrière P1 et N1.

**Le `statusCode` absent valait 500**, le défaut de `createError`. Une page qu'un thème choisissait légitimement de ne pas implémenter annonçait donc une erreur serveur, ce qui dit à un crawler « reviens plus tard » là où une 404 dit « oublie cette URL ». Confirmé empiriquement : `/categories/foo` répondait 500 avant le correctif, 404 après.

Les 5 pages du core concernées (`[...slug]`, `tags/`, `categories/`, `authors/`, `archives/`) n'ont pas été touchées : elles passent toutes par le même fallback, le correctif est centralisé dans le layout.

**Conséquence pour N1** : le trou des catégories sur minimalist et mistral est désormais inoffensif pour le visiteur. Livrer `category.vue` sur ces thèmes redevient une décision produit et non une correction de bug.

### N3. `sharing_networks` est rangé dans `socials`, ce qui casse le typage des thèmes

`app/app.config.ts:26` et `app/types/app-config.d.ts:92` placent `sharing_networks: string[]` **à l'intérieur** de `socials`, à côté de `mastodon`, `github`, etc. Or ce n'est pas un profil social, c'est la config du bouton de partage. Conséquence concrète, visible dans le typecheck de Bento :

```
BentoAuthorCard.vue(27,40): error TS2559: Type '{ sharing_networks: string[]; }'
has no properties in common with type 'Socials'
```

Un thème qui passe `config.socials` à son composant de socials hérite d'une clé qui n'en est pas une. À sortir dans son propre bloc de config.

### N4. Dette de typecheck des thèmes

Baselines : **Bento 42, Epoxia 24, Mistral 31, core 0.** Le core est propre, les thèmes non. Motifs récurrents :

- `'__VLS_ctx.article.readingTime' is possibly 'undefined'` dans de nombreux composants. Le plugin `remark-reading-time` alimente ce champ mais le type de la collection ne le garantit pas.
- `Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ bluesky: ... }'` dans `BentoSocialLinks` et `BentoPostAuthorSocialLinks` : la map d'icônes est indexée par une string non contrainte. Le composant socials mutualisé de P9 réglerait ça d'un coup pour tous les thèmes.

Ça vaut la peine de ramener les thèmes à 0 puis de brancher le typecheck en CI, sinon la dette repart.

### N5. Chaque build crache des warnings CSS

`Expected ";" but found "}"` apparaît en boucle (une vingtaine d'occurrences) sur le build du core comme sur celui des thèmes. Pas investigué. Bruit permanent qui masquera un vrai problème le jour venu.

### N6. Fichiers parasites dans les dépôts

- `nul` à la racine de `bloggr-galaxy` (1370 octets, daté du 30/12/2025) : artefact Windows classique d'une redirection `> nul` exécutée dans un shell POSIX. À supprimer.
- `bash.exe.stackdump` à la racine de `bloggrify` et de `bloggrify.com`.

Le `.gitignore` du core a été modifié dans ton working tree pour ignorer `/bash.exe.stackdump` et `/.eslintcache` (ce n'est pas moi, c'était déjà là). Ignorer le symptôme plutôt que supprimer la cause.

### N7. FIXME en attente dans Mistral

`bloggrify-mistral/app/app.config.ts:4` : `// FIXME : remove when updated to the latest version of Bloggrify` sur le champ `url`. À trancher lors de la prochaine montée de version.

### N8. `useAuthor()` est du code mort, et c'est le déprécié qui vit

`app/composables/useAuthor.ts` expose `useAuthor()` (avec `findAuthor` et `hasAuthor`) et un `findAuthor` top-level marqué « deprecated, kept for backward compatibility ». Vérification faite sur les 4 dépôts : **`useAuthor()` n'est appelé nulle part**, sauf par le wrapper déprécié lui-même (ligne 50). Tout le code réel (core inclus, `app/pages/[...slug].vue:7`) passe par le `findAuthor` déprécié.

`hasAuthor` n'est appelé nulle part non plus : c'est du code mort intégral.

Donc la dépréciation est inversée par rapport à la réalité de l'usage. Soit on migre tout vers `useAuthor()` et le wrapper disparaît, soit on assume que la fonction libre est l'API publique et on retire la mention « deprecated ». En l'état, le seul effet est de faire croire à un lecteur que l'API qu'il utilise est en sursis.

### N9. Le template publié embarque l'URL de la démo

`app/SAMPLE.app.config.ts:2` déclare `url: 'https://minimalist.bloggrify.com/'`. Ce fichier est publié sur npm et sert de point de départ aux nouveaux projets : chaque blog créé démarre avec l'URL de la démo Bloggrify, ce qui a un impact SEO direct si l'utilisateur ne la change pas (canonical, sitemap, og:url). À remplacer par un placeholder explicite du genre `https://your-blog.example.com/`.
