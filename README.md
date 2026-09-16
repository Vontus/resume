# Resume

Bilingual (EN/ES) interactive resume. `index.html` renders `data.js` in the
browser; `scripts/build_cv.py` renders the same `data.js` into the PDFs in
`pdf/`.

## Build

```
uv run --with reportlab python3 scripts/build_cv.py [--lang en|es]
```

## Private variant (phone number)

`data.js` and the public PDFs in `pdf/` intentionally omit the phone number —
they're committed to git and served on the public site.

A phone-included variant is built separately from a gitignored config file,
so the number never reaches git history or the live site:

1. Create `private.json` at the repo root (gitignored):
   ```json
   { "phone": "+34 XXX XX XX XX" }
   ```
2. Build with the `--private` flag:
   ```
   uv run --with reportlab python3 scripts/build_cv.py --private
   ```
   This writes phone-included PDFs to `pdf/private/` (also gitignored),
   leaving the public PDFs in `pdf/` untouched.

`private.json` and `pdf/private/` exist only on disk — since git never sees
them, they are **not backed up by cloning or pushing this repo**. Keep a copy
of the phone number somewhere durable (password manager, personal notes)
outside this repo so it survives losing this machine.
