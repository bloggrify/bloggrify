# Revue de la feature "Auteurs"

Audit réalisé le 2026-07-17 sur `bloggrify` (core) et les thèmes `bloggrify-bento`, `bloggrify-epoxia`, `bloggrify-mistral`.

Ce document est un plan de travail réutilisable d'une session à l'autre. Les cases à cocher indiquent l'avancement. Les chemins sans préfixe de dépôt sont relatifs à `bloggrify` (le core) ; les autres sont préfixés par le nom du dépôt.

**Dernière mise à jour : 2026-07-19 (session N7). Lot 2 thèmes porté sur Bento et Epoxia : le lot 2 est clos sur les 3 thèmes. P9, P12, P13, N10 et N11 sont désormais faits partout. Seule la validation runtime (`nuxt generate`, donc P14) reste en attente d'une licence pour Bento et Epoxia.**

Historique condensé : lot 1 (feature réparée) + N2 + P18, puis P9/P17/N3 côté core (N3), puis le SEO auteur (N4), puis la page `/authors` (N5), puis la release 3.2.0 et le lot 2 thèmes côté Mistral (N6), puis le portage sur Bento et Epoxia (N7). Le détail archéologique des sessions closes a été élagué au fil de l'eau ; seul ce qui guide un travail restant est conservé.

---

## 0. Tableau de bord

### Feature auteurs (détail en section 2, découvertes en 2 bis à 2 quater, plan en section 3)

| # | Problème | État | Lot |
|---|---|---|---|
| P1 | Pages auteurs cassées sur les 3 thèmes | ✅ Fait | 1 |
| P2 | Prerender des routes auteurs | ✅ Clos sans code (le crawl suffit) | 1 |
| P3 | Contenu de démo désaligné avec la config | ✅ Fait | 1 |
| P4 | Fallback asymétrique et silencieux | ✅ Fait (warn dev) | 1 |
| P5 | Deux sources d'identité concurrentes | ⬜ À faire | 3 |
| P6 | Le typage ment (3 vérités) | ⬜ À faire | 3 |
| P7 | Auteur absent du SEO (schema.org, RSS, OG) | ✅ Fait (a/b/c) | 2 |
| P8 | Un seul auteur par article | ⬜ À faire | 3 |
| P9 | Rendu des socials dupliqué dans les thèmes | ✅ Fait (core + les 3 thèmes) | 2 |
| P10 | Déréférencements non gardés (crash potentiel) | ✅ Fait | 1 |
| P11 | Contrat incohérent entre pages de listing | ⬜ À faire | 3 |
| P12 | Page `/authors` manquante | ✅ Fait (core + les 3 thèmes) | 2 |
| P13 | Core publié ne propage pas le type `Author` | ✅ Fait (workaround retiré des 3 thèmes) | 3 |
| P14 | Core publié casse le build de Mistral | ✅ Vérifié sur 3.2.0 (comments activés, aucun crash `website_id`) ; non rejouable sur Bento/Epoxia sans licence | 3 |
| P15 | `BentoListing` / `EpoxiaListing` ignoraient `author` | ✅ Fait | 1 |
| P16 | Le core référence 2 images inexistantes | ⬜ À faire (inerte) | 3 |
| P17 | `bluesky` rendu mais absent du type | ✅ Fait | 2 |
| P18 | Le fallback s'applique à l'affichage mais pas au listing | ✅ Fait | 1 |
| P19 | `twitter_username` posé en `twitter:creator` | ✅ Fait | 2 |
| P20 | `rel="me"` (vérification Mastodon) perdu par la mutualisation P9 | ✅ Fait (core 3.3.0 + les 3 thèmes) | 3 |

**Le lot 2 est clos.** Tout le lot 3 (dette) reste ouvert. P13 à P17 ont été découverts pendant le lot 1, P18 pendant N2, P19 pendant N3.

### État par thème du portage lot 2 (côté thèmes)

Depuis la release 3.2.0, le lot 2 s'est porté thème par thème : **Mistral en N6, Bento et Epoxia en N7.**

| Livrable | Fichier (relatif au dépôt du thème) | Minimalist (core) | Mistral | Bento | Epoxia |
|---|---|---|---|---|---|
| P9 — socials via `resolveSocialLinks` | composant `*SocialLinks` en `components/content/` | ✅ (core) | ✅ N6 | ✅ N7 | ✅ N7 |
| P12 — layout `authors.vue` | `app/layouts/themes/{theme}/authors.vue` | ✅ (core) | ✅ N6 | ✅ N7 | ✅ N7 |
| P13 — `import type { Author }` | `app/layouts/themes/{theme}/author.vue` | ✅ (core) | ✅ N6 | ✅ N7 | ✅ N7 |
| P14 — `nuxt generate` vert (comments on) | — | n/a | ✅ N6 | ⬜ (licence) | ⬜ (licence) |
| N11 — deps transitives re-résolues | `node_modules` après `npm install` | n/a | ✅ N6 | ✅ N7 | ✅ N7 |
| N10 — collection lucide bundlée | `@iconify-json/lucide` en `dependencies` du thème | ✅ (core en dev) | ✅ N6 | ✅ N7 | ✅ N7 |

Détail des fichiers Mistral touchés en N6 : section 2 quinquies. Détail Bento/Epoxia (N7) : section 2 sexies. **Seule case restante : P14**, qui suppose un `nuxt generate` — impossible sans `BLOGGRIFY_BENTO_LICENSE` / `BLOGGRIFY_EPOXIA_LICENSE`, absentes de la machine (cf. lot 1). Bento et Epoxia sont validés par typecheck + lint uniquement.

Hors portage lot 2, les trois thèmes ont reçu un bloc `seo` centralisé (`indexable: false` + `ai.llms: true`) : Mistral en N6, Bento et Epoxia en N7. Le FIXME `url` (N7 note) ne concernait que Mistral.

### Notes annexes, hors périmètre auteurs (détail en section 4)

Collectées au fil des sessions. N2 et N3 sont faites, le reste est ouvert.

