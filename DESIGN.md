---
name: English jing jing
description: An English trainer built specifically for Thai speakers — vocabulary, grammar, verb conjugation, and pronunciation, taught with color as a teaching tool.
colors:
  textbook-blue: "#5b8def"
  textbook-blue-light: "#7aa8ff"
  unlock-violet: "#8e5bef"
  unlock-violet-light: "#a97bff"
  thai-amber: "#f2a65a"
  thai-amber-light: "#ffb877"
  correct-green: "#4caf7d"
  correct-green-light: "#63d29a"
  retry-red: "#e0616b"
  retry-red-light: "#ff8a9c"
  listening-teal: "#2bb3b3"
  listening-teal-light: "#4fd1d1"
  surface-bg: "#0a0c16"
  surface-card: "#161a2e"
  surface-card-alt: "#1b2036"
  surface-inset: "#10142a"
  text-primary: "#f2f3f7"
  text-muted: "#9aa0b4"
  text-faint: "#8188a0"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.3px"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif"
    fontSize: "21px"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.2px"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  xs: "4px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "24px"
components:
  button-primary:
    backgroundColor: "{colors.textbook-blue}"
    textColor: "#071b33"
    rounded: "{rounded.sm}"
    padding: "16px"
  button-primary-hover:
    backgroundColor: "{colors.textbook-blue}"
    textColor: "#071b33"
  button-affirm:
    backgroundColor: "{colors.correct-green}"
    textColor: "#08210f"
    rounded: "{rounded.md}"
    padding: "15px"
  button-retry:
    backgroundColor: "{colors.retry-red}"
    textColor: "#330a12"
    rounded: "{rounded.md}"
    padding: "15px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.sm}"
    padding: "14px"
  card-surface:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "18px"
  input-field:
    backgroundColor: "{colors.surface-inset}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "14px 16px"
  chip-pill:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.pill}"
    padding: "9px 14px"
---

# Design System: English jing jing

## Overview

**Creative North Star: "The Color-Coded Language Lab"**

This is a mobile-first web app (a Next.js marketing shell wrapping a single self-contained `public/app.html` product), teaching English to Thai speakers through flashcards, verb conjugation drills, pronunciation practice, and grammar lessons. The defining trait of the visual system isn't decoration — it's that color carries real information. Thai-language text is always rendered in one specific warm amber (`--thai`, aliased from the orange family) everywhere in the product, so a learner's eye can separate "what I already know" (Thai) from "what I'm learning" (English) at a glance without reading closely. Each of the six learning modules owns one hue (Flashcards is blue, Drill is orange, Pronunciation is violet, Verb Dictionary is green, Grammar is red, Listening is teal), so navigation itself becomes a color-memory exercise. Inside grammar lessons, individual parts of speech (article, verb, preposition, negation, superlative...) each get their own dedicated color, turning example sentences into color-coded diagrams.

Surfaces are dark by default (a near-black `#0a0c16`) with a full, independently-tuned light theme, and every filled button or badge carries a soft shadow tinted to its own hue rather than a neutral gray one — buttons feel like small glowing objects, not flat rectangles. Corners are generously rounded throughout (14–28px on real content, full pills for tags and toggles), nothing is sharp-cornered. Iconography is a single consistent thin-stroke outline system (18px, 2.4px stroke, no fills) — never emoji, never a second icon family.

Confirmed anti-reference: gradient-filled text and springy/elastic "bounce" easing were both present earlier and have since been removed project-wide in favor of solid accent color and smooth exponential deceleration — treat both as rejected, not merely avoided.

**Key Characteristics:**
- Color is pedagogical: Thai = amber, English = default text, one hue per module, one hue per part of speech.
- Dark-first with a fully-realized light theme — never assume dark-only.
- Every filled surface's shadow and every translucent wash is tinted to its own hue via `--{hue}-rgb` tokens, never neutral gray, never a hardcoded literal.
- Generously rounded, soft, tactile — a study tool that feels warm, not a spreadsheet.
- One outline icon system, one type family, no ornamental typography.

## Colors

The palette is six functional hues, each with a base and a lighter "-2" tone used as the light end of that hue's own gradients, plus a small neutral scale. Every hue also has a `--{hue}-rgb` sibling (a bare `R,G,B` triple) specifically so translucent tints and glows can reference the same token family instead of hardcoding numbers that go stale when the theme changes — see the Named Rule below.

