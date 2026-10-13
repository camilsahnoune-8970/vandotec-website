## Wat

Korte omschrijving. De journaalregel voor `.planning/STATE.md` hoort in deze PR zelf (zie `AGENTS.md`). Bij zichtbare wijziging: tekst voor/na en de screenshot-map.

## Checks (alle drie verplicht)

- [ ] `npm run build` groen (exit 0)
- [ ] `node tasks/check-seo.cjs` → `ALL OK`
- [ ] Preview bekeken door Camil (smaak-review is altijd van hem; onzichtbare wijziging: "n.v.t., onzichtbaar" + reden)

## Verificatie

- Bewijs in `dist/` (links/assets/tellers/contrast), of markeer wat niet geverifieerd is.
- Geen nieuwe kleuren/fonts; geen placeholders; nooit blauw op blauw.

## Review

- [ ] Tweede paar ogen (een andere agent-sessie, niet de bouwer zelf) heeft de diff nagelezen op `AGENTS.md`-regels; bevindingen staan als PR-commentaar.
