## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Build: `npm run build` (must stay green). Preview: `npx astro preview`.
SEO-check: `node tasks/check-seo.cjs`.

## Samenwerken (mens en AI)

- Lees eerst `.planning/STATE.md` — daar staat waar we zijn.
- Werk per pagina of per laag, nooit twee agents tegelijk in dezelfde bestanden.
- Branches: `<wie>/<wat>` (bv. `camil/footer-licht`). Merge via pull request met preview-check.
- Na afgeronde taak: één regel in `.planning/STATE.md` (wat + welke bestanden).
- Niet live zetten, geen DNS/hosting wijzigen, geen repo publiceren zonder expliciete "ja" van Camil.

## Huisstijl (hard)

- Tokens in `public/style.css`: `--navy #00298F`, `--red #C30017`, Open Sans, radius 0. Geen nieuwe kleuren of fonts.
- Content in `src/data/*.json`. Geen placeholders, geen ongefundeerde claims — alleen geverifieerde info.
- Nooit blauw op blauw. Max 2 rode accenten per viewport.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
