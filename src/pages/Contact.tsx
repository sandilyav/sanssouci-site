import { Helmet } from 'react-helmet-async';

import Section from '../components/ui/Section';
import { contactInfo } from '../data/content';

const ContactPage = () => (
  <>
    <Helmet>
      <title>Contact | Sans Souci - Book Your Creek Adventure</title>
      <meta name="description" content="Contact Sans Souci for bookings, enquiries, and collaborations. Phone, email, and quick response for your Ennore creek adventure near Chennai." />
      <link rel="canonical" href="https://sanssouci.in/contact" />
    </Helmet>
    <Section
    eyebrow="Contact"
    title="Talk to Sans Souci"
    subtitle="Same-day responses for enquiries, bookings, and creator collaborations."
  >
    <div className="grid grid-2">
      <form className="card">
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" required />
        </div>
        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" required />
        </div>
        <div>
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" required />
        </div>
        <div>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" rows={4} />
        </div>
        <button className="button button-primary">Send</button>
      </form>
      <div className="card">
        <h3>Call us</h3>
        {contactInfo.phones.map((phone) => (
          <p key={phone}>
            <a href={`tel:${phone.replace(/\s|\-/g, '')}`}>{phone}</a>
          </p>
        ))}
        <p>{contactInfo.address}</p>
      </div>
    </div>
  </Section>
  </>
);

export default ContactPage;
