import Section from '../components/ui/Section';
import { planTimeline, travelCopy } from '../data/content';

const PlanVisitPage = () => (
  <Section
    eyebrow="Plan Your Visit"
    title="Design your Sans Souci timeline"
    subtitle="Mobile-first itinerary builder for crews who want to maximize golden hour."
  >
    <div className="grid grid-2">
      <div className="timeline">
        {planTimeline.map((slot) => (
          <div key={slot.time} className="timeline-item">
            <time>{slot.time}</time>
            <h3>{slot.title}</h3>
            <p>{slot.detail}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>Travel logistics</h3>
        <p>{travelCopy.promise}</p>
        <p>{travelCopy.directions}</p>
        <div className="cta-row cta-row--left">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Sans%20Souci%20Ennore"
            className="button button-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Open directions
          </a>
        </div>
      </div>
    </div>
  </Section>
);

export default PlanVisitPage;
