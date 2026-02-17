import { useState } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import clsx from 'clsx';

import { contactInfo } from '../../data/content';

const primaryNavItems = [
  { label: 'Home', path: '/' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Photo Spots', path: '/photo-spots' },
  { label: 'Plan Your Visit', path: '/plan' },
  { label: 'Contact', path: '/contact' }
];

const secondaryNavItems = [
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'About', path: '/about' },
  { label: 'Location', path: '/location' }
];

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  contactInfo.address
)}`;

const sanitizePhone = (phone: string) => phone.replace(/\s|\-/g, '');

function StickyActionBar() {
  return (
    <div className="sticky-action-bar" aria-label="Quick actions">
      <a href={`tel:${sanitizePhone(contactInfo.phones[0])}`}>Call</a>
      <a href={directionsUrl} target="_blank" rel="noreferrer">
        Directions
      </a>
      <Link to="/location">Today’s Conditions</Link>
      <Link to="/contact">Book</Link>
    </div>
  );
}

const SiteShell = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page-shell">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="nav-container" role="navigation" aria-label="Main navigation">
          <Link to="/" className="logo-wordmark" onClick={closeMenu}>
            <img src="/media/hero.png" alt="Sans Souci" className="logo-image" />
          </Link>
          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={clsx('nav-links', menuOpen && 'nav-links--open')}>
            {primaryNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} className="nav-link">
                {item.label}
              </NavLink>
            ))}
            <div className={clsx('nav-more', moreOpen && 'nav-more--open')}>
              <button
                type="button"
                className="nav-link nav-more__button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((open) => !open)}
              >
                More
              </button>
              <div className="nav-more__menu">
                {secondaryNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="nav-link"
                    onClick={() => setMoreOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>
          <div className="nav-cta">
            <Link to="/plan" className="button button-secondary">
              Plan Visit
            </Link>
            <Link to="/contact" className="button button-primary">
              Book Sans Souci
            </Link>
          </div>
        </div>
      </header>

      <main id="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <p className="logo-wordmark">Sans Souci</p>
            <p className="footer-muted">Creekside micro-adventure campus in Ennore.</p>
            <div className="footer-contact">
              {contactInfo.phones.map((phone) => (
                <a key={phone} href={`tel:${sanitizePhone(phone)}`}>
                  {phone}
                </a>
              ))}
              <p>{contactInfo.address}</p>
            </div>
          </div>

          <div>
            <p className="section-heading">Navigation</p>
            <ul className="footer-nav">
              {primaryNavItems.concat(secondaryNavItems).map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Third column removed for now to keep footer focused on essentials */}
        </div>
      </footer>

      <StickyActionBar />
      <ScrollRestoration />
    </div>
  );
};

export default SiteShell;
