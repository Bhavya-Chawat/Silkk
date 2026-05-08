# HSR In-App Marketing Campaign — Slikk Spaces

Objective

- Launch a localized marketing push for the HSR micro-market to drive quick conversions and increase AOV using timed in-app merchandising modules with three A/B tested visual variants to optimize for engagement, urgency, and premium positioning.

Target

- Micro-market: HSR Layout (Bengaluru) — renters and creators looking for quick room updates and styling.

Key Messages

- 60-minute delivery · Try & Buy available · Local stock and special pricing for HSR members.

Modules (in priority order)

- Local Hero Banner: large editorial hero promoting the day’s theme (e.g., Monsoon Cozy Picks) with a local tag and CTA.
- Local Picks Carousel: horizontally-scrollable quick-buy tiles with product price, brief badge and one-tap add-to-cart behavior.
- Flash Edit Strip: time-limited discount badge and progress (e.g., ends in 4h) placed near the top of the Home Decor feed.
- Neighborhood Bundles: curated room bundles for small apartments with local stock indicator and a single-tap bundle add.
- Member Day CTA: persistent micro-strip CTA for HSR members offering additional discounts, linked to products filtered for HSR.
- Creator Spotlight: local creator-curated collection (drive credibility & UGC).

A/B Test Variants

Three weighted variants automatically assigned per-session (stored in sessionStorage for consistency):

- **Control (34%)**: Balanced, traditional design with all modules visible. Time badge shows "Ends in HH:MM:SS" in muted beige. Moderate urgency tone. Hero CTA: "Shop Flash Edit".
- **Urgency (33%)**: Time-sensitive design emphasizing scarcity and deadline. Countdown timer is large and monospace, colored red when < 30 mins remaining with pulse animation. "HURRY — Limited Stock" badges. "Shop Now Before Sold Out →" CTA. 4-stat info grid. More aggressive copy. Measures time-pressure-driven conversion lift.
- **Premium (33%)**: Sleek, minimalist design with curated feel. Dark hero section (#2C1A0E background) with "HSR Essentials — Handpicked for your space" messaging. 3-column product grid only. Focus on quality over quantity. Premium button pair ("Browse All Picks" / "Member Exclusive Deals"). Targets high-AOV, quality-focused positioning.

Variant Selection

- Each new user gets assigned one variant via `selectABVariant(variants, weights)` using weighted random selection.
- Result stored in sessionStorage under `__ab_variant_hsr` for session consistency.
- Analytics events include `variant: "control" | "urgency" | "premium"` payload for tracking conversions by variant.

Wireframe placement

- Place the campaign component directly below the main category hero on the `Home Decor` page so it reads as the local edit for HSR. The `HSRCampaignEnhanced` component automatically selects and renders one of three variants based on A/B assignment.

Implementation notes

- Frontend-only: Use `useCampaignFlag('hsr')` hook to check if campaign is active (enabled && within start/end dates).
- Variant selection: Use `selectABVariant(config.abTest.variants, config.abTest.weights)` to pick variant deterministically per session.
- Analytics: Emit events `hsr_campaign_impression` (on mount), `hsr_variant_assigned` (on variant selection), `hsr_campaign_cta_click`, `hsr_product_click`, and `hsr_member_cta` — all include `variant` payload.
- Scheduling: Configure campaign start/end dates in `campaigns.json` at `src/app/marketing/campaigns.json`. A/B weights also in same config. Toggle `enabled: false` to turn off campaign immediately.

KPIs

- Click-through-rate (CTR) to product pages from local picks. Target > 8%. Expected urgency variant to over-index.
- Conversion rate from local picks to checkout. Target > 6%. Premium variant expected to have higher AOV, urgency higher volume.
- Incremental AOV lift from bundles and premium positioning. Target +15%.
- Variant win metric: which variant drives highest engagement, lowest bounce, best conversion? Use to inform future rollouts.

Notes

- The `HSRCampaignEnhanced` React component (components/marketing/HSRCampaignEnhanced.tsx) is safe to iterate on — swap placeholder imagery (currently `IMAGES.homeDecorEditorial`), update copy, or tweak urgency thresholds (currently 30 mins for red + pulse, 60 mins for orange).
- Urgency variant uses `#FF6B6B` (red) and CSS pulse animation when time < 30 mins for high visual impact.
- Premium variant targets high-intent users; consider layering additional benefits (e.g., VIP early access, free assembly) in future copy iterations.
- To disable campaign: set `"enabled": false` in campaigns.json. To adjust weights: update `"weights": [...]` array (must sum to ~1.0).