### Primary
- **Textbook Blue** (`#5b8def`, light tone `#7aa8ff`): the default action color — primary buttons, the Flashcards module (the one free-forever module), links, and the drill "Check" button. If a control doesn't have a specific semantic meaning (success, error, a specific module), it's blue.

### Secondary
- **Unlock Violet** (`#8e5bef`, light tone `#a97bff`): the brand accent. Used for the "jing jing" half of the wordmark, the app icon/splash mark, the Pronunciation module, and the paywall's unlock imagery — consistently the color of "this is the product's identity" or "this is what you get by paying."

### Tertiary
- **Thai Amber** (`#f2a65a`, light tone `#ffb877`): aliased as `--thai` and used for **every piece of Thai-language text in the product**, full stop — captions, translations, section labels, hint text. It is also the Conjugation Drill module's color and the daily-streak badge's color. Because this hue means "Thai" everywhere else, be careful reusing it decoratively — it is doing real information work.
- **Correct Green** (`#4caf7d`, light tone `#63d29a`): success state — the "I know it" flashcard button, correct-answer feedback, completed lesson badges, the Verb Dictionary module, the unlock-celebration badge.
- **Try-Again Red** (`#e0616b`, light tone `#ff8a9c`): error state — the "Again" flashcard button, wrong-answer feedback and shake, the Grammar module.
- **Listening Teal** (`#2bb3b3`, light tone `#4fd1d1`): reserved for the Listening module only — the one hue that doesn't do double duty as a semantic state, making it read as "this specific place" whenever it appears.

