Sans Souci – Best Times to Visit Engine

Part 2: Scoring Algorithm Specification

(Stormglass-Based Weighted Model)

⸻

1. Philosophy of the Model

The model must:

• Be deterministic (same input = same output)
• Be explainable (you can justify why a window is perfect)
• Score per activity (not generic)
• Be tunable without redesigning the system
• Output a clean 0–100 score

We compute:

• Individual activity scores (Kayaking, Dune, Photography, Leisure)
• Overall window score
• Rating classification

⸻

2. Time Window Processing

For each 2-hour window:
	1.	Aggregate hourly data inside the window
	2.	Compute averages for:
	•	Wind speed
	•	Temperature
	•	Cloud cover
	•	Precipitation
	3.	Identify:
	•	Highest tide height within window
	•	Tide direction (rising/falling/high/low)
	•	Whether sunrise or sunset occurs inside window
	•	Moon phase category

All scoring is based on these aggregated values.

⸻

3. Base Score Framework

Each activity score is calculated out of 100.

Each activity has:

• Core safety factors (critical multipliers)
• Comfort factors
• Enhancement factors

Formula conceptually:

Final Activity Score =
(Base Score × Critical Multipliers)
	•	Enhancement Bonuses

All capped between 0–100.

⸻

4. Kayaking Scoring Model

4.1 Ideal Conditions

Wind: less than 15 km/h
Tide height: +1.5m to +2.5m
Tide state: High or rising
Rain: none
Daylight: required

⸻

4.2 Wind Score (40% weight)

0–10 km/h = 40 points
10–15 km/h = 30 points
15–20 km/h = 15 points
Above 20 km/h = 0 points

⸻

4.3 Tide Score (35% weight)

Height above +1.5m = 35 points
Height between +1.0m–1.5m = 20 points
Below +1.0m = 5 points

If tide is falling: reduce tide score by 20%
If tide is low: reduce tide score by 40%

⸻

4.4 Precipitation Rule (Critical Multiplier)

If measurable rain:
Score × 0.6

If thunderstorm risk:
Score × 0.3

⸻

4.5 Temperature Comfort (10% weight)

24–30°C = 10 points
20–24°C or 30–32°C = 7 points
Below 20°C or above 32°C = 3 points

⸻

4.6 Golden Light Bonus (Optional +5)

If sunset occurs inside window:
+5

⸻

5. Dune Driving Scoring Model

Ideal Conditions:

Low or mid tide
Dry conditions
Wind under 20 km/h

⸻

Wind (30%)
Under 12 km/h = 30
12–20 km/h = 20
20–25 km/h = 10
Above 25 km/h = 0

⸻

Tide (30%)
Low tide window = 30
Falling tide = 20
High tide = 10

⸻

Dry Surface (Critical)
If precipitation > 0:
Score × 0.7

⸻

Temperature (20%)
22–30°C ideal range

⸻

Visibility (Cloud cover influence 20%)
Partly cloudy preferred

⸻

6. Sunset / Photography Scoring Model

This is visually driven.

Key drivers:

Golden hour
Cloud texture
Wind softness
Humidity clarity

⸻

Golden Hour Presence (40%)
Sunset inside window = 40
Within 1 hour of sunset = 25
Outside sunset window = 5

⸻

Cloud Cover (30%)

20–50% = 30
0–20% = 20
50–70% = 15
Above 70% = 5

(Partial clouds produce better light diffusion)

⸻

Wind (20%)

Under 12 km/h = 20
12–20 km/h = 10
Above 20 km/h = 0

⸻

Rain (Critical Multiplier)

Rain = score × 0.5

⸻

7. Leisure / Relaxed Visit Model

This is the fallback category.

Primary focus:
Comfort and calmness.

Wind (40%)
Temperature (30%)
Precipitation (Critical)
Tide aesthetic bonus (10%)

High tide gives visual premium effect.

⸻

8. Moon Phase Influence (Minor Modifier)

Full Moon + Rising Tide Evening:
Add +5 bonus to overall window score

New Moon:
No change

Moon effects are aesthetic, not functional.

⸻

9. Overall Window Score

Compute:

Overall Window Score =
Maximum(activity scores)
	•	(Average of other activity scores ÷ 4)

This prevents a single great activity from overstating everything.

Cap at 100.

⸻

10. Rating Classification

90–100 = Perfect
75–89 = Excellent
60–74 = Good
40–59 = Fair
Below 40 = Avoid

For UI simplicity:

Perfect
Good
Not Ideal

You may collapse into 3 levels visually while retaining internal granularity.

⸻

11. Example Output Logic

Saturday 4–6 PM

Wind: 11 km/h
Tide: +2.1m rising
Temp: 28°C
Sunset: 6:02 PM

Kayaking score: 92
Photography score: 88
Dune score: 61
Leisure score: 85

Overall Window Score: 93
Rating: Perfect

Recommended activities:
Kayaking
Sunset Photography

⸻

12. Safeguards

If wind above 30 km/h:
All activity scores capped at 40

If thunderstorm probability high:
All activity scores capped at 30

Safety always overrides scoring elegance.

⸻

13. Tunability

All weights must be stored as constants so you can adjust:

Wind weight
Tide weight
Golden hour bonus
Temperature thresholds

Without changing UI.

⸻

14. Why This Model Works

It:

• Is explainable
• Is modular
• Is adjustable seasonally
• Encourages activity-based visits
• Reflects real marine conditions
• Feels intelligent

Most hospitality sites never go beyond “Weather 28°”.

This is decision-grade logic.