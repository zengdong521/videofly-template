# Google Search Central Audit

Last updated: 2026-04-01

This audit follows Google Search Central guidance, especially:

- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Search Essentials](https://developers.google.com/search/docs/essentials)
- [Structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [FAQ and HowTo rich result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)

## Current policy decisions

- Keep only structured data types that clearly match the page and remain broadly useful for this site.
- Avoid FAQ rich result markup for this site category.
- Avoid HowTo rich result markup on tool pages.
- Prefer visible trust signals over hidden metadata tricks.
- Expand content only when it is clearly helpful and materially distinct.

## Keep

These pages currently align best with Google's people-first guidance and should remain indexable.

### Tool pages

- `/text-to-video`
- `/image-to-video`
- `/reference-to-video`

Why keep:

- Strong user intent match
- Real product functionality
- Clear primary purpose
- Good conversion and internal link value

Watch items:

- Add more visible product evidence over time
- Improve screenshots/examples when available
- Keep titles and descriptions tightly aligned with actual functionality

### Guide hub and guide articles

- `/guides`
- `/guides/how-to-write-better-ai-video-prompts`
- `/guides/best-ai-video-workflow-for-product-launches`
- `/guides/how-to-make-tiktok-style-ai-video-ads`

Why keep:

- Best fit for people-first content
- Clear tutorial intent
- Visible author and publish date
- Article markup matches page purpose

Watch items:

- Add human review before publishing more
- Update publish/updated dates when content materially changes
- Add real examples, screenshots, or test outputs to strengthen originality

### Core utility pages

- `/`
- `/pricing`
- `/privacy`
- `/terms`
- `/ai-disclaimer`

Why keep:

- Necessary site structure
- Supports trust, conversion, and compliance
- No longer overloaded with unsupported schema

## Keep But Rewrite

These pages can stay indexable for now, but they need stronger originality and evidence to stay comfortably within Google's helpful content expectations.

### Model pages

- `/sora-2`
- `/veo-3-1`
- `/seedance-1-5`

Current strengths:

- No longer thin placeholders
- Have visible editorial attribution and update date
- Clear internal links
- WebPage markup is appropriate

Why rewrite:

- Still risk feeling programmatic
- Content is informative but mostly generalized
- Needs stronger evidence of first-hand evaluation or unique synthesis

Rewrite priorities:

1. Add concrete example prompts or workflow examples.
2. Add "best for" and "not ideal for" sections grounded in actual product usage.
3. Add model limitations or tradeoffs.
4. Add screenshots or output references if available.

### Comparison pages

- `/compare/sora-2-vs-veo-3-1`
- `/compare/sora-2-vs-seedance-1-5`
- `/compare/veo-3-1-vs-seedance-1-5`

Current strengths:

- Strong search intent
- Clear editorial framing
- Appropriate WebPage markup
- Good internal linking

Why rewrite:

- Comparison claims are still mostly editorial summary
- Need clearer evidence and methodology

Rewrite priorities:

1. Explain how the comparison was made.
2. Add a short methodology note such as prompt style, use case basis, or workflow criteria.
3. Add scenarios where neither model is ideal.
4. Avoid claim wording that sounds like official benchmark or provider statement.

## Watch Carefully

These pages are useful, but they should not be expanded aggressively without data from Search Console.

- `/compare`
- `/guides`

Why watch:

- Hub pages are structurally helpful, but may not be the primary ranking surface
- Their value depends on article and comparison page quality

## Do Not Reintroduce

- FAQPage structured data on general marketing pages
- HowTo structured data on tool pages
- Fabricated review, rating, pricing, or author claims in structured data
- Thin model or comparison pages published only for keyword coverage

## Next review checklist

Run this checklist before expanding content:

1. Is the page clearly useful even if search traffic did not exist?
2. Does the page add something not already covered by another page on the site?
3. Is authorship or editorial ownership visible?
4. Is the page honest about what is editorial guidance versus official provider documentation?
5. Does the metadata match the page purpose exactly?
6. Would we be comfortable keeping the page indexed for a year if rankings were slow?

## Recommended next actions

### Highest priority

- Human-review all model pages
- Human-review all comparison pages
- Add concrete examples or screenshots to guides

### Medium priority

- Submit sitemap in Search Console
- Monitor indexed pages, queries, and impressions
- Trim or noindex weak pages if they fail to earn impressions after a reasonable period

### Only after data review

- Expand guides to 5 to 10 more pages
- Expand comparisons only where there is clear search demand and genuinely distinct value
