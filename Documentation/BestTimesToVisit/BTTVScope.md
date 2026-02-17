1. Feature Vision

Create a dynamic “Best Times to Visit” indicator in the hero section that analyzes tide, marine weather, and astronomical data to intelligently recommend the best upcoming time windows to visit Sans Souci.

This is not a weather widget.
It is a decision engine that answers one core question:

“When should I come?”

The engine will:

• Analyze tide height and tide type
• Analyze wind speed and gust levels
• Analyze air temperature
• Analyze precipitation and cloud cover
• Analyze sunrise, sunset and moon phase
• Score structured 2-hour time windows
• Recommend ideal windows for specific activities

Target activities for V1:
• Kayaking
• Dune driving
• Sunset photography
• Relaxed creek experience

The system must feel premium, intelligent and conversion-focused.

⸻

2. Data Source – Stormglass API

Stormglass will be the single data provider for V1.

Relevant data parameters required:

Tide Data
• Tide height
• Tide type (high / low / rising / falling)

Wind
• Wind speed
• Wind gust
• Wind direction

Atmospheric
• Air temperature
• Precipitation
• Cloud cover

Astronomical
• Sunrise
• Sunset
• Moon phase

We will use hourly marine forecast data for the next 14 days.

No historical data is required.

No additional weather API is required.

⸻

3. Geographic Configuration

Location configured to:

Sans Souci – Ennore Creek, Tamil Nadu

Stormglass requests will be made using the exact latitude and longitude of the property.

Forecast window:
Next 5 days
Hourly resolution

⸻

4. Core System Architecture (V1)

Data Flow:

Stormglass API
→ Scheduled Node script or serverless function
→ Internal scoring engine
→ Precomputed best-times.json
→ Frontend hero component

Important principle:
The hero must never wait on API calls.

All scoring is done before the visitor loads the page.

⸻

5. Time Window Strategy

We will not display raw hourly data.

Instead, we group hours into structured 2-hour visit windows.

Example windows:
• 6–8 AM
• 8–10 AM
• 4–6 PM
• 6–8 PM

Why 2-hour windows?

• More human-readable
• Cleaner visual layout
• Better booking psychology
• Allows aggregation of conditions
• Reduces noise

Each window will contain:

• Day
• Start time
• End time
• Overall score
• Individual activity scores
• Final rating label (Perfect / Good / Avoid)
• Summary explanation
• Supporting metrics (wind average, tide height, temperature, etc.)

This keeps UI clean and meaningful.

⸻

6. Refresh Strategy

Data refresh frequency: every 6 hours.

Reason:

• Tide shifts meaningfully
• Wind forecast updates
• Maintains accuracy
• Controls Stormglass API usage

If refresh fails:

• Retain previous JSON
• Do not break hero

⸻

7. Performance Requirements

• JSON payload under 50 KB
• Hero section renders instantly
• Data loads asynchronously
• No blocking network calls
• Graceful fallback state if unavailable

This feature must feel lightweight and premium.

⸻

8. Business Objectives

Primary goals:

• Increase booking conversion
• Reduce visitor uncertainty
• Create a perception of intelligence and sophistication

Secondary goals:

• Differentiate from generic ECR properties
• Reinforce waterfront positioning
• Encourage time-specific visits

This becomes a strategic conversion lever.

⸻

9. UX Goals

The feature must communicate clarity within 5 seconds.

Visitor should immediately understand:

Green = Come
Yellow = Fine
Gray = Not ideal

No long paragraphs required.

The system should suggest confidence, not overwhelm with data.

⸻

10. Constraints for V1

We are NOT implementing:

• Real-time per-visitor recalculation
• Booking integration per time slot
• Supabase persistence
• Analytics tracking
• AI prediction models
• User personalization

Infrastructure must remain simple.

⸻

11. Future Expandability

The system design must allow future expansion to include:

• Booking per time slot
• Time-based dynamic pricing
• WhatsApp alerts
• Click analytics
• Activity filters
• Premium recommended windows
• Push notifications

Therefore, scoring logic must remain modular.

⸻

12. Success Criteria

This feature is successful if:

• Booking inquiries reference timing guidance
• Visitors spend longer in hero
• Conversion rate increases
• Sans Souci is perceived as a “smart waterfront destination”

