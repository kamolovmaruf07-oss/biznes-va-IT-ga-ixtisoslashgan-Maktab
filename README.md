# Biznes va IT ga ixtisoslashgan Maktab — Portfolio sayt

Maktab uchun **Soft UI** uslubida yozilgan, **tun/kun (dark/light)** rejimli bir sahifali portfolio sayt.
Asosiy ranglar: **oq** va **to'q ko'k (navy)**. Sof HTML + CSS + JavaScript — hech qanday framework yoki kutubxona yo'q.

🔗 **Demo (GitHub Pages):** `https://kamolovmaruf07-oss.github.io/biznes-va-IT-ga-ixtisoslashgan-Maktab/`

---

## ✨ Imkoniyatlar

| Bo'lim | Tavsif |
|---|---|
| **Hero** | Qabul banneri, animatsiyali statistika (counter), suzuvchi Soft UI kartalar |
| **Biz haqimizda** | Missiya, afzalliklar ro'yxati, rasm kollaji va yillar tajribasi |
| **Afzalliklar** | 6 ta feature karta (texnopark, ustozlar, xavfsizlik, inkubator...) |
| **Yo'nalishlar** | 8 ta kurs kartasi + **filtr** (IT / Biznes / Ijodiy) |
| **O'quv jarayoni** | 4 bosqichli timeline |
| **Loyihalar (portfolio)** | O'quvchilar loyihalari — CSS bilan yasalgan brauzer/ilova maketlari |
| **Natijalar** | Yutuqlar ro'yxati + animatsiyali progress barlar |
| **Fikrlar** | Avtomatik aylanadigan slider (nuqtalar, strelkalar, swipe) |
| **Ustozlar** | 6 mentor kartasi |
| **Galereya** | Grid-masonry + **lightbox** (klaviatura va swipe bilan boshqariladi) |
| **FAQ** | Akkordeon (bir vaqtda bitta savol ochiq) |
| **Aloqa** | Validatsiyali ariza formasi, kontaktlar, ijtimoiy tarmoqlar |

### Qo'shimcha
- 🌙 **Tun/kun rejimi** — tanlov `localStorage`da saqlanadi, tizim sozlamasini avtomatik aniqlaydi
- 📱 **To'liq responsiv** — mobil menyu (hamburger), 320px dan 4K gacha
- ♿ **Accessibility** — skip-link, ARIA atributlari, `:focus-visible`, klaviatura navigatsiyasi
- ⚡ **Tezlik** — lazy-load rasmlar, `prefers-reduced-motion` hurmati, kutubxonasiz JS
- 🔍 **SEO** — Open Graph, Twitter Card, JSON-LD (EducationalOrganization), `robots.txt`, `sitemap.xml`
- 🖨 **Print** uslubi va **404** sahifasi

---

## 📁 Struktura

```
.
├── index.html              # Asosiy sahifa (barcha bo'limlar + JSON-LD)
├── 404.html                # Xato sahifasi
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css      # Soft UI dizayn tizimi (tokenlar, tun/kun rejim)
    ├── js/main.js          # Tema, slider, filtr, akkordeon, lightbox, forma
    └── img/                # Maktabga oid rasmlar (AI bilan yaratilgan)
        ├── hero-building.jpg     # Maktab binosi — hero
        ├── hero-class.jpg        # Dars jarayoni
        ├── course-frontend.jpg   # Frontend kursi
        ├── course-ai.jpg         # Sun'iy intellekt
        ├── course-business.jpg   # Biznes va startap
        ├── course-marketing.jpg  # Raqamli marketing
        ├── course-design.jpg     # UI/UX dizayn
        ├── course-robotics.jpg   # Robototexnika
        ├── campus-library.jpg    # Kutubxona
        ├── campus-lab.jpg        # Kompyuter laboratoriyasi
        └── favicon.svg
```

---

## 🚀 Ishga tushirish

**1-usul — oddiy ochish:** `index.html` faylini brauzerda oching.

**2-usul — lokal server (tavsiya etiladi):**

```bash
# Python
python3 -m http.server 8000

# yoki Node.js
npx serve .
```

So'ngra brauzerda: `http://localhost:8000`

---

## 🌐 GitHub Pages'ga joylash

1. Repozitoriy → **Settings** → **Pages**
2. **Source:** `Deploy from a branch`
3. **Branch:** `main` · **Folder:** `/ (root)` → **Save**
4. 1–2 daqiqadan so'ng sayt manzilda ochiladi:
   `https://kamolovmaruf07-oss.github.io/biznes-va-IT-ga-ixtisoslashgan-Maktab/`

> Bo'sh `.nojekyll` fayli qo'shilgan — Jekyll filtrlashsiz barcha fayllar to'g'ri xizmat qilinadi.

---

## 🎨 Dizayn tizimi

Ranglar `assets/css/styles.css` faylidagi CSS o'zgaruvchilari orqali boshqariladi:

```css
:root{
  --brand-500:#2f5bd7;   /* asosiy ko'k */
  --navy:#0d2454;        /* to'q ko'k  */
  --bg:#eef2f9;          /* kun rejimi foni (yashil-oq) */
  --surface:#ffffff;     /* kartalar   */
}
[data-theme="dark"]{
  --bg:#050a15;          /* tun rejimi foni */
  --surface:#0c1728;     /* kartalar */
  --text:#eaf1ff;
}
```

**Soft UI tamoyillari:** katta radius (`--r-lg: 28px`), yumshoq ko'p qatlamli soyalar (`--sh-md`, `--sh-lg`),
ko'k gradient tugmalar, oq kartalar va past kontrastli chegara chiziqlari.

Brendning asosiy rangini o'zgartirish uchun faqat `--brand-400 … --brand-700` qiymatlarini yangilash kifoya.

---

## ✏️ Kontentni tahrirlash

| Nima o'zgartiriladi | Qayerda |
|---|---|
| Matnlar, sarlavhalar, statistika | `index.html` (bo'limlar izohlar bilan belgilangan) |
| Telefon, e-mail, manzil | `index.html` → `#contact` va footer |
| Rasmlar | `assets/img/` ichiga bir xil nom bilan qo'ying |
| Kurslar ro'yxati | `index.html` → `#courseGrid` (filtr: `data-cat="it|business|creative"`) |
| Savol-javoblar | `index.html` → `#accordion` |
| Ranglar va soyalar | `assets/css/styles.css` → `:root` |

Forma hozircha demo rejimda (serverga yuborilmaydi) — `main.js` ichidagi `submit` blokiga
`fetch()` yoki Telegram Bot API chaqiruvini qo'shish kifoya.

---

## 📄 Litsenziya

O'quv va ta'lim maqsadlarida erkin foydalanish mumkin. Saytdagi rasmlar AI yordamida maktab
brendi uchun yaratilgan.
