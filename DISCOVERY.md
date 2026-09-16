# Discovery — Emergence Landscape Horticulture

Source material so far: the business's Facebook page (screenshots supplied
by the client) and their existing logo. Their old site (`emergencelh.com`)
is not reachable from this build environment — general web egress is
blocked and only an allowlist of infra domains (GitHub, npm, Google Fonts,
etc.) gets through. The client's `/values` page content is a **blocking**
open item pending them pasting it in.

## Confirmed facts (source: Facebook page, cited)

- **Name**: Emergence Landscape Horticulture *(confirmed — FB page title)*
- **Phone**: (604) 379-9912 *(confirmed — FB contact info)*
- **Email**: info@emergencelh.com *(confirmed — FB contact info)*
- **Website**: emergencelh.com *(confirmed — FB "Links" section)*
- **Facebook**: @emergencelh *(confirmed — FB contact info)*
- **Messenger**: Emergence Landscape Horticulture *(confirmed — FB contact
  info)*
- **Service area**: West Vancouver BC, Langley BC, North Vancouver BC, plus
  a 4th area truncated in the screenshot as "New…" *(confirmed partial —
  FB "Details" section; 4th city name is a blocking TODO, likely New
  Westminster but not guessed/rendered as fact)*
- **Logo**: extracted from the FB photo post dated Jul 11, 2022 *(confirmed
  — see `src/assets/brand/logo-mark.png` / `logo-mark-reversed.png`)*
- **Reviews**: Facebook shows "1 review" with no visible rating/text in the
  supplied screenshot *(confirmed count only — not enough to publish an
  `aggregateRating` or any testimonial; see Playbook §1 on never fabricating
  reviews)*
- **Footer credit**: site footer reads "built by Destura" *(confirmed —
  explicit client instruction, not a discovery fact)*

> **Important:** the site no longer shows `TODO:` markers in its visible copy
> — it was cleaned up to be presentable to the client. That makes **this
> document the only record of what is still unconfirmed.** The draft copy was
> written to describe an *approach* and never to assert a verifiable fact:
> there are no claims of credentials, certifications, training, years in
> business, team size, awards, review counts, or ratings anywhere on the page.
> Everything below still needs the client's confirmation before launch.

## Open — blocking launch

- [ ] **Values/mission copy** from `emergencelh.com/values` — requested
  from the user, pending.
- [ ] **Full service area name** (the 4th, truncated "New…" city).
- [ ] **Services offered** — not yet confirmed. The name "Landscape
  Horticulture" implies design/installation, planting, pruning, and
  maintenance, but nothing here is confirmed; services section will render
  with clearly marked `TODO:` placeholders until the client confirms.
- [ ] **The core argument** (Playbook §2) — what this business can say that
  competitors can't. Not yet stated by the client or found in the source
  material; needs their input or something to infer it from (an old ad,
  a review, the values page once available).
- [ ] **Real job/property photos** — still none of Emergence's *own* work.
  Three AI-generated stand-ins (supplied by the client) are in place for the
  hero, the proof section, and the lead work tile; one work tile is still a
  styled placeholder. These are generic West Coast garden imagery, **not
  photos of this company's projects**, and should be swapped for real,
  EXIF-stripped job photos before launch. Until then the site must not
  describe them as Emergence's completed work.

## Open — nice to have

- [ ] Years in business / founding story.
- [ ] Certifications or licensing (e.g., horticulture credentials, WCB).
- [ ] More Facebook post content — a Sep 7 post opens "Labour Day is one of
  the few holidays that as…" (truncated in the screenshot) and may carry
  useful brand voice; not pulled in as fact since the full text isn't
  visible.
- [ ] Additional photos from the Facebook Photos tab.

## Explicitly excluded per playbook guardrails

- No testimonials are fabricated or rendered as real. With only "1 review"
  and no visible content, the testimonials section either stays out or
  renders a sample block with a visible "sample" badge.
- No phone number is invented — the one confirmed number above is used
  everywhere; no placeholder 555-01XX number is needed unless a second,
  unconfirmed number shows up later.
- No years-in-business, license numbers, or review counts are stated
  without a confirmed source.
