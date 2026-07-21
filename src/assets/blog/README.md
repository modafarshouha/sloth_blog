# Blog cover images — generation guide

This directory holds one cover image per blog post. The images are meant to look like a **single cohesive series**. This file records the criteria so future images (for new posts) match the existing set.

Guiding principle: **keep the visual system constant, let the mood vary per topic.**

## File conventions

- **Location:** `src/assets/blog/` (under `src/` so Astro's content pipeline can process/optimize them via the `heroImage` `image()` schema field).
- **Naming:** filename must equal the post slug (the Markdown filename without extension), e.g. `ai_thinking_fast.md` -> `ai_thinking_fast.png`.
- **Format:** PNG.
- **Aspect ratio:** 16:9 (closest to the post layout's ~2:1 hero crop; safe for social share cards).
- **No text in the image:** no words, numbers, lettering, or logos. Titles are rendered by the site, not baked into the art.

## Fixed visual system (keep constant across every image)

- Flat, modern editorial vector illustration.
- Muted, desaturated palette: gray and off-white, with a subtle paper texture and soft film grain.
- Generous negative space; minimal, calm composition.
- A single accent color per image (see mood table below).
- Any human is shown ONLY as a plain, dark, featureless silhouette (no face, no detail).
- Any robot uses one shared aesthetic: a simple, soft, matte light-gray friendly machine.

## Character rules (and why)

- **Do NOT lock a specific recurring "mascot" (a fixed human face or one named robot).** Reasons:
  - Image generation is not deterministic; reproducing the exact same character across separate generations is unreliable and lands in the uncanny "almost-but-not-quite" zone.
  - A fixed cast becomes rigid: it gets awkward for topics that do not fit, and changing it later breaks the back catalog.
  - Not every topic has a human + robot pairing.
- **Do keep the *treatment* consistent:** the dark human silhouette is abstract enough to reuse anywhere without mismatch, and robots (only where they belong) share the matte light-gray look.

## Mood / accent varies per topic

Hold the system above constant, then pick a mood and accent that fit the essay's emotional register. Reference for the current set:

| Post slug | Topic register | Accent / mood |
|-----------|----------------|---------------|
| `people_afraid_of_ai` | unease, awe | cool blue; small friendly gear-robot vs a large looming glowing intelligence |
| `ai_does_not_get_bored` | wistful, longing | soft warm sunrise into cool blue; silhouette + still robot facing an open horizon path |
| `ai_thinking_fast` | dynamic contrast | cool blue; fast streaking blur vs a slow winding path from a profile "mind" |
| `artificial_consciousness` | introspective, eerie | cool blue; robot at a mirror, reflection dissolving into a question mark, faint bat + sonar |
| `ai_hallucination_temperature` | feverish, surreal | warm feverish red-orange into cool blue; silhouette head with dream shapes tied to a glowing thermometer |

## Reusable prompt template

Fill in the two bracketed parts; keep the rest verbatim.

> Flat modern editorial vector illustration, part of a consistent series: muted desaturated gray and off-white paper-textured background, soft film grain, generous negative space, minimal shapes. Any human is depicted only as a plain, dark, featureless silhouette (no face, no detail). Any robot is a simple, soft, matte light-gray friendly machine. Clean, thoughtful, understated. Accent color: [ACCENT/MOOD]. Scene for an essay "[POST TITLE]": [CONCRETE SCENE DESCRIPTION]. 16:9. No text, no words, no numbers, no lettering, no logos.

## After generating

1. Save the file as `<post-slug>.png` in this directory.
2. (Optional) Wire it into the post frontmatter: `heroImage: ../../assets/blog/<post-slug>.png`.
3. Source PNGs are large (~3 MB). Astro resizes/optimizes at build; convert to WebP if you want smaller source files.