| # | Note | Gravité | Dépôt concerné |
|---|---|---|---|
| N1 | Le bug de P1 à l'identique pour les **catégories** : pas de `category.vue` sur minimalist (thème par défaut) ni Mistral | 🔴 Feature cassée, masquée par l'absence de `category:` dans le contenu | core, mistral |
| N2 | `fallback='invalid'` renvoie une erreur développeur au visiteur au lieu d'une 404 | ✅ Fait (404 + warn dev) | core |
| N3 | `sharing_networks` rangé dans `socials` alors que ce n'en est pas un, casse le typage des thèmes | ✅ Fait (`sharing.networks` + fallback déprécié) | core (+ tous les thèmes) |
| N11 | Les thèmes ne peuvent pas charger le core packé : leurs dépendances transitives sont périmées | ✅ Clos : release 3.2.0 + `npm install` sur les 3 thèmes (Mistral N6, Bento/Epoxia N7) | les 3 thèmes |
| N10 | `@iconify-json/lucide` est en devDependency du core, donc absent chez les thèmes | ✅ Clos. Décision : le devDep core est **volontaire** (ne pas imposer lucide à tous les consommateurs) ; chaque thème embarque la collection. Fait sur les 3 (Mistral N6, Bento/Epoxia N7) | chaque thème |
| N9 | Le template publié sur npm embarque `url: 'https://minimalist.bloggrify.com/'` | 🟠 Impact SEO sur chaque nouveau blog | core (`SAMPLE.app.config.ts`) |
| N4 | Dette de typecheck des thèmes. **Baselines à jour, mesurées contre 3.2.0 : Bento 12, Epoxia 14, Mistral 0, core 0** (les anciennes 42/24/31 étaient mesurées contre le core périmé) | 🟡 Aucune CI ne la retient. Les 3 thèmes ont un script `npm run typecheck` depuis N7 : brancher la CI dessus est trivial, **mais lire N14 d'abord** (le script peut sortir vert sans rien vérifier) | les 3 thèmes |
| N14 | `typecheck` faux vert : `vue-router` 4.x hoisté fait tomber le plugin Volar, `vue-tsc` sort 0 sans vérifier | 🔴 Piège CI. Corrigé sur Mistral (N7) ; le hoist reste non déterministe sur les 3 thèmes | les 3 thèmes |
| N8 | `useAuthor()` est mort, seul le `findAuthor` **déprécié** est utilisé. `hasAuthor` jamais appelé | 🟡 La dépréciation est à l'envers de l'usage | core |
| N5 | Warnings CSS `Expected ";" but found "}"` à chaque build | 🟡 Bruit permanent | core + thèmes |
| N6 | Fichiers parasites : `nul` à la racine de la galaxie, `bash.exe.stackdump` ×2 | ⚪ Cosmétique | galaxie, core, bloggrify.com |
| N7 | `// FIXME : remove when updated to the latest version` sur `url` | ✅ Fait (N6) : FIXME retiré, `url` gardé comme source de vérité (décision produit : tout centraliser dans `app.config`) | mistral |
| N12 | Pages d'erreur refaites : 404 par défaut propre (aucune fuite de stack) + override par thème (`themes-{theme}-error`) + 404 minimalist stylée, **et** fix du 500 sur URL de contenu inconnue | ✅ Fait | core |
| N13 | `nuxt generate` de Mistral cassé par un conflit de convention de chemin des covers (Mistral préfixait `/images/` là où core/contenu utilisent `/blog/`) | ✅ Fait (N6) : préfixe retiré + `git mv images/blog → blog`, generate à 0 erreur | mistral |

**N1 et N2 relèvent du lot 1 par nature** (feature cassée). N2 est fait. **N1 reste le meilleur candidat à traiter ensuite** si on ne passe pas directement au lot 2, mais il n'est plus urgent : N2 lui a retiré son impact visiteur.

**Le lot 2 est clos sur les 3 thèmes depuis N7.** Le prochain sujet est au choix **N1** (la page catégorie absente de minimalist et Mistral) ou le **lot 3** (dette : P5/P6/P8/P11/P16, plus N8 et N9). Brancher `npm run typecheck` en CI sur les thèmes est le geste le moins cher pour figer la dette N4.

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

> Les problèmes résolus sont réduits à leur constat + correctif. Les problèmes ouverts (P5, P6, P8, P9, P11, P12) gardent le diagnostic complet, c'est ce qui guide le travail. Les corrections d'analyse et découvertes sont en sections 2 bis à 2 quater.

### P1. Pages auteurs cassées sur les 3 thèmes ✅ (lot 1)

Aucun thème n'avait de layout `author.vue`, donc `/authors/{username}` tombait sur `invalid.vue`. Résolu : `author.vue` créé dans les 3 thèmes + lien `/authors/{username}` posé (via `MinimalistAuthorBio` côté core, que le crawler suit). La doc de Mistral annonçait pourtant déjà la feature.

### P2. Prerender des routes auteurs ✅ clos sans code (lot 1)

Le crawl des liens suffit à prérendre les pages auteurs existantes, exactement comme tags et catégories. L'énumération explicite des routes est désormais possible via `_readAppConfig` du module (voir 2 quater) et servira à **P12**. Gap accepté : un auteur sans aucun article n'est jamais lié, donc jamais généré (identique à un tag inutilisé). À noter, hors sujet auteur : `@nuxtjs/sitemap` tourne en `zeroRuntime: true` sans source auteur, donc les pages auteurs sont absentes du sitemap.

### P3. Contenu de démo désaligné avec la config ✅ (lot 1)

