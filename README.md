# 🏺 Temple of Kemet

> *"Il Tempio del Destino ti attende."*

Slot machine dell'antico Egitto — un viaggio attraverso 62 simboli storici, divinità, gemme preziose e misteri millenari.

**🎮 Gioca ora:** [temple-of-kemet.pages.dev](https://temple-of-kemet.pages.dev)

---

## Il Gioco

Temple of Kemet è una slot machine storico-narrativa ambientata nell'antico Egitto. Ogni spin è un'offerta agli dei. Ogni vittoria, una benedizione. Ogni sconfitta, una lezione.

### Caratteristiche

- **62 simboli** ispirati all'antico Egitto — dal grano dello schiavo alla Corona Pschent del Faraone
- **50 paylines** con visualizzazione grafica
- **Progressione sociale infinita** — da Schiavo a Dio e oltre
- **Simboli ciclici** — ogni livello ha un pool unico di normali + speciali + gemma + divinità
- **Mini-giochi** — Sfinge, Vaso Antico, Papiro Sacro, Geroglifici
- **Leaderboard globale** su Cloudflare KV
- **262 frasi storiche** sui simboli dell'antico Egitto
- **3 tracce musicali** cicliche per livello
- **Effetti speciali** — Wild, Moltiplicatori ×2/×10, Penalità, Jackpot 10.000 Deben

### Simboli

| Categoria | Esempi |
|-----------|--------|
| **Normali** | Grano, Ciotola, Cipolla, Cobra, Ibis, Uva, Pistacchio, Obelisco, Piramide... |
| **Pietre Preziose** | Rame → Onice → Rubino → ... → Oro → Meteorite |
| **Divinità** | Ra, Osiride, Iside, Horus, Anubi, Thoth, Hathor... |
| **Speciali** | Ouroboros (Wild), Scarabeo (×2), Moneta d'Oro (×10), Corona Pschent (Jackpot) |

### Progressione Sociale

`Schiavo → Servo del Tempio → Bracciante → Pescatore → Contadino → Pastore → Artigiano → Vasaio → Carpentiere → Commerciante → Soldato → Scriba → Sacerdote → Gran Sacerdote → Visir → Generale → Principe → Faraone → Dio`

---

## Struttura

```
temple-of-kemet/
├── index.html          # Gioco completo (single file)
├── README.md
├── assets/
│   ├── img/symbols/    # 62 icone simboli (.png)
│   └── audio/          # Effetti sonori e musica (.mp3)
└── worker/
    ├── index.js        # Cloudflare Worker — leaderboard API
    └── wrangler.toml   # KV binding KEMET_SCORES
```

---

## Deploy

- **Sito:** Cloudflare Pages — deploy automatico da GitHub
- **Leaderboard:** Cloudflare Workers KV (`KEMET_SCORES`)
- **Worker API:** `https://temple-of-kemet.jonalinux-uk.workers.dev`

---

© 2025 Jonathan Sanfilippo — Temple of Kemet™  
Gioco di puro intrattenimento. Nessun denaro reale è coinvolto.
