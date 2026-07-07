import '../styles/FeaturesStrip.css'

const features = [
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: '100% Natural', sub: 'Pure herbs, no chemicals' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>, title: 'Lab Certified', sub: 'Every batch tested' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: 'Free Shipping', sub: 'Orders above ₹999' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: 'Secure Payment', sub: '100% safe checkout' },
  { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-6v-4"/></svg>, title: 'Easy Returns', sub: '7-day hassle-free' },
]

export default function FeaturesStrip() {
  return (
    <div className="fstrip">
      <div className="container">
        <div className="fstrip-grid">
          {features.map((f, i) => (
            <div key={i} className="fstrip-item">
              <div className="fstrip-icon">{f.icon}</div>
              <div className="fstrip-text">
                <strong>{f.title}</strong>
                <span>{f.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}