import { useState } from 'react'
import '../styles/pages/Contact.css'
import { Leaf, Sprout } from 'lucide-react'

const infoItems = [
  {
    title: 'Visit Our Center',
    lines: ['14 Herb Lane, Rishikesh', 'Uttarakhand 249201, India'],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
  },
  {
    title: 'Email Us',
    lines: ['care@amritaayurveda.com'],
    gold: 'Replies within 24 hours',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
    ),
  },
  {
    title: 'Call Us',
    lines: ['+91 98765 43210', 'Mon–Sat, 9 am – 6 pm IST'],
    icon: (
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.47 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.8-1.8a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z" /></svg>
    ),
  },
  {
    title: 'Wholesale Inquiries',
    lines: ['partners@amritaayurveda.com'],
    gold: 'Special rates for bulk orders',
    icon: (
      <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="17" /><line x1="9" y1="14.5" x2="15" y2="14.5" /></svg>
    ),
  },
]

const whyAmrita = [
  { badge: 'Featured', title: '100% Natural', desc: 'Pure herbs sourced directly from organic Himalayan farms', icon: <svg viewBox="0 0 24 24"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg> },
  { badge: 'Certified', title: 'Lab Tested', desc: 'Every product undergoes rigorous third-party quality testing', icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></svg> },
  { badge: 'Expert', title: 'Expert Guidance', desc: 'Consult certified Ayurvedic practitioners for personalised wellness', icon: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
  { badge: 'Fast', title: 'Fast Delivery', desc: 'Free shipping on orders above ₹999 with eco-friendly packaging', icon: <svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
]

export default function ContactPage() {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ fname: '', lname: '', email: '', phone: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <>
      <section className="contact-hero">
        {/* floating decorative herbs */}
        <div className="hero-leaf leaf-1"><Leaf size={34} /></div>
        <div className="hero-leaf leaf-2"><Sprout size={28} /></div>
        <div className="hero-leaf leaf-3"><Leaf size={40} /></div>
        <div className="hero-leaf leaf-4"><Sprout size={26} /></div>
        <div className="hero-leaf leaf-5"><Leaf size={22} /></div>

        <div className="container contact-hero-inner">
          <span className="eyebrow">Get In Touch</span>
          <h1>Let's Connect</h1>
          <p>Questions about a product or your dosha? Our Ayurvedic wellness team is here to guide you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div>
            <span className="eyebrow">Reach Us</span>
            <h2 style={{ color: 'var(--green)', fontWeight: 800, fontSize: '1.7rem', margin: '.5rem 0 1.5rem' }}>
              We're here<br />to help you
            </h2>

            {infoItems.map(item => (
              <div className="info-card" key={item.title}>
                <div className="ic-wrap">{item.icon}</div>
                <div>
                  <h3>{item.title}</h3>
                  {item.lines.map(line => <p key={line}>{line}</p>)}
                  {item.gold && <p className="note-gold">{item.gold}</p>}
                </div>
              </div>
            ))}

            <div className="contact-socials">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
              <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22.5 6.4a2.8 2.8 0 00-2-2C18.9 4 12 4 12 4s-6.9 0-8.6.5a2.8 2.8 0 00-2 2A29 29 0 001 12a29 29 0 00.5 5.6 2.8 2.8 0 002 1.9C5.1 20 12 20 12 20s6.9 0 8.6-.5a2.8 2.8 0 002-1.9A29 29 0 0023 12a29 29 0 00-.5-5.6z" /></svg></a>
            </div>
          </div>

          <div className="form-card">
            <h3>Send Us a Message</h3>
            <p className="sub">Fill out the form below and we'll get back to you shortly</p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fname">First Name *</label>
                  <input id="fname" name="fname" required value={form.fname} onChange={handleChange} placeholder="Enter your first name" />
                </div>
                <div className="field">
                  <label htmlFor="lname">Last Name *</label>
                  <input id="lname" name="lname" required value={form.lname} onChange={handleChange} placeholder="Enter your last name" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email Address *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your.email@example.com" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              </div>
              <div className="field">
                <label htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help you?" />
              </div>
              <div className="field">
                <label htmlFor="message">Your Message *</label>
                <textarea id="message" name="message" required value={form.message} onChange={handleChange} placeholder="Tell us about your query or how we can assist you..." />
              </div>
              <button type="submit" className="btn btn-green" style={{ width: '100%' }}>Send Message</button>

              {submitted && (
                <div className="form-success">✓ Thank you! We'll get back to you within 24 hours.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="sec-head">
            <span className="eyebrow">Why Choose Us</span>
            <h2>The Amrita Ayurveda Difference</h2>
            <p>Experience authentic Ayurvedic care backed by centuries of wisdom and modern quality standards</p>
          </div>
          <div className="why-amrita-grid">
            {whyAmrita.map(w => (
              <div className="why-amrita-card" key={w.title}>
                <span className="why-amrita-badge">{w.badge}</span>
                <div className="icon-wrap">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}