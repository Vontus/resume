# CV repository — tailoring workflow

Bilingual (EN/ES) interactive resume. See `README.md` for how the site and
PDFs are built. This file is about a second, separate workflow: building a
one-off CV tailored to a specific job application.

## Files involved

- `data.js` — the curated, general-purpose CV. Drives `index.html` (the
  public site) and the two standard PDFs in `pdf/`. Hand-maintained,
  deliberately fits one page. Treat it as the stable public identity.
- `experience.js` — the knowledge base. A superset of `data.js`: every
  bullet, stack item, and raw fact Alberto has confirmed, including things
  that don't fit the public one-pager. Not consumed by the site or by
  `scripts/build_cv.py`. This is what you read from when tailoring.
- `scripts/build_cv.py` — the PDF renderer. Reusable: `extract_data()`
  parses any `data.js`-shaped JS object, `build_pdf()` renders it. A
  tailored build should reuse these functions rather than re-implementing
  layout.

## When Alberto pastes a job posting and asks for a tailored CV

1. **Read both `data.js` and `experience.js`** for the languages/companies
   involved. Decide which bullets, stack items and phrasing actually speak
   to *this* posting — reorder and trim, don't invent. Dropping a bullet
   that's true but irrelevant here is fine and expected; the goal is
   relevance, not maximal completeness.

2. **If the posting asks for something not covered in either file, ask
   Alberto before writing anything.** Do not guess at specifics (which
   company, what tool, whether it was really "in production") to make a
   bullet sound more relevant — a wrong guess is worse than no bullet, and
   it will not survive an interview at a company that cares about
   correctness. Push back if his recollection is vague ("I think I did
   this somewhere") and ask for something concrete enough to defend before
   it goes on paper. Once confirmed, add it to `experience.js` (with a
   `confirmed: "<date> — <what was verified and how>"` field on the
   bullet, following the existing examples) — a fact worth using once is
   worth keeping for next time. Only touch `data.js` / the public PDFs if
   Alberto explicitly asks for that.

3. **Build the tailored PDF as a standalone script**, not by editing
   `data.js`. Follow the pattern already used for past applications (ask
   Alberto if any exist under `scripts/tailored/` to see the shape): load
   `data.js` via `build_cv.extract_data()`, deep-copy it, override
   `role`/`profile`/bullets/stack in memory, call `build_cv.build_pdf()`
   with a distinct output filename. This keeps the public CV untouched and
   keeps each tailored version self-contained and re-runnable.

4. **The renderer does not paginate.** It draws everything onto one A4
   canvas and content that overflows the bottom margin is silently cut off
   — no error, no second page. This has bitten every tailoring session so
   far. After generating a PDF, always read it back and check that the
   last experience entry's `Stack` line is fully visible. If it overflows,
   trim wording or drop the least relevant bullet first — the two
   sidebar/main columns are independent, so sidebar length (profile,
   languages) never affects how much room the experience column has, only
   trim on the side that's actually overflowing.

5. **Where the tailored PDF lives**: it's a personal, single-use artifact
   for one application, not part of the site. Don't commit it to the repo
   unless Alberto asks to keep a record of what was sent to a given
   company — if he does, put the *script* under `scripts/tailored/`
   (committed) and keep the generated PDF itself out of git, consistent
   with how `pdf/private/` is handled (see README.md).

6. **Contact info** (email, location, phone) should normally match
   `data.js` as-is. Only diverge if Alberto asks for something specific to
   this application (e.g. mentioning "Remote" explicitly, or the
   phone-included variant via `private.json` — see README.md).

## General repo conventions

Anything that changes `data.js`, the public PDFs, or `experience.js`
follows the git workflow documented in `~/dev/CLAUDE.md` (branch + worktree
+ PR, never straight to `main`). One-off tailored PDFs generated per point
5 above are the exception — they're not committed unless Alberto asks.
