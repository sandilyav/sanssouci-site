import Section from '../components/ui/Section';
import { contactInfo, travelCopy } from '../data/content';

const LocationPage = () => (
  <Section
    eyebrow="Location"
    title="399, Kathivakkam High Road"
    subtitle="Private gate access with secure parking and shuttle docks."
  >
    <div className="grid grid-2">
      <div className="card">
        <h3>Address</h3>
        <p>{contactInfo.address}</p>
        <p>{travelCopy.directions}</p>
        <a
          className="button button-secondary"
          href="https://www.google.com/maps/dir/?api=1&destination=13.232558,80.320451"
          target="_blank"
          rel="noreferrer"
        >
          Launch maps
        </a>
      </div>
      <div className="card">
        <iframe
          title="Sans Souci Map"
          width="100%"
          height="320"
          style={{ border: 0, borderRadius: '16px' }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.695812525662!2d80.31823427517845!3d13.231958908529333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52627b00000001%3A0xff8c1bcf42cfdb1a!2sSans%20Souci!5e0!3m2!1sen!2sin!4v1739440000000"
        />
      </div>
    </div>
  </Section>
);

export default LocationPage;
