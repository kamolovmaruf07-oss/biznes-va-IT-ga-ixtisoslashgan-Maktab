# Biznes va IT ga ixtisoslashgan Maktab — Portfolio sayti

**Soft UI (neymorfizm)** uslubidagi bir sahifali portfolio sayti: **kun va tun** rejimi,
**och sariq + to'q sariq** asosiy palitra va maktabga oid maxsus generatsiya qilingan rasmlar.

## 🚀 Ishga tushirish

```bash
npm start          # yoki: node server.mjs
```

Sayt `http://localhost:8080` (yoki `PORT` env orqali boshqa port) da ochiladi.
Server `0.0.0.0` da tinglaydi — preview muhitlariga mos.

Hech qanday build-qadam yoki dependensiya kerak emas: sof **HTML + CSS + Vanilla JS**.

## ✨ Imkoniyatlar

- **Soft UI / neymorfizm** — ko'tarilgan va botirilgan (inset) yumshoq soyalar, pill-shakl elementlar
- **Kun / tun rejimi** — header'dagi kalit orqali; tanlov `localStorage` da saqlanadi,
  tizim mavzusiga ham ergashadi (`prefers-color-scheme`), FOUC'siz almashinuv
- **Sariq palitra** — och sariq fon (`#f8f1dc` / tun: `#201a0e`), to'q sariq aksentlar (`#f2b705`, `#c98a00`)
- **Seksiyalar**: Hero · Maktab haqida · Yo'nalishlar (IT/Biznes tablar) · Kurslar (filtr bilan) ·
  Ustozlar · Yutuqlar (animatsion hisoblagichlar + timeline) · Galereya (lightbox) ·
  Fikrlar (slider) · Yangiliklar · Aloqa (validatsiyali forma + toast)
- **Interaktivlik**: scrollspy navigatsiya, scroll-progress, reveal animatsiyalari,
  hero'da 3D tilt, galereya lightbox (klaviatura: ←/→/Esc), kurs filtri, mobilda burger-menyu
- **Accessibility**: skip-link, ARIA rolllari, `focus-visible`, `prefers-reduced-motion` hurmati
- **Responsive**: 1180 / 1024 / 760 / 560 px breakpoint'lar
- **SEO & PWA-ish**: meta/OG teglar, `site.webmanifest`, SVG favicon

## 🗂 Tuzilma

```
├── index.html          # Butun sayt (bitta sahifa, 12 seksiya)
├── server.mjs          # Yengil statik Node serveri (0.0.0.0)
├── package.json
├── site.webmanifest
├── css/
│   ├── tokens.css      # Dizayn tokenlari: kun/tun palitrasi, soyalar, radiuslar
│   ├── base.css        # Reset, tipografika, utility'lar, reveal animatsiya
│   ├── components.css  # Tugmalar, kartalar, tablar, slider, forma, lightbox…
│   └── layout.css      # Header, hero, grid'lar, footer, responsive
├── js/
│   ├── theme.js        # Kun/tun rejimi (localStorage + tizim mavzusi)
│   └── main.js         # Nav, counter, tablar, filtr, lightbox, slider, forma
└── assets/
    ├── favicon.svg
    └── img/            # Maktabga oid generatsiya qilingan rasmlar (webp)
        ├── hero-campus.webp      # Kampus izometrik ilustratsiya
        ├── mentor.webp           # Ustoz va o'quvchilar
        ├── it-lab.webp           # IT laboratoriya
        ├── business-class.webp   # Biznes-sessiya
        ├── robotics-lab.webp     # Robototexnika labi
        ├── library.webp          # Kutubxona / coworking
        ├── olympiad.webp         # Taqdirlash marosimi
        └── campus-life.webp      # Kampus hayoti
```

## 🎨 Dizayn tokenlari (qisqacha)

| Token        | Kun        | Tun        | Vazifasi                |
|--------------|------------|------------|-------------------------|
| `--bg`       | `#f8f1dc`  | `#201a0e`  | Och sariq / tun foni    |
| `--gold-1`   | `#ffd75e`  | `#ffe08a`  | Och sariq               |
| `--gold-2`   | `#f2b705`  | `#ffc93c`  | Asosiy sariq            |
| `--gold-3`   | `#c98a00`  | `#f2b705`  | To'q sariq              |
| `--sh-dark`  | `#d5c49b`  | `#0d0a04`  | Neymorfik soya          |
| `--sh-light` | `#ffffff`  | `#362d18`  | Neymorfik yorug' qirra  |

## 📝 Eslatma

Rasmlar AI yordamida aynan shu maktab mavzusida (IT lab, biznes-sessiya, robototexnika,
kampus) yaratilgan va `webp` formatiga optimallashtirilgan (jami ~440 KB).
