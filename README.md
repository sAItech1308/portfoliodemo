# Sairam R — Portfolio

A responsive, dependency-light personal portfolio featuring an interactive cursor reveal between a normal portrait and its cybernetic layer.

## Architecture

```text
portfolio-sai/
├── index.html
├── package.json
├── public/
│   └── assets/
│       ├── documents/
│       └── images/
└── src/
    ├── scripts/
    │   ├── main.js
    │   └── reveal-effect.js
    └── styles/
        ├── base.css
        ├── components.css
        ├── main.css
        ├── responsive.css
        └── tokens.css
```

## Run locally

Open `index.html` directly, or run a static server:

```bash
npm run dev
```

The hero image filenames and requirements are documented in `public/assets/images/README.md`.
