import Section from '../components/ui/Section';
import { galleryImages } from '../data/content';

const GalleryPage = () => (
  <Section
    eyebrow="Gallery"
    title="Recent frames"
    subtitle="All assets captured on location using existing light."
  >
    <div className="gallery-grid">
      {galleryImages.map((src, idx) => (
        <figure key={src} className="card">
          <img src={src} alt={`Sans Souci gallery item ${idx + 1}`} />
        </figure>
      ))}
    </div>
  </Section>
);

export default GalleryPage;
