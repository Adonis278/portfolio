# Jerome Adonis — résumé (LaTeX)

Target: **Bank of America**, submitted through an Apex Systems recruiter.

## Compile it

**Overleaf (easiest, nothing to install)**

1. Go to overleaf.com → New Project → Upload Project → upload `jerome-adonis-resume.tex`
2. Make sure the compiler is **pdfLaTeX** (Menu → Compiler)
3. Recompile → Download PDF

**Locally** (needs a TeX distribution — MiKTeX on Windows, TeX Live elsewhere)

```bash
pdflatex jerome-adonis-resume.tex
```

Run it twice if the layout looks off on the first pass.

## Why it is built this way

**It is parsed by a machine before a human sees it.** Going through a staffing
agency means an applicant tracking system reads it first. So: no columns, no
tables holding content, no text boxes, no icons, no images, no header/footer.
Just flowing text under section headings every parser recognises — Education,
Experience, Projects, Technical Skills.

`\pdfgentounicode=1` is not decoration. Without it, some LaTeX builds emit a
text layer where ligatures extract as garbage, and the ATS scores you on
nonsense you cannot see.

**Bullets use Google's XYZ formula** — *"Accomplished [X], as measured by [Y],
by doing [Z]."* The measurable result is deliberately placed at the **start** of
each bullet, because recruiters scan the first few words and move on. "Cut
partner-team administrative workload 20% by…" survives a six-second scan;
"Designed and deployed a Slack-integrated platform, reducing workload by 20%"
does not.

**Monochrome, deliberately.** No `xcolor`, no coloured links, no accent rules —
black on white throughout. Colour reads as *template*, and template reads as
*didn't write this*, which is the last impression you want on a résumé a
recruiter is forwarding internally.

**Right alignment is load-bearing.** `\raggedright` sets `\rightskip` to
`0pt plus 1fil`. That stretchable glue competes with `\hfill` and absorbs it,
so location and dates never reach the right margin — they float a little after
the company name and look like a mistake. The `\headrow` macro resets
`\rightskip` to `0pt` inside a group, giving `\hfill` sole control of the gap.
**Do not remove that reset**, or the header lines collapse back into a jumble.

**One page, verified.** Content measures ~94% of the printable area at
letterpaper/10pt with 0.5in side margins, leaving about three and a half lines
of slack. If you add anything, remove something.

## Which projects made the cut, and why

Chosen against a Bank of America software role, not against what is most
impressive in the abstract:

| Project | Why it is here |
|---|---|
| **WealthBridge / BrightPocket** | The closest thing to the actual job. Bank statement ingestion, transaction categorisation and **PII redaction** is consumer-banking data handling — and it is live and clickable. |
| **CivicLens AI** | $5,000 award is third-party validation, and the engineering underneath — document pipeline, confidence scoring, human review before release — maps onto regulated document workflows. |
| **RemiBand** | Kept for the **$10,500** prize and top-2-of-110 placement, but cut to a single line about the award and the team he led. The wound-care product detail was spending three lines on medical hardware in a banking résumé. |

Left off on purpose: **HairFusion** (consumer AR/beauty), **HBCU Career
Copilot** (design only, nothing built), Dilemo, Cubix.AI and Tinker. All still
live on the portfolio site, which is linked in the header — a recruiter who
wants breadth can find it in one click.

## Numbers on this résumé, and where they came from

Confirmed with Jerome on 2026-08-03:

| Claim | Source | Note |
|---|---|---|
| 20% admin workload cut | his résumé | |
| 40% faster validation | EDITH notes | |
| Answers in **under one minute** | EDITH notes said "under one to two minutes" | **He chose the one-minute end.** Be ready to say how it was measured. |
| **~90% answer accuracy** | EDITH notes said "reported around 90–95%" | Stated at the conservative end. |
| 30% reporting efficiency | his résumé | |
| 120+ stakeholders | his résumé | |
| $10,500 / top 2 of 110 | Propel Future of Tech | |
| $5,000 / 2nd place | InternXL; corroborated by the organiser's "Challenge Winners" email | |

## Before you send it
- [ ] Regenerate `public/resume/jerome-adonis-resume.pdf` in the portfolio repo
      from this build, so the site and the submitted résumé match. A recruiter
      who spots two different résumés notices.
- [ ] If the recruiter sends an actual job description, re-order the Technical
      Skills line to lead with whatever it names first.

## Deliberately excluded

Projected figures. The `~40% engagement lift` and `$50K+ program value` attached
to WealthBridge are projections, not measured outcomes, and a résumé presents
everything on it as fact. One unverifiable number invites doubt about the real
ones — 20%, 30%, $10,500, $5,000 — which are the numbers actually doing the work.