Le core déclarait `john-doe` alors que le submodule `blog-content` signe `hlassiege` : `findAuthor` retournait `undefined` et la feature tournait désactivée sans le montrer (P4 explique pourquoi ça passait inaperçu). Résolu en alignant la config du core sur le contenu (`hlassiege` / « Hugo »). `SAMPLE.app.config.ts` garde `john-doe` (c'est le template publié sur npm). Bento et Epoxia n'étaient pas concernés (contenu local sans champ `author`).

### P4. Fallback asymétrique et silencieux ✅ (lot 1, signalement)

Auteur absent du frontmatter → fallback sur `default: true` ; auteur inconnu (faute de frappe) → `undefined` sans fallback. Le comportement reste volontairement inchangé (un fallback silencieux masquerait la faute de frappe), mais un `console.warn` en dev (`useAuthor.ts`) liste désormais les usernames connus quand un auteur non vide ne résout pas. C'est discutable et lié à N8.

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

### P7. Auteur absent du SEO ✅ (lot 2, session N4)

- **P7a schema.org** : le `Person` de `[...slug].vue` porte désormais `url` (`/authors/{username}`) et `sameAs` (les socials), dérivés de `resolveSocialLinks` (pas de second mapping).
- **P7b RSS** : `<dc:creator>` par item dans `rss.xml.ts`. La résolution du nom reproduit le fallback de `findAuthor` (le composable n'est pas importable côté serveur, même angle mort que P13, voir aussi la note serveur ci-dessous), et le namespace `xmlns:dc` est injecté à la main car la lib `feed` ne le déclare que si un item porte du HTML `content`.
- **P7c OG image** : prop `author` ajoutée à `BlogPost.satori.vue`, câblée depuis `defineOgImage`. Traité avec **P19** : `twitter_username` est posé en `twitter:creator`.

Note serveur durable : dans `server/` (nitro), `import type { Author } from '@nuxt/schema'` **échoue** (`TS2305`), l'augmentation n'étant câblée que dans le tsconfig de l'app. Le RSS type donc les 3 champs lus par un type structurel local. Même classe de problème que P13/P6b.

### P8. Un seul auteur par article

`content.config.ts:45` : `author: z.string().optional()`. Pas de support des articles co-écrits, pourtant courant en blogging. Passer à `z.union([z.string(), z.array(z.string())])` est peu coûteux maintenant, beaucoup plus tard (ça touche `useContentListing`, tous les `ArticleHeader`, le schema.org et le CLI).

### P9. Duplication qui viole la règle "pas de logique métier dupliquée dans les thèmes"

Chaque thème réimplémente le rendu des socials avec ses propres SVG inline :

- `app/layouts/themes/minimalist/author.vue:29-62` rend 4 réseaux sur 8 (`twitter`, `github`, `linkedin`, `mastodon`). `youtube`, `facebook` et `instagram` sont dans le type mais jamais rendus.
- `bloggrify-epoxia/app/components/themes/epoxia/AuthorPortfolioHeader.vue:23-127` en rend 6 (le plus complet de la galaxie).
- Bento délègue à `BentoPostAuthorSocialLinks`.

Le mapping social → icône → URL n'a rien de thématique. Il devrait vivre dans un composant core que les thèmes stylent.

### P10. Déréférencements non gardés (crash potentiel) ✅ (lot 1)

`MistralSideAuthorCard` (lisait `author.avatar`/`author.socials` sans garde alors que `findAuthor()` peut renvoyer `undefined`, rendu sur la home) enveloppé dans `<template v-if="author">` ; `v-if` d'Epoxia passés en `author.socials?.` ; bonus `NuxtImg` de `mistral/ArticleHeader` gardé par `v-if="author.avatar"`.

### P11. Incohérence de contrat entre les pages de listing

`app/pages/authors/[...username].vue` résout l'objet et passe `:author="author"` (un objet `Author`) au layout. `app/pages/tags/[...slug].vue` et `app/pages/categories/[...slug].vue` passent une **string** brute.

Le choix de la page auteur est le bon au regard de la règle « pas de data fetching dans les thèmes ». Mais alors les `ArticleHeader` des thèmes ne devraient pas appeler `findAuthor` eux-mêmes : la résolution devrait descendre depuis le layout `default.vue`, comme le fait déjà `app/layouts/themes/minimalist/default.vue:40`.

### P12. Il manque `/authors` ✅ (lot 2, session N5)

Il manquait une page listant les auteurs. Sur un blog multi-auteurs, les fiches n'étaient atteignables que depuis un article. Livré **opt-in** (décision produit prise avec l'utilisateur) : un annuaire qui agrège nom/bio/liens de tous n'est pas un défaut neutre, et un blog mono-auteur (la majorité) n'en tire rien.

- Toggle **global**, off par défaut : `authors_page: { enabled: true }` (type dans `app/types/app-config.d.ts`, documenté en bloc commenté dans `app.config.ts` et `SAMPLE.app.config.ts`). Doc utilisateur : `bloggrify.com/content/1.introduction/5.configuration.md` (ligne de table + note).
- `app/pages/authors/index.vue` résout la liste depuis la config et délègue à `themes-${theme}-authors` (règle « pas de data fetching dans les thèmes »). Layout minimalist : `app/layouts/themes/minimalist/authors.vue` (grille de cartes liées à `/authors/{username}`).
- **Prerender conditionnel** calqué sur `llms.txt` (`modules/bloggrify/index.ts`) : `/authors` n'a aucun lien entrant par défaut (absent du menu), donc le crawler ne l'atteint pas ; il faut l'ajouter explicitement aux routes quand le flag est actif. `_readAppConfig` lit `authors_page.enabled` au build.
- **Effet de bord corrigé** : `/authors` sans username tombait dans le catch-all `[...username].vue` et affichait l'auteur par défaut. Désormais `index.vue` gagne le routing sur ce chemin exact ; désactivé, il renvoie une vraie 404 au lieu de la fiche par défaut.

Validé au runtime (`nuxt generate` du core, flag activé temporairement) : `/authors/index.html` généré avec « Hugo » et le lien vers `/authors/hlassiege`, la fiche individuelle intacte, typecheck 0 erreur, ESLint clean.

**✅ Clos pour les autres thèmes** : `authors.vue` livré sur Mistral (N6), Bento et Epoxia (N7). Les 4 thèmes de la galaxie répondent donc à `/authors` quand le flag est actif.

---

## 2 bis. Corrections d'analyse et découvertes faites pendant le lot 1

Cette section corrige des erreurs de l'audit initial et enregistre ce que l'implémentation a révélé. **Lire avant de se fier à la section 2.**

### Correction de P3 : Bento et Epoxia n'étaient PAS concernés

L'audit affirmait que le core, Bento et Epoxia étaient cassés. Faux. Le submodule `blog-content` n'est utilisé que par **le core et Mistral** (`.gitmodules`). Bento et Epoxia ont leur **propre** `content/` local (12 et 11 fichiers) sans **aucun** champ `author` : ils tombent donc sur le fallback par défaut `john-doe`, qui résout. Seul le core était réellement cassé.

Nuance utile : dans le submodule, seuls les 4 articles de 2025 portent `author:`. Ceux de 2024 n'en ont pas et passent par le fallback.

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

### Nouveau P15 : `BentoListing` / `EpoxiaListing` ignoraient `author` ✅ (lot 1)

Les deux re-wrappent `useContentListing` et ne forwardaient que `category` / `tag` / `prefix`. Corrigé. Illustration directe de P9 : chaque thème réimplémente un wrapper et perd des options. Mistral utilise directement `MinimalistListing` du core, donc n'avait pas le problème.

### Nouveau P16 : le core référence deux images inexistantes (inerte)

`app/app.config.ts` et `SAMPLE.app.config.ts` déclarent `logo: '/images/logo.png'` et `avatar: '/images/profile-john.jpg'`. Or `public/images/` du core ne contient que `logo.svg`. Aucun des deux fichiers n'existe.

**Sans effet visible** : `logo` et `avatar` ne sont lus **nulle part** dans le code du core (`minimalist` n'affiche que `config.name`), ils ne sont consommés que par les thèmes, qui ont leurs propres configs et images. C'est de la config morte et trompeuse. Pour cette raison l'entrée auteur du core créée en P3 **omet `avatar`** plutôt que de pointer vers un fichier absent.

### Nouveau P17 : `bluesky` rendu mais absent du type ✅ (session N3)

Les thèmes rendaient `socials.bluesky` alors que le type `Author.socials` ne le déclarait pas. Ajouté au type `SocialPlatform` avec P9.

### P5 est devenu visible sur la démo du core

Après P3, la page auteur du core affiche « Hugo », mais le `<h1>` du header affiche toujours « John Doe » (c'est `config.name`, l'identité **site**). Le blog sert donc de vrais articles Bloggrify signés Hugo sous un titre « John Doe ». Mistral fait ça proprement : `name: 'Bloggrify'` (le blog) + auteur « Hugo ». **Décision volontairement non prise** dans le lot 1 : renommer `config.name` du core est visible sur `minimalist.bloggrify.com` et relève de P5 (lot 3).

### Baselines de typecheck (pour mesurer une régression)

Les thèmes ont des erreurs de typecheck pré-existantes. Toute comparaison future doit partir de là : **Bento 42, Epoxia 24, Mistral 31, core 0.** Méthode : `git stash -u` puis `npx nuxt typecheck` pour obtenir la baseline, comparer, `git stash pop`.

## 2 ter. Découvertes de la session N2 (2026-07-17)

### Nouveau P18 : le fallback s'appliquait à l'affichage mais pas au listing

> ✅ **RÉSOLU.** Trouvé en regardant `/authors/john-doe` sur la démo en ligne, qui listait 0 article.

L'affichage (`minimalist/default.vue:40`) résout via `findAuthor`, donc un article sans champ `author` **affiche** l'auteur par défaut. Le listing (`useContentListing.ts:113`) faisait `where('author', '=', author)`, et une colonne NULL ne matche jamais un username : l'article n'apparaissait **jamais** sur la page de cet auteur. Problème de framework, pas de démo : tout blog mono-auteur qui suit l'invitation du fallback (ne pas répéter `author:` partout) obtient une page auteur vide.

**Correctif** : quand le filtre porte sur l'auteur `default: true`, le listing matche aussi les articles sans auteur (« le fallback fait partie de la résolution, il s'applique partout ou nulle part »).

```ts
if (author === defaultAuthorUsername) {
  query = query.orWhere(q => q.where('author', '=', author).where('author', 'IS NULL'))
} else {
  query = query.where('author', '=', author)
}
```

L'auteur par défaut est dérivé via `useAuthor().findAuthor()` sans argument (pas de duplication de la règle). C'est le **premier appelant réel de `useAuthor()`**, ce qui entame la résorption de N8.

**Piège lié, vérifié et écarté (ne pas « corriger »)** : le filtre de visibilité juste en dessous ressemble à un bug mais n'en est pas un. Dans `@nuxt/content`, `orWhere(q => q.where(a).where(b))` produit `(a OR b)`, et les conditions successives sont jointes par AND. Le SQL final est `(author = X OR author IS NULL) AND (listed = true OR listed IS NULL) AND (draft = false OR draft IS NULL)`.

Détail utile pour les comptages : `content/about.md` et `content/index.md` portent `listed: false` (pages, pas articles) et sont volontairement hors listings ; `content/seo.md` est listé.

### Piège d'outillage : chemins git-bash sous node Windows

`node_modules` du core sondé avec des chemins git-bash (`/c/Dev/...`) sous node Windows → faux diagnostic de « node_modules cassé ». Utiliser PowerShell ou des chemins natifs pour sonder l'install.

## 2 quater. Découvertes de la session N3 (2026-07-17, lot 2 / P9)

### P9 est fait côté core, et bloqué côté thèmes

Livré dans le core :

- `app/utils/socials.ts` : `SOCIAL_PLATFORMS` (la map plateforme → icône + label, source de vérité unique) et `resolveSocialLinks(socials)`, qui filtre les clés non-réseau et retourne des liens typés dans un ordre stable. **C'est la brique que P7a doit réutiliser pour `sameAs`**, plutôt que d'écrire un second mapping dans `[...slug].vue`.
- `app/components/SocialLinks.vue` : rendu via `UIcon` + `@iconify-json/simple-icons` (ajouté en **dependency**, pas devDependency, cf. N10), stylé par les props `linkClass` / `iconClass` et par la classe du conteneur.
- `minimalist/author.vue` passe de 4 réseaux sur 8 rendus en SVG inline à l'ensemble des réseaux configurés.

**Non livré** : les 4 composants dupliqués des thèmes (`MistralAuthorCardSocialLinks`, `BentoSocialLinks`, `BentoPostAuthorSocialLinks`, `EpoxiaPostAuthorSocialLinks`). Ils sont bloqués par N11, voir ci-dessous. La duplication reste donc entière tant que le core n'est pas releasé.

### Nouveau N11 : les thèmes ne peuvent pas charger le core packé

**Ce blocage n'était pas connu, et il déborde largement de P9.** Il a été trouvé en essayant de valider les thèmes contre le core local.

Les 3 thèmes épinglent `"@bloggrify/core": "3.1.2"` en version **exacte** et n'ont aucune dépendance directe sur `@nuxt/content` ni `nuxt-schema-org` : ils héritent des ranges transitifs de la version publiée. Or le git du core a monté ces ranges sans que les thèmes ne réinstallent :

| Dépôt | `@nuxt/content` déclaré | installé | `nuxt-schema-org` déclaré | installé |
|---|---|---|---|---|
| `bloggrify` (core, git) | `^3.15.0` | 3.15.0 | `^6.2.3` | 6.2.3 |
| les 3 thèmes | — (transitif) | **3.10.0** | — (transitif) | **5.0.10** |

Conséquence immédiate, vérifiée : en installant le tarball `npm pack` du core dans un thème, `nuxt typecheck` **crashe avant de démarrer** avec `(0 , _content4.defineSchemaOrgSchema) is not a function`, sur `content.config.ts:58` du core, parce que `nuxt-schema-org/content` en 5.0.10 n'exporte pas cette fonction.

**Ce n'est pas une incompatibilité de fond, c'est un `node_modules` périmé.** Un `npm install` dans chaque thème après la release re-résoudra les transitives correctement. Mais :

1. **Échanger le tarball ne suffit pas à valider un thème localement** : `tar -xzf` par-dessus `node_modules/@bloggrify/core` ne re-résout pas les dépendances transitives. C'est ce qui a fait échouer la validation locale de cette session. **Ne pas rejouer cette approche telle quelle**, il faut un vrai `npm install` du tarball.
2. **La baseline de typecheck de N4 (Bento 42, Epoxia 24, Mistral 31) n'est plus mesurable** contre le core packé, et donc plus utilisable comme garde-fou tant que N11 n'est pas réglé.
3. **La release du core doit être vérifiée sur les 3 thèmes**, sinon elle sort avec le même crash. À traiter avec P13 et P14, qui attendent la même release.

### Nouveau N10 : `@iconify-json/lucide` est en devDependency du core

`@nuxt/ui` ne fournit **aucune** collection d'icônes, seulement `@nuxt/icon` (vérifié dans ses `dependencies`). Une collection non installée localement est résolue par `@nuxt/icon` via **l'API Iconify au runtime**, ce qui en déploiement statique veut dire un appel réseau depuis le navigateur du visiteur.

Or `@iconify-json/lucide` est en `devDependencies` du core, et **aucun des 3 thèmes ne déclare de collection Iconify** (vérifié). Un thème qui rend un `UIcon` lucide dépend donc de l'API Iconify en production.

C'est pour cette raison que `@iconify-json/simple-icons` a été ajouté en **`dependencies`** et non en devDependency. Confirmé au build du core : `Nuxt Icon discovered local-installed 2 collections: lucide, simple-icons`, et le HTML généré ne contient aucun `api.iconify.design`.

`@iconify-json/lucide` devrait passer en `dependencies` pour la même raison.

### P19 : `twitter_username` posé en `twitter:creator` ✅ (session N4)

`twitter_username` était déclaré dans le type, renseigné en config, lu/réécrit par le CLI, et **lu par aucun composant** (même motif que `logo`/`avatar` en P16). Ce n'est pas une URL mais un handle : `resolveSocialLinks` l'ignore, et P7c le pose désormais en `twitter:creator` (`[...slug].vue`).

### `_readAppConfig` peut lire `app.config.ts` au build (pour P12)

`modules/bloggrify/index.ts` lit `app.config.ts` au build via jiti (`_readAppConfig`, en stubbant `defineAppConfig`), pour les clés `seo` et `socials.sharing_networks`. Le mécanisme est générique : **P12 (`/authors`) peut s'en servir** pour prérendre l'index des auteurs sans dépendre d'un lien entrant posé par chaque thème. (Le crawl, lui, suffit pour les pages auteurs individuelles existantes.)

### Piège d'outillage : `rtk npx`

`rtk npx <cmd>` est traduit en `npm run <cmd>` et échoue avec `Missing script`. Pour `npx nuxt typecheck` (les thèmes n'ont pas de script `typecheck`), utiliser `npx` directement.

## 2 quinquies. Découvertes de la session N6 (2026-07-18, release 3.2.0, lot 2 Mistral)

### Le lot 2 thèmes a été porté sur Mistral uniquement

Sur décision produit (« on ne fait que Mistral pour l'instant »). Trois fichiers touchés, tous validés :

- `app/layouts/themes/mistral/author.vue` : workaround P13 retiré, `import type { Author } from '@nuxt/schema'` rétabli.
- `app/components/content/MistralAuthorCardSocialLinks.vue` : la map d'icônes SVG inline (8 réseaux dupliqués) remplacée par `resolveSocialLinks` + `UIcon`. Les deux appelants (`author.vue`, `MistralSideAuthorCard`) sont inchangés (l'API `:socials` est identique). Vérifié dans le HTML généré : les 8 réseaux se rendent avec les labels du core (`Open X profile` pour `twitter`), et `@nuxt/icon` inline le SVG de `simple-icons` au build (aucun `api.iconify.design`, cf. N10).
- `app/layouts/themes/mistral/authors.vue` : nouveau layout `themes-mistral-authors`, grille de cartes `UAvatar` liées à `/authors/{username}`. Validé au runtime en activant `authors_page.enabled` temporairement (`/authors/index.html` généré, H1 « Authors », lien vers la fiche, puis flag reverté).

Baseline typecheck de Mistral **contre 3.2.0 : 18 erreurs** (l'ancienne baseline N4 de 31 était mesurée contre le core périmé, elle n'est plus la référence). Les 18 restantes sont la dette N4 pré-existante (`readingTime` possibly undefined, `subtitle` unknown dans `PageSidebar`, `doc.body.toc` possibly undefined). **0 erreur sur les fichiers touchés en N6.** ESLint clean.

### Hors auteurs : adoption du bloc `seo` de 3.2.0 dans Mistral

En parcourant le CHANGELOG 3.2.0 pour repérer ce que Mistral pouvait exploiter. Même logique que N7 (tout centraliser dans `app.config`) : un bloc `seo` a été ajouté à `bloggrify-mistral/app/app.config.ts`, sur décision produit de l'utilisateur.

- `seo.indexable: false` : le démo reste hors des moteurs (au lieu de dépendre de `SITE_INDEXABLE`). Vérifié : `robots.txt` généré en `Disallow: /`.
- `seo.ai.llms: true` : publie `/llms.txt` (vérifié : généré). `allowCrawlers` laissé au défaut `true` pour éviter le warning « contradictory » du core (`llms:true` + `allowCrawlers:false`). **Nuance** : avec `indexable:false`, `robots.txt` bloque de toute façon tous les crawlers via le wildcard ; `llms.txt` reste généré et récupérable directement, mais n'est pas « ouvert au crawl ».

Autres pistes 3.2.0 relevées : page 404 stylée pour Mistral (N12, optionnel, non retenue).

**N10 traité côté Mistral (décision produit).** `@iconify-json/lucide` reste **volontairement** en `devDependencies` du core : l'utilisateur ne veut pas imposer la collection à tous les consommateurs du core. La bonne maille est donc le thème. `@iconify-json/lucide` (`^1.2.117`) a été ajouté aux `dependencies` de Mistral, `npm install` fait. Vérifié au build : Nuxt Icon passe en `server bundle mode: local`, le bundle client contient les icônes localement, et le HTML généré ne contient **aucun** `api.iconify.design`. Les composants core rendus dans Mistral qui utilisent lucide (bouton copier de `clipboard.ts`, `Alert.vue`, `NewsletterForm.vue`) ne dépendent donc plus de l'API Iconify. Bento et Epoxia doivent faire pareil.

### Nouveau N13 : `nuxt generate` de Mistral échouait sur les covers ✅ (résolu N6)

`npx nuxt generate` sortait en erreur (`Exiting due to prerender errors`) sur des `[404] IPX_FILE_NOT_FOUND` de covers d'articles. **Ce n'étaient pas des images manquantes** (diagnostic initial faux) mais un **conflit de convention de chemin** propre à Mistral.

Cause exacte : les covers du contenu partagé (`content`) sont des chemins **absolus** style core (`cover: "/blog/analytics.jpg"`, `"/blog/bloggrify.png"`). Le core les rend **bruts** et sert les fichiers depuis `public/blog/`. Mistral, lui, mélangeait deux conventions sur les mêmes pages :

- les composants **core** qu'il réutilise (ex. `MinimalistListing` dans `author.vue`) rendent le cover brut → requête `/blog/analytics.jpg` ;
- ses composants **propres** (`MistralLimitedListOfPosts.vue`, `layouts/themes/mistral/default.vue`) préfixaient `'/images/' + cover` → requête `/images/blog/analytics.jpg`.

Comme les fichiers étaient rangés sous `public/images/blog/`, la première convention 404ait ; les déplacer sous `public/blog/` aurait juste inversé le problème. **Aucun emplacement unique ne satisfait les deux conventions.** Le préfixe `/images/` était un reliquat de l'ancien contenu autonome de Mistral (covers relatifs, tout sous `/images/`).

Correctif (aligner Mistral sur le core) : retrait du préfixe `'/images/' + ` dans les deux composants + `git mv public/images/blog → public/blog`. Vérifié : `nuxt generate` passe à **95 routes, 0 erreur IPX** (le core, en référence, fait 85 routes 0 erreur). Commit `fix: serve post covers at the content path instead of under /images`.

**Cleanup fait (N6)** : suppression des reliquats orphelins de l'ère « contenu autonome » de Mistral — `public/images/covers/*` (12 covers voyage) et 5 images `public/images/doc/*`, aucune référencée par le contenu partagé actuel. 17 fichiers retirés (`chore: remove orphaned demo cover and doc images`), generate revérifié à 0 erreur. Gardé : `public/images/doc/markdown.png`, encore **nommé** par `2024/markdown.md` (`cover: "doc/markdown.png"`).

Reste non bloquant, à traiter côté **contenu** (hors Mistral) : le contenu partagé a des covers à conventions **incohérentes** — `doc/markdown.png` (**relatif**, ne résout nulle part) et `/images/post-cover.jpg` (**absolu sous /images**, fichier absent des deux dépôts). Le core les tolère sans 404 (pas rendus en IPX sur ces pages), mais ces covers ne s'affichent pas. À normaliser en chemins absolus style `/blog/…` avec les fichiers au bon endroit, dans le submodule `content`.

### N7 (FIXME `url`) : le FIXME est inversé par la 3.2.0

Investigué et **corrigé en N6**. Voir la note N7 en section 4 : jusqu'à 3.1 le champ `url` d'`app.config.ts` était mort (l'URL venait de `BASE_URL`), depuis 3.2 il est lu **et prioritaire** sur `BASE_URL` (canonical, `og:url`, sitemap, RSS). Le FIXME (« à retirer ») était donc inversé : c'est le commentaire qui part, pas le champ. Fait, sur décision produit de tout centraliser dans `app.config`.

## 2 sexies. Découvertes de la session N7 (2026-07-19, lot 2 Bento + Epoxia)

### Le portage a suivi le patron de Mistral sans surprise

Même séquence que N6, dans cet ordre (l'upgrade d'abord, sinon `import type { Author }` ne compile pas) :

1. **`package.json`** : `@bloggrify/core` 3.1.2 → **3.2.0**, `nuxt` → **4.4.8** (la version épinglée par le core 3.2.0, vérifiée avec `npm view @bloggrify/core@3.2.0 dependencies.nuxt` — un skew nuxt casse le build standalone, cf. skill `release` A.2), `@iconify-json/lucide` `^1.2.117` en **dependencies** (N10), et les scripts `prepare` + `typecheck` alignés sur Mistral. Puis `npm install` (N11).
2. **P9** : `BentoSocialLinks`, `BentoPostAuthorSocialLinks` et `EpoxiaPostAuthorSocialLinks` réécrits en wrappers de `resolveSocialLinks` + `UIcon`. Les trois embarquaient la **même** map de 8 SVG Font Awesome copiée-collée ; elle disparaît des trois. L'API `:socials` est inchangée, donc les appelants (`BentoAuthorCard`, `bento/AuthorCard`, les deux `author.vue`) ne bougent pas.
3. **P9 bonus, propre à Epoxia** : `themes/epoxia/AuthorPortfolioHeader.vue` inlinait **6 réseaux en SVG à la main** (le plus gros foyer de duplication de la galaxie, noté en P9). Il délègue désormais à `EpoxiaPostAuthorSocialLinks`. Le fichier passe de 262 à 55 lignes.
4. **P13** : `type Author = NonNullable<ReturnType<typeof findAuthor>>` retiré des deux `author.vue`, remplacé par `import type { Author } from '@nuxt/schema'`. Le hook `prepare:types` de 3.2.0 fait son travail dans les deux thèmes.
5. **P12** : nouveaux layouts `themes/bento/authors.vue` et `themes/epoxia/authors.vue`, grille de cartes `UAvatar` liées à `/authors/{username}`, dans le shell et les tokens de chaque thème (carte `rounded-2xl` + `font-stylish` + accent rouge pour Bento, carte `rounded-lg` + accent rose pour Epoxia).

### P20 — `rel="me"` perdu sur Mastodon, devenu une feature du core

`AuthorPortfolioHeader` d'Epoxia posait `rel="me"` sur les liens **Mastodon et YouTube**, là où le composant mutualisé posait `rel="nofollow noopener noreferrer"` partout. Sur Mastodon, `rel="me"` n'est pas décoratif : c'est le mécanisme de **vérification de profil** (Mastodon affiche le lien en vert si la page pointée le référence en retour). Minimalist et Mistral avaient perdu la même chose en N3/N6 sans que ce soit noté.

Traité **côté core**, la bonne maille : le `rel` fait maintenant partie du contrat d'un lien social, au même titre que l'icône et le label.

- `DEFAULT_SOCIAL_REL = 'nofollow noopener noreferrer'` exporté de `app/utils/socials.ts`.
- `SOCIAL_PLATFORMS` accepte un `rel` optionnel par plateforme ; seul `mastodon` le renseigne (`me ${DEFAULT_SOCIAL_REL}` — les tokens `rel` se cumulent, on ne perd pas le `nofollow`).
- `SocialLink.rel` est **requis** : `resolveSocialLinks` retombe sur le défaut. Un consommateur ne peut donc pas obtenir un lien sans `rel`, et n'a plus à connaître la bonne valeur.
- Les 4 sites d'appel du core bindent `:rel="link.rel"` : `SocialLinks.vue`, `MinimalistFooter`, `MinimalistHero`, `MinimalistProfileHeader`. Typecheck et lint du core à 0.

**Les thèmes ont dû attendre la release.** Contre le core publié 3.2.0, `:rel="link.rel"` sortait en `TS2339: Property 'rel' does not exist on type 'SocialLink'` (constaté sur Mistral, puis reverté) : les 4 wrappers ont gardé le `rel` en dur jusqu'au bump. Même décalage core/thèmes qu'en P13 — une feature core ne se propage qu'à la release suivante.

**Clos avec le bump en core 3.3.0.** Les 4 wrappers bindent `:rel="link.rel"`. Vérifié dans le HTML généré de Mistral, pas seulement au typecheck :

```html
<a href="https://piaille.fr" rel="me nofollow noopener noreferrer" ...>
<a href="https://github.com" rel="nofollow noopener noreferrer" ...>
```

Le `nofollow` est conservé sur mastodon : les tokens `rel` se cumulent, on ne troque pas l'hygiène SEO contre la vérification de profil.

### Hors auteurs : `socials.sharing_networks` migré vers `sharing.networks`

Le `npm install` a fait sortir le warn de dépréciation N3 du core sur les deux thèmes. Les trois `app.config.ts` sont passés au bloc `sharing: { networks: [...] }` (Bento et Epoxia, puis Mistral dans la foulée), le `socials` ne contient plus que des profils. **Plus aucun thème n'émet le warn.**

### Nouveau N14 : le `typecheck` de Mistral était un faux vert (vue-router hoisté en 4.x)

**Trouvé en voulant vérifier un « 0 erreur » qui paraissait trop beau après la migration `sharing`.** `npm run typecheck` de Mistral rapportait **0 erreur et sortait en `EXIT=0`** alors qu'il ne typecheckait presque rien.

Cause : deux versions de `vue-router` cohabitent dans l'arbre. `nuxt@4.4.8` exige `^5.1.0`, `@nuxt/ui@4.10.0` (dépendance du core) accepte `^4.5.0 || ^5.0.0`. **Laquelle atterrit à la racine de `node_modules` dépend de l'ordre d'installation**, et le lockfile de Mistral y avait figé **4.6.4**. Or `vue-tsc` charge `vue-router/volar/sfc-route-blocks`, un sous-chemin qui n'existe pas en 4.x :

```
[Vue] Resolve plugin path failed: vue-router/volar/sfc-route-blocks
Error [ERR_PACKAGE_PATH_NOT_EXPORTED]
```

Le plugin Volar tombe, `vue-tsc` continue en mode dégradé, ne trouve rien, et **rend un code de sortie 0**. Le piège est là : une CI branchée sur `npm run typecheck` aurait été verte en ne vérifiant rien. Bento et Epoxia, fraîchement installés en N7, avaient hérité de 5.2.0 à la racine et n'étaient pas concernés (`@nuxt/ui` y est dédupliqué sur 5.2.0).

Correctif appliqué : `npm update vue-router` sur Mistral (pas d'`overrides`, la contrainte de `@nuxt/ui` accepte déjà 5.x) → 5.2.0 à la racine, plugin résolu.

**Vérifié empiriquement plutôt que sur la foi du 0** : en réintroduisant une erreur connue (`:rel="link.rel"`, cf. P20), le typecheck la remonte et sort en `EXIT=2`. Le 0 est donc réel.

**Ce n'est pas réglé sur le fond** : rien n'empêche un futur `npm install` de re-hoister 4.x dans n'importe lequel des thèmes, et l'échec est silencieux. Deux pistes : un `overrides: { "vue-router": "^5.2.0" }` dans chaque thème, ou attendre que `@nuxt/ui` resserre sa plage. À décider. En attendant, **toute mesure de typecheck doit d'abord vérifier l'absence de `Resolve plugin path failed` dans la sortie**, sinon le chiffre ne veut rien dire.

### Baselines de typecheck remesurées contre 3.2.0

**Bento 12** (contre 42 avant), **Epoxia 14** (contre 24), **Mistral 0** (contre 18 en N6). Les trois mesures sont prises plugin Volar résolu (cf. N14). La chute de Bento et Epoxia ne vient pas d'un nettoyage : les anciennes baselines étaient mesurées contre le core périmé (même biais que Mistral 31 → 18 en N6). Mistral passe à 0 après le `npm install` de N7, qui a re-résolu ses transitives — **la dette N4 de Mistral est donc résorbée**, pas contournée.

Les erreurs restantes de Bento et Epoxia sont la dette N4 pré-existante (`readingTime` possibly undefined, `subtitle` unknown dans `PageSidebar`) plus, côté Bento, `BentoPaginationBar` et `BentoHomeCategories`. **0 erreur sur les fichiers touchés en N7**, et l'erreur `TS2559` de `BentoAuthorCard` citée en N3 a disparu (le composant reçoit maintenant un `Socials` typé).

ESLint : 19 erreurs sur Bento, 2 sur Epoxia, **toutes dans des fichiers non touchés** (dette pré-existante : `vue/max-attributes-per-line` sur des SVG inline, `consistent-type-imports` dans les deux `modules/*/license.ts`, un `any` dans `epoxia/portfolio.vue`).

### Ce qui n'a PAS pu être validé

`nuxt generate` (donc P14, et le rendu réel des icônes `simple-icons` en bundle local) exige `BLOGGRIFY_BENTO_LICENSE` / `BLOGGRIFY_EPOXIA_LICENSE`, absentes de la machine. **À rejouer avec une licence**, en vérifiant les deux points contrôlés sur Mistral en N6 : aucun `api.iconify.design` dans le HTML généré, et `/authors/index.html` produit en activant temporairement `authors_page.enabled`.

Bonne nouvelle au passage : `nuxt prepare` (donc `npm install` et `npm run typecheck`) tourne **sans** licence. Le module de licence ne bloque que le build.

### Mise en place de release-please + npm OIDC sur les deux thèmes

Setup A.3 du skill `release`, à l'identique de Mistral : `.release-please-manifest.json` (initialisé au dernier tag publié, `3.0.1` pour Bento et `3.0.2` pour Epoxia — vérifiés contre `git tag` **et** contre npm), `release-please-config.json`, `.github/workflows/release.yml`. Le `deploy.yml` existant n'est pas touché.

**Différence assumée avec Mistral : pas de `--provenance`.** Ces deux dépôts sont privés et npm exige un dépôt public pour la provenance. Le commentaire est dans le workflow pour éviter qu'on « répare » l'écart plus tard.

**Deux gestes manuels restent à faire par l'utilisateur**, l'agent ne peut pas les faire (cf. skill `release` A.3.2 et A.3.3) :
- déclarer le **trusted publisher** sur npmjs.com pour `@bloggrify/bento` et `@bloggrify/epoxia` (org `bloggrify`, repo correspondant, workflow `release.yml`, environment vide) ;
- vérifier que l'org autorise Actions à créer des PR (déjà fait pour Mistral, donc probablement acquis au niveau org).

Corrigé au passage : `repository.url` d'Epoxia pointait encore sur `hlassiege/bloggrify-epoxia` alors que le remote est `bloggrify/bloggrify-epoxia`.

---

## 3. Plan d'action

### Lot 1 : la feature est cassée — TERMINÉ le 2026-07-17

- [x] **P3** Aligné. **Sens retenu : les configs s'alignent sur le contenu, pas l'inverse.** Le submodule `blog-content` porte les **vrais** articles du blog Bloggrify, donc `author: "hlassiege"` reste. Seul `bloggrify/app/app.config.ts` change (`john-doe` → `hlassiege` / « Hugo »). `SAMPLE.app.config.ts` **garde `john-doe`** : c'est lui qui est publié sur npm comme template. Bento, Epoxia et Mistral non touchés.
- [x] **P4** `console.warn` ajouté dans `app/composables/useAuthor.ts`, gardé par `import.meta.dev`, listant les usernames connus.
- [x] **P2** Rescopé, aucun hook écrit : le crawl suffit à prérendre les pages auteurs existantes (voir P2 en section 2).
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

- [x] **P9 (core)** `app/utils/socials.ts` + `app/components/SocialLinks.vue` + minimalist branché dessus. P17 (`bluesky`) et N3 (`sharing_networks`) traités dans la foulée, comme prévu. Voir la section 2 quater.
- [x] **P7a** (session N4) `url` (`/authors/{username}`) + `sameAs` (les socials, via `resolveSocialLinks`) posés sur le `Person` de `[...slug].vue`. Validé au runtime dans le HTML généré.
- [x] **P7b** (session N4) `<dc:creator>` par item dans `server/routes/rss.xml.ts`, fallback défaut mirroir de `findAuthor` (non importable côté serveur), namespace `xmlns:dc` injecté à la main. Validé : 12 items crédités.
- [x] **P7c + P19** (session N4) prop `author` passée à `BlogPost.satori.vue`, et `twitter:creator` posé depuis `twitter_username`. Validés au runtime (OG cache key `author_Hugo`, `<meta name="twitter:creator">`).
- [x] **P12** (session N5) Page `/authors` **opt-in** (`authors_page.enabled`, off par défaut), prérendue conditionnellement via `_readAppConfig` (patron `llms.txt`). Layout minimalist livré ; validée au runtime. Voir P12 en section 2. Layouts des autres thèmes à livrer avec P9-thèmes (bloqué N11).
- [x] **P9 (thèmes)** Composants dupliqués remplacés par de fins wrappers de style, layouts `authors.vue` livrés (P12). Noms publics conservés (`components/content/`, utilisables en MDC). **Mistral en N6**, **Bento et Epoxia en N7** (`BentoSocialLinks`, `BentoPostAuthorSocialLinks`, `EpoxiaPostAuthorSocialLinks`, plus `AuthorPortfolioHeader` d'Epoxia qui inlinait 6 réseaux). Choix retenu partout : wrapper `resolveSocialLinks` plutôt que le composant `SocialLinks` du core, car ce dernier n'expose pas de classe de conteneur (pas de `flex`/`gap`), exactement comme le fait déjà `MinimalistProfileHeader`. **Non validé au runtime sur Bento/Epoxia** (licence, voir lot 1). Régression connue à traiter côté core : le `rel="me"` de Mastodon, voir section 2 sexies.

### Lot 3 : dette

- [x] **N11** Levé par la release 3.2.0 et clos sur les 3 thèmes : `npm install` re-résout les transitives (`@nuxt/content` 3.15.0, `nuxt-schema-org` 6.2.3, `@iconify-json/simple-icons`), le hook `prepare:types` est bien dans le paquet, typecheck et `nuxt prepare` tournent. Mistral en N6, Bento et Epoxia en N7.
- [x] **N10** ~~Passer `@iconify-json/lucide` en `dependencies` du core~~ — **décision inversée** : le core le garde en `devDependencies` volontairement (ne pas imposer la collection à tous les consommateurs). Chaque thème embarque la collection dont il a besoin. Fait sur les 3 thèmes (Mistral N6, Bento et Epoxia N7). Vérifié au build en `local bundle mode` sans appel Iconify **sur Mistral uniquement** : à revérifier sur Bento/Epoxia avec une licence. (`simple-icons`, lui, est en `dependencies` du core depuis 3.2.0 car requis par le composant `SocialLinks` partagé.)
- [x] **P13** `type Author = NonNullable<ReturnType<typeof findAuthor>>` retiré des 3 `author.vue`, remplacé par `import type { Author } from '@nuxt/schema'` (hook `prepare:types` bien publié en 3.2.0, typecheck 0 erreur sur les fichiers concernés). Mistral en N6, Bento et Epoxia en N7. **Ne couvre pas le contexte serveur** : `rss.xml.ts` ne peut de toute façon pas importer `Author` (le hook ne câble que le tsconfig de l'app), il garde son type structurel local. Voir la note serveur en P7.
- [x] **P14** Vérifié sur 3.2.0 (session N6) : `nuxt generate` de Mistral rend les pages d'articles **commentaires activés** (`provider: 'hakanai'`), aucun crash `website_id`. Le build sortait en erreur sur des `IPX_FILE_NOT_FOUND` de covers, désormais **résolu** (conflit de convention de chemin, voir N13) : generate passe à 95 routes, 0 erreur.
- [x] **P17** `bluesky` ajouté au type via `SocialPlatform` (session N3, avec P9).
- [x] **P19** `twitter:creator` posé depuis `twitter_username` dans `[...slug].vue` (session N4, avec P7c).
- [x] **P20** (découvert et traité en N7) `rel` par plateforme dans `SOCIAL_PLATFORMS` (`app/utils/socials.ts`), remonté comme champ **requis** de `SocialLink` : `me nofollow noopener noreferrer` pour mastodon, `DEFAULT_SOCIAL_REL` (`nofollow noopener noreferrer`) partout ailleurs. Les 4 sites d'appel du core (`SocialLinks.vue`, `MinimalistFooter`, `MinimalistHero`, `MinimalistProfileHeader`) bindent `:rel="link.rel"`. Les 4 wrappers des thèmes ont suivi **au bump en core 3.3.0**, une fois `SocialLink.rel` réellement publié (contre 3.2.0 : `TS2339`). **Vérifié dans le HTML généré de Mistral** : `rel="me nofollow noopener noreferrer"` sur mastodon, `rel="nofollow noopener noreferrer"` sur github. Détail en section 2 sexies.
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

### N10 et N11

Découvertes pendant la session N3, détaillées en **section 2 quater**. N11 (dépendances transitives périmées dans les thèmes) bloque la release du core ; N10 (`@iconify-json/lucide` en devDependency) fait dépendre les icônes des thèmes de l'API Iconify au runtime.

### N3. `sharing_networks` est rangé dans `socials`, ce qui casse le typage des thèmes

> ✅ **RÉSOLU (session N3).** `sharing.networks` est le nouveau bloc. `socials.sharing_networks` reste lu par `SharingButtons.vue`, avec un warn de dépréciation émis au build par le module, sur le même patron que `hidden` → `listed`. Aucun blog existant ne casse. La section 2 quater note que le symptôme allait au-delà du typecheck. Le passage ci-dessous décrit l'état d'origine.

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

### N12. Pages d'erreur (404 par défaut + override par thème)

Découvert en testant `/authors` désactivé (P12) : l'ancienne `app/error.vue` déballait la stack via `v-html` (gardée par `import.meta.dev`, donc dev seulement) et utilisait des couleurs hardcodées (`bg-blue-500`, `gray-*`) au lieu des tokens du thème. Refait en deux étapes.

**Bug préexistant corrigé en cours de route** (`app/pages/[...slug].vue`) : une URL de contenu inconnue renvoyait `null` de `queryCollection().first()` (pas une erreur), le doc null partait au layout, et `useContentSurround` crashait en **500** (`Cannot read properties of null (reading 'path')`). Ajout d'un `throw createError(404)` quand `!doc.value`. C'est le catch-all, donc **toute** URL mal tapée était concernée : elles font désormais un 404 propre au lieu d'un 500.

**Mécanisme (le core délègue, le thème style)** :

- `app/error.vue` est rendu **hors** de `app.vue`, donc il fournit son propre `<UApp>` et délègue à `themes-${theme}-error` avec `fallback="error-default"` (même patron que les pages → `themes-${theme}-*`).
- `app/composables/useErrorPage.ts` centralise le dérivé : `statusCode`, `title`/`description` **visitor-safe** (le `error.message`/`error.stack` n'est jamais rendu en prod), `handleError` (`clearError({ redirect: '/' })`), et une ligne `message` dev-only. Un layout d'erreur n'écrit que du markup.
- `app/layouts/error-default.vue` : la 404 neutre du framework (fallback pour tout thème sans page d'erreur).
- `app/layouts/themes/minimalist/error.vue` : la 404 minimalist, reprise d'un design fourni par l'utilisateur (badge éclair flottant, grand « 404 » serif avec le « 0 » en pastille à yeux clignants, puce mono « Error 404 »), dans `MinimalistShell` (header + footer), en tokens de thème (light + dark). **Serif système** (`ui-serif, Georgia`) posé sur `.error-display` dans `core.css` : aucune police nommée, donc @nuxt/fonts ne télécharge rien (contrainte explicite de l'utilisateur : ne pas alourdir le core).

Interaction avec P12 : `/authors` est une route **statique** (opt-in). Quand le flag est off, le module l'ajoute à `nitro.prerender.ignore` (regex ancrée `/^\/authors\/?$/`, pour ne pas toucher `/authors/{username}`), sinon le crawler la prérendait et cassait le build sur le 404.

Validé en dev : `/nexiste-pas-xyz` → 404, `/authors` (off) → 404 minimalist, `/` et `/seo` → 200. Doc utilisateur : `bloggrify.com/content/3.reference/7.theming.md` (« Custom error page »). Relié à N2 (le fallback `invalid` → 404).

**Reste pour les autres thèmes** : bento/epoxia/mistral n'ont pas de `error.vue` → ils tombent sur `error-default` (correct, pas cassé). Leur donner une 404 stylée reste **optionnel et non fait** : écarté sur Mistral en N6, écarté sur Bento et Epoxia en N7 (décision produit, hors périmètre du lot 2).

### N7. FIXME en attente dans Mistral

`bloggrify-mistral/app/app.config.ts:4` : `// FIXME : remove when updated to the latest version of Bloggrify` sur le champ `url: 'https://mistral.bloggrify.com/'`.

**Le FIXME est inversé par la 3.2.0** (vérifié en N6 dans `modules/bloggrify/index.ts:50-73`). Entre 2.0 et 3.1, l'URL du site venait uniquement de `BASE_URL` et le champ `url` d'`app.config.ts` n'était lu par personne : d'où « à retirer ». Depuis 3.2, le core lit ce champ et **lui donne la priorité sur `BASE_URL`** ; il pilote maintenant le canonical, `og:url`, le sitemap et le RSS (et un warning au build signale une divergence `BASE_URL`/`url`). Donc `url` n'est plus de la config morte à retirer, c'est la source de vérité recommandée.

**✅ Fait (N6)** : commentaire FIXME retiré, champ `url` gardé (c'est bien l'URL de prod du démo). Décision produit confirmée par l'utilisateur : **tout centraliser dans `app.config`**, ne plus dépendre de `.env`/`BASE_URL` ni de `nuxt.config`. Le même arbitrage vaut pour les autres thèmes le jour où ils portent un FIXME identique.

### N8. `useAuthor()` est du code mort, et c'est le déprécié qui vit

`app/composables/useAuthor.ts` expose `useAuthor()` (avec `findAuthor` et `hasAuthor`) et un `findAuthor` top-level marqué « deprecated, kept for backward compatibility ». Vérification faite sur les 4 dépôts : **`useAuthor()` n'est appelé nulle part**, sauf par le wrapper déprécié lui-même (ligne 50). Tout le code réel (core inclus, `app/pages/[...slug].vue:7`) passe par le `findAuthor` déprécié.

`hasAuthor` n'est appelé nulle part non plus : c'est du code mort intégral.

Donc la dépréciation est inversée par rapport à la réalité de l'usage. Soit on migre tout vers `useAuthor()` et le wrapper disparaît, soit on assume que la fonction libre est l'API publique et on retire la mention « deprecated ». En l'état, le seul effet est de faire croire à un lecteur que l'API qu'il utilise est en sursis.

### N9. Le template publié embarque l'URL de la démo

`app/SAMPLE.app.config.ts:2` déclare `url: 'https://minimalist.bloggrify.com/'`. Ce fichier est publié sur npm et sert de point de départ aux nouveaux projets : chaque blog créé démarre avec l'URL de la démo Bloggrify, ce qui a un impact SEO direct si l'utilisateur ne la change pas (canonical, sitemap, og:url). À remplacer par un placeholder explicite du genre `https://your-blog.example.com/`.
