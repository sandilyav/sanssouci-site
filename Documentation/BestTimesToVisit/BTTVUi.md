Sans Souci – Best Times to Visit Engine

Part 3: UI System Specification

⸻

1. UI Philosophy

This component must feel:

• Premium
• Calm
• Confident
• Lightweight
• Intelligent

It must not feel like a weather dashboard.

The visitor should understand within 5 seconds:

“These are the best times to come.”

Clarity over data density.

⸻

2. Placement in Hero Section

Location:

Right side panel inside hero area (desktop).
Stacked below headline on mobile.

Hierarchy priority:
	1.	Hero image
	2.	Headline
	3.	Best Times panel
	4.	CTA button

The feature should support conversion, not compete with it.

⸻

3. Core Layout Concept

Vertical Time Grid

Structure:

Columns = Days (Today + next 4 days)
Rows = Time windows (2-hour blocks)

Example row times:
6–8 AM
8–10 AM
10–12 PM
4–6 PM
6–8 PM

Only show relevant daylight windows unless scoring justifies otherwise.

⸻

4. Day Column Design

Each day header displays:

• Day name (Sat, Sun, Mon)
• Date
• Optional subtle moon icon (if full moon)

Active day (Today) highlighted subtly.

No heavy borders. Keep minimal.

⸻

5. Time Window Indicators

Each time window is represented as a circular indicator centered in its cell.

Circle size: medium prominence.

Inside circle:
Primary activity icon (if Perfect)
or
Small stacked icons (if multiple activities)

Icon examples:
Kayaking icon
Sun icon (sunset)
Dune icon

Do not show text inside circle.

⸻

6. Color System

Three visual states only:

Perfect
Strong accent color (deep teal or emerald)
Solid fill

Good
Muted accent (lighter tone)
Soft fill

Not Ideal
Low-contrast neutral grey
Subtle outline

Avoid red. This is not a warning system.

⸻

7. Interaction Behavior (Desktop)

Hover on circle:

Small tooltip card appears.

Tooltip includes:

• Time range
• Overall rating label
• Recommended activities (icon + label)
• Tide height
• Wind speed
• Temperature
• Sunrise/Sunset if applicable

Tone:
Short, confident statements.

Example:
“High tide at 5:12 PM. Wind calm. Ideal kayaking window.”

Do not show raw technical jargon.

⸻

8. Interaction Behavior (Mobile)

Tap expands an overlay sheet from bottom.

Sheet contains same information as tooltip.

Tap outside to close.

Important:
Touch targets must be large enough to avoid frustration.

⸻

9. Activity Icon Rules

Only show icons for activities with score above 75.

If more than 2 activities qualify:

Show primary (highest score) in circle.
List others in tooltip detail.

Icons must be minimal, single-color, consistent stroke width.

No emojis.

⸻

10. Legend

Below grid, include subtle legend:

Small colored dots:

Perfect
Good
Not Ideal

Keep typography small and quiet.

⸻

11. Responsiveness Rules

Desktop:
Full multi-day grid visible.

Tablet:
Reduce to 3 days visible; allow horizontal scroll.

Mobile:
Single day view by default.
Horizontal swipe for other days.

Vertical structure remains consistent.

⸻

12. Motion Design

Subtle animations only.

On load:
Fade in circles progressively by day.

On hover:
Circle expands slightly (scale 1.05)

Tooltip fades in softly.

No bounce or playful animations.
Tone must remain premium.

⸻

13. Empty State Handling

If all windows score below 60:

Instead of showing grey wall:

Display message:

“Conditions moderate this week. Morning visits recommended.”

Still display grid, but highlight best available window.

Never hide the component entirely.

⸻

14. Data Confidence Indicator (Optional Microtext)

Small text at bottom:

“Updated 3 hours ago”

Builds trust.

No need to show source.

⸻

15. CTA Integration

Below panel include contextual CTA:

“Plan your visit for this window”

If user clicks a specific window, CTA can prefill inquiry:

“Interested in Saturday 4–6 PM”

This is future enhancement but UI must allow it.

⸻

16. Design Constraints

• Do not use heavy borders
• No dense table grid lines
• Keep background translucent over hero image
• Avoid overwhelming with numbers
• No inline styles (centralized theme tokens only)
• Minimal visual variants

Keep elegant and restrained.

⸻

17. Visual Identity Alignment

Color palette must harmonize with:

Water blues
Sand neutrals
Evening gold tones

Accent for “Perfect” should reflect water vitality.

Typography:
Same type scale as hero.
No separate font family.

⸻

18. Psychological Intent

This UI should create:

Anticipation
Confidence
Urgency

It should subtly imply:

“There are better times and you don’t want to miss them.”

Without sounding alarmist.

⸻

19. Performance Rules

Component must:

• Render immediately
• Load JSON asynchronously
• Skeleton state optional but subtle
• Avoid layout shift

No blocking network calls.

⸻

20. Success Criteria

UI is successful if:

• Users interact with at least one time circle
• It increases perceived sophistication
• It reduces “When is best time?” inquiries
• It supports booking intent
