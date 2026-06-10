# CLAUDE.md — Beautrì Website
> Istruzioni di progetto per Claude Code. Leggi tutto prima di toccare qualsiasi file.

---

## Chi siamo

**Beautrì S.R.L.** è un centro tricologico a Cologno al Serio (BG), Italia.
- Sito attuale WordPress: `beautri.it`
- Questo repo (`DenirAdobati/beautri-website`) è il **nuovo sito statico** che sostituirà WordPress
- Pubblicato su **GitHub Pages** — URL temporaneo durante sviluppo, poi punta a `beautri.it` via CNAME
- Il sito WordPress rimane attivo in parallelo finché il dominio non viene trasferito

**Persone chiave:**
- **Daniela Modina** — tricologa, fondatrice, ha sviluppato il "Metodo 80/20"
- **Denir** — gestisce marketing, infrastruttura digitale, content strategy e operazioni tecniche

---

## Brand identity — NON derogare mai da questi valori

### Colori
| Variabile | Hex | Uso |
|-----------|-----|-----|
| `--accent` | `#EAB30A` | Gold — colore principale brand |
| `--text` | `#1A1A1A` | Dark — testi principali |
| `--bg` | `#F8F6F2` | Ivory — sfondo pagina |
| `--surface` | `#ffffff` | Bianco — card, pannelli |
| `--muted` | `#6B6460` | Testo secondario |
| `--border` | `#D2CFC8` | Bordi e separatori |

⚠️ Il gold è `#EAB30A`. MAI usare `#C9A227` o varianti non approvate.

### Tipografia
- **Poppins Bold** — titoli principali (headings)
- **Lora Italic** — sottotitoli, accenti gold, citazioni
- **Inter** — body text, UI (già in uso nel sito attuale)

### Voce del brand (copywriting "stile Beautrì")
- Frasi brevi, ritmo ipnotico/emotivo
- Seconda persona singolare "tu"
- Nessun CTA non richiesto
- Il copy deve riflettere fedelmente ciò che dice Daniela — zero informazioni aggiunte dall'esterno
- Termine corretto per lo spazio fisico: **"salone"** (non "studio", non "centro")

### CTA principale
Tutti i CTA puntano al Typeform:
```
https://form.typeform.com/to/QUzap8so
```
NON usare `mailto:` né altri link per i CTA primari.

---

## Struttura del repo

```
beautri-website/
├── index.html          ← pagina principale (già esistente, bozza)
├── CNAME               ← da aggiungere quando si trasferisce il dominio
├── assets/
│   ├── images/         ← immagini caricate progressivamente
│   ├── fonts/          ← font locali se necessari
│   └── icons/          ← SVG e icone
├── css/
│   └── style.css       ← da estrarre quando index.html cresce
└── js/
    └── main.js         ← da estrarre quando index.html cresce
```

> Per ora tutto è in `index.html`. Quando il file supera ~600 righe, estrai CSS e JS nei rispettivi file.

---

## Stato attuale del sito (`index.html`)

Il file contiene già una **bozza funzionante** con:
- Header sticky con hide-on-scroll
- Hero grid (copy + panel laterale)
- Stats row (280+ clienti, 40+ anni, 80/20, 100% personalizzato)
- Widget Google Reviews (4,9 ★ — 207 recensioni)
- Sezione "Come aiutiamo" (4 card)
- Sezione "Metodo 80/20" (split grid + highlight panel)
- Sezione "Siamo Beautrì" (4 card)
- Sezione "Testimonianze" (3 card dark)
- CTA panel finale
- Footer
- CSS responsive (breakpoint 1080px e 720px)
- JS scroll per header

**Da costruire / migliorare:**
- [ ] Sostituire testi placeholder con copy definitivo
- [ ] Aggiungere immagini reali (caricate progressivamente in `assets/images/`)
- [ ] Sezione "Chi Siamo" con foto Daniela
- [ ] Pagina/sezione Blog
- [ ] Testimonianze reali con nome cliente (quando disponibili da sistema raccolta feedback)
- [ ] Navigazione mobile hamburger (opzionale, la nav attuale scorre orizzontalmente)
- [ ] Google Analytics / GA4
- [ ] WhatsApp floating widget
- [ ] SEO meta tags completi (OG, Twitter Card, structured data)
- [ ] CNAME file per il dominio

---

## Regole tecniche

### HTML/CSS
- Il sito è **HTML/CSS/JS puro** — nessun framework, nessun bundler
- Compatibile con GitHub Pages (file statici only)
- CSS custom properties in `:root` — usa sempre le variabili, mai hex hardcoded
- Mobile-first responsive: breakpoint principali a `720px` e `1080px`
- `scroll-behavior: smooth` attivo
- Immagini sempre con `alt` descrittivo

### Performance
- Nessuna dipendenza da CDN esterne per CSS/JS critici (tutto inline o locale)
- Google Fonts caricati con `display=swap`
- Immagini: usare dimensioni appropriate, aggiungere `loading="lazy"` sulle immagini below-the-fold

### Accessibilità
- `aria-label` sui widget e elementi non testuali
- Focus visibile su tutti gli elementi interattivi
- Contrasto colori conforme WCAG AA

---

## Workflow con Denir

1. **Denir carica le immagini** progressivamente in `assets/images/`
2. **Denir indica i testi/copy** da inserire — Claude li implementa senza modificarli
3. **Le sessioni Claude Code sono singole** — questo CLAUDE.md è la memoria persistente
4. **Non chiedere conferma** prima di modifiche CSS/layout già discusse nella sessione
5. **Chiedi** se il copy non è stato fornito esplicitamente — non inventare testi sul brand

---

## Sezioni prioritarie (ordine di sviluppo)

1. **Home** — hero, stats, come aiutiamo ✅ bozza
2. **Metodo 80/20** — spiegazione approfondita ✅ bozza
3. **Chi Siamo** — profilo Daniela Modina, storia Beautrì
4. **Testimonianze** — recensioni reali da Google / sistema feedback
5. **Blog** — lista articoli (statica o generata)
6. **Navigazione** — rifinitura mobile

---

## Note importanti

- I numeri nelle stat (`280+`, `40+`, `4,9`, `207`) sono dati reali — non modificarli senza conferma
- Il Metodo 80/20 è proprietario di Daniela — descriverlo solo con le sue parole
- Instagram: `@beautriparrucchieri`
- Email: `info@beautri.it`
- Il sito ha 7 commit e 2 contributori (claude + DenirAdobati) — storia pulita, mantienila

---

## Esempio stile CSS da mantenere

```css
/* Variabili brand — sempre da :root */
--accent: #EAB30A;
--text: #1A1A1A;
--bg: #F8F6F2;

/* Bottone primario */
.button-primary {
  background: var(--accent);
  color: white;
  border-radius: 999px;
  font-weight: 700;
}

/* Card base */
.card {
  background: var(--surface);
  border-radius: 28px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 24px 40px rgba(26, 26, 26, 0.05);
}
```