### Neutral
- **Deep Space** (`#0a0c16` dark / `#f4f5fa` light) — page background (`--bg`). Never flat: the actual rendered background is this solid color plus two large, soft, viewport-fixed radial glows tinted blue and violet (`--glow1`/`--glow2`), so the app never feels like a plain black or white screen.
- **Card** (`#161a2e` dark / `#ffffff` light) and **Card Alt** (`#1b2036` dark / `#eef0f7` light) — two steps of surface elevation for stacked content (a card, and a card-on-a-card).
- **Inset** (`#10142a` dark / `#eceef6` light) — recessed surfaces: text inputs, search bars, thumbnail chips.
- **Text** (`#f2f3f7` dark / `#161a2c` light), **Muted** (`#9aa0b4` dark / `#585e77` light), **Faint** (`#8188a0` dark / `#666c88` light) — a three-step text hierarchy. Note: the marketing/legal pages use a slightly darker faint (`#6b7288`) than the in-app product (`#8188a0`) — a deliberate, documented exception (the in-app screens' surfaces read better against a lighter gray), not a drift bug.
- **Hairline** (`rgba(255,255,255,.08)` dark / `rgba(20,22,38,.08)` light) — the only border/divider treatment; never a solid gray line.

### Named Rules
**The Thai-Is-Amber Rule.** Any text in the Thai language, anywhere in the product, renders in `--thai` (Thai Amber). This is the single most load-bearing color convention in the app — it's how a learner tells "translation" from "the thing I'm learning" without reading word-by-word. Don't repurpose this hue for anything that isn't Thai text or the Drill module.

**The Colored Glow Rule.** Shadows are never neutral gray. A filled button or badge's `box-shadow` is tinted to its own hue at low opacity via that hue's `--{hue}-rgb` token (e.g. a blue button gets `rgba(var(--blue-rgb),.7)`), almost always paired with a 1px white inset highlight along the top edge for a soft glossy lift. The one exception is neutral UI chrome (cards, dividers, the sticky header) — those stay hairline-gray.

**The Token, Never the Literal Rule.** Every translucent tint, wash, or glow must reference `rgba(var(--{hue}-rgb),alpha)`, never a hardcoded `rgba(R,G,B,alpha)` literal. A hardcoded literal freezes at whichever theme was active when it was written and silently breaks when the surrounding text/border (which correctly uses the token) flips themes. This was a real, project-wide bug class before it was swept — don't reintroduce it.

## Typography

**Font:** `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif` everywhere — one system-font stack for the whole product, English and Thai alike (the OS handles Thai glyph rendering; there is no dedicated Thai webfont in the app itself). The exception is the legal pages, which explicitly pin `"Noto Sans Thai", "Leelawadee UI"` for their Thai clause text — a deliberate legibility choice for dense legal copy, not the norm elsewhere.

**Character:** Almost everything is set at font-weight 800 (headings, labels, button text, badges) or 700 (secondary UI text) — the type system leans heavy and confident rather than using a wide weight range. Body copy and descriptions are the only genuinely light-weight (400) text in the product.

### Hierarchy
- **Display** (800, 34px, line-height 1.3, `-0.3px` tracking): the flashcard word itself — the single largest, most important piece of text in the whole app, because the word being learned *is* the content.
- **Headline** (800, 21px, line-height 1.25): modal and celebration titles ("Unlimited access unlocked").
- **Title** (800, 16px, `-0.2px` tracking): every screen's topbar title.
- **Body** (400, 14px, line-height 1.5): descriptions, hints, drill prompts.
- **Label** (800, 12px, `0.06em` tracking, uppercase): section labels, eyebrows, tag/badge text — always uppercase with open tracking when it's a label rather than content.

## Layout

The app is a fixed-width mobile shell: `max-width:480px`, centered, `height:100dvh`, with the outer `html`/`body` locked (`overflow:hidden`) so only the current screen scrolls (`overflow-y:auto`) — this is what makes sticky in-screen headers and bottom-anchored primary buttons work reliably. Each screen gets `padding:14px 18px`. On desktop, the shell is capped and centered rather than stretching full-width (`@media(min-width:700px)` re-derives the same fluid formulas for a capped-height card) — this is a phone-shaped product even when viewed on a large screen.

Sizing throughout leans on `clamp()` keyed to the app's own rendered height via container-query units (`cqh`), not fixed breakpoints — icon sizes, paddings, and gaps scale continuously across phone heights instead of jumping at set widths. Component spacing is tight within a group (6–10px) and generous between groups (18–28px, frequently `margin-top:24px` or `28px` between stacked sections).

## Elevation & Depth

Hybrid: flat neutral surfaces (cards, inputs, dividers use only hairline borders, no shadow) plus deliberately dramatic colored shadows on anything meant to feel like a primary, tappable, "press me" object — see the Colored Glow Rule in Colors. A card is flat; a button glows.

### Shadow Vocabulary
- **Primary lift** (`box-shadow: 0 14px 30px -10px rgba(var(--{hue}-rgb),.5-.7), inset 0 1px 0 rgba(255,255,255,.3-.4)`): the standard filled-button treatment — large soft blur, negative spread (keeps it tight to the element), tinted to the button's hue, plus a glossy top-edge highlight.
- **Ambient card lift** (`box-shadow: 0 50px 100px -30px rgba(0,0,0,.35), 0 0 0 1px rgba(var(--hairline-rgb),.06)`): reserved for true overlays (the flashcard's flipped face) — one of the only neutral (non-tinted) shadows in the system, because it needs to sit above everything regardless of hue context.

### Named Rules
**The Flat-Card, Glowing-Button Rule.** Passive containers (cards, rows, inputs) stay flat with a hairline border only. Shadow is reserved for things the user is meant to press.

## Shapes

Corners are large and consistent: **14px** (`--radius`, the default for buttons and inputs) and **20px** (the default for cards) do most of the work, with **28px** for the largest surfaces (modals, the flipped flashcard face) and full **999px** pills for tags, toggles, and filter chips. Nothing in the product uses a sub-8px radius except tiny inline chips (syllable/letter badges). There are no sharp (0px) corners anywhere in the UI.

Icons are a single outline system: 18px box, 2.4px stroke, `fill:none`, `stroke:currentColor` — meaning every icon automatically inherits whatever text color its container sets (this is also how the contrast fixes in this system work: set the container's `color`, the icon follows for free).

## Components

### Buttons
- **Shape:** 14px radius (`.primary-btn`, `.btn-check`), 18px on the two large flashcard-flip buttons.
- **Primary:** Textbook Blue fill, `#071b33` (near-black, blue-tinted) text — never white text on a filled gradient; white fails contrast against these hues' light tones, so every filled button uses a hue-matched near-black text color instead (`--on-blue`, `--on-green`, `--on-orange`, `--on-violet`, `--on-red`, `--on-teal`).
- **Affirm / Retry:** the flashcard "I know it" (Correct Green fill, `#08210f` text) and "Again" (Try-Again Red fill, `#330a12` text) pair — same dark-text-on-tinted-fill pattern, color signals the semantic action.
- **Ghost:** transparent fill, hairline border, primary text color — the secondary/dismissive action next to a primary button.
- **Press feedback:** `transform:scale(.94-.98)` on `:active`, no hover states (this is a touch-first product).

### Chips (Pills, Tags, Badges)
- **Filter pills:** full-pill radius, card background, hairline border; `.active` state fills with the current semantic accent color.
- **Module/status tags:** smaller radius (10–12px), filled with a hue at ~14% opacity via the `--{hue}-rgb` tokens, text in the solid hue — this "tinted wash + solid-color text" pattern (as opposed to gradient-fill) is the standard tag treatment throughout, distinct from the "colored glow" pattern reserved for buttons.

### Cards / Containers
- **Corner style:** 20px standard, 16px for tighter list rows, 26–28px for hero surfaces.
- **Background:** Card or Card Alt, occasionally a soft two-stop gradient between them (`linear-gradient(160deg,var(--card2),var(--card))`) for slightly more visual depth on hero cards without introducing an actual shadow.
- **Border:** 1px hairline only; cards never carry a colored border except the two states that are semantically meaningful (a correct/incorrect answer's card border shifts to green/red).

### Inputs / Fields
- **Style:** Inset background, hairline border, 14px radius, 16px font-size (deliberately ≥16px to prevent iOS auto-zoom on focus).
- **Focus:** border color shifts to Textbook Blue; on the search bar specifically, the parent container also gains a soft blue ring (`box-shadow:0 0 0 3px rgba(var(--blue-rgb),.18)`) since the input itself has no visible border of its own to change color.

### Toggles
- Pill-shaped track (44×26px) with a circular white thumb that slides; track fills with the accent color when on. Every real toggle in the product carries `role="switch"` and a synced `aria-checked` — the visual state and the accessible state are never allowed to drift apart.

### Navigation
- A sticky topbar (`background` matches the page's own fixed radial-glow composition, no blur) carries a 40×40 circular-ish back button on the left, a centered title, and a balancing spacer or secondary action on the right. Icon-only buttons throughout (back, settings, speaker, step controls) carry an invisible padded hit-area via `::before` so the tap target clears accessibility minimums without growing the visible icon — the visual language stays small and quiet even where the tap target is generous.

### Signature Component: Part-of-Speech Chips
Inside grammar lesson example sentences, individual words are wrapped in small colored chips keyed to their grammatical role — article, number, auxiliary, negation, preposition, superlative, adverb each get one dedicated hex (a separate small palette from the six main hues, defined once as a lookup table in the lesson-rendering code). This turns a plain example sentence into a color-coded parse diagram and is the most distinctive, product-specific visual idea in the system — worth preserving exactly, not genericizing into the main hue palette.

## Do's and Don'ts

### Do:
- **Do** keep Thai text in `--thai` (Thai Amber) everywhere, with no exceptions — it's a functional signal, not a stylistic choice.
- **Do** give every filled button/badge a hue-tinted shadow and a hue-matched dark text color (`--on-{hue}`), never white text on a light gradient stop.
- **Do** reference `rgba(var(--{hue}-rgb),alpha)` for any translucent tint — never hand-write an `rgba(R,G,B,alpha)` literal.
- **Do** keep one hue per learning module and reuse those same hues consistently for that module's icons, tags, and accents wherever it appears.
- **Do** round generously (14px minimum on real content, pills for tags/toggles) and keep the single outline icon system.
- **Do** gate any expressive/celebratory motion (confetti, pulsing, pop-ins) behind `prefers-reduced-motion`, preserving whatever state the motion was communicating through a non-motion cue instead.

### Don't:
- **Don't** use gradient-clipped text for emphasis. Solid color at the existing bold weight is the standard; this was a review finding removed project-wide, not a style still in use.
- **Don't** use springy/elastic easing (`cubic-bezier` values that overshoot past 1). Use a smooth exponential ease-out (`cubic-bezier(.16,1,.3,1)`) for any pop-in or scale transition instead — also a removed pattern, not a live one.
- **Don't** put white text directly on a hue's light ("-2") gradient stop; it fails contrast in both themes. Use that hue's `--on-{hue}` token.
- **Don't** introduce a neutral-gray shadow on anything meant to feel primary/tappable — shadows on active elements are always hue-tinted.
- **Don't** repurpose Thai Amber, or any single module's hue, for an unrelated decorative use — every hue in this system is currently doing semantic work.
