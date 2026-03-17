import { useState, useEffect, useRef } from 'react';

const ASSESSMENT_URL = 'https://assessment.6figurebusinesscredit.com/6975c46b5a3769e38fcdc91e';
const DERICK_PHOTO = '/derick-oppong.jpg';

// ─── ICONS ────────────────────────────────────────────────

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const DiamondIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

// ─── UTILITY COMPONENTS ───────────────────────────────────

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const startTime = Date.now();
        const animate = () => {
          const progress = Math.min((Date.now() - startTime) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────

const STEPS = [
  { num: '01', title: 'Business Foundation', desc: 'Establish your business entity, EIN, and credibility so lenders see you as a real, fundable business from day one.' },
  { num: '02', title: 'Credit Profile Setup', desc: 'Build your business credit profile with Dun & Bradstreet, Experian Business, and Equifax Business reporting agencies.' },
  { num: '03', title: 'Vendor Credit Lines', desc: 'Open starter vendor accounts that report to business credit agencies, building your payment history and credit score fast.' },
  { num: '04', title: 'Scale to 6 Figures', desc: 'Leverage your established credit profile to access major business credit cards, lines of credit, and funding — no personal guarantee.' },
];

const TESTIMONIALS = [
  { name: 'Kevin B.', company: 'Browncleaning LLC', text: "Derick's system changed the game for my business. I went from zero business credit to getting approved for a $50K line of credit in months." },
  { name: 'Tamara J.', company: 'TJ Consulting Group', text: "I had no idea business credit existed separate from personal credit. Now my business stands on its own and I'm fully funded." },
  { name: 'Marcus W.', company: 'MW Real Estate Holdings', text: 'The 4-step process is simple and it works. I followed it exactly and now my business has over $120K in available credit.' },
];

const PROBLEMS = [
  { title: 'Personal Assets at Risk', desc: 'Using personal credit for business means your home, car, and savings are on the line if things go south.' },
  { title: 'Limited Funding Access', desc: "Without established business credit, you're leaving hundreds of thousands in available funding on the table." },
  { title: 'Higher Interest Rates', desc: 'Personal credit cards and loans charge you more. Business credit accounts offer better terms and higher limits.' },
  { title: 'Stunted Growth', desc: "You can't scale what you can't fund. Every business that wants to grow needs capital — and business credit is the key." },
  { title: 'Credit Score Damage', desc: 'Every business expense on your personal card hurts your utilization ratio and tanks your personal credit score.' },
  { title: 'No Separation = No Protection', desc: 'If your business and personal finances are tangled, you have zero liability protection.' },
];

const CHECKLIST_ITEMS = [
  'Your current business credit readiness score',
  'Exactly where your business stands with lenders',
  'The fastest path to 6-figure business credit',
  'Which credit accounts to open first',
  'How to separate personal & business liability',
  'Your personalized business credit roadmap',
];

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'assessment', label: 'Assessment' },
  { id: 'contact', label: 'Contact' },
];

// ─── PAGES ────────────────────────────────────────────────

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero-section" role="banner" aria-label="Hero section">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn><div className="badge"><DiamondIcon /> The Fastest System in Business Credit</div></FadeIn>
          <FadeIn delay={0.1}><h1 className="hero-title">Stop Funding Your<br />Business With<br /><span className="gold">Personal Credit</span></h1></FadeIn>
          <FadeIn delay={0.2}><p className="hero-sub">Discover how to build 6 figures in business credit — without using your SSN, personal guarantee, or risking your personal assets. Our proven 4-step system has helped thousands of entrepreneurs get funded fast.</p></FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer"><span>Take Your Free Assessment</span><ArrowRight /></a>
            </div>
          </FadeIn>
          <FadeIn delay={0.4}><p style={{ marginTop: '20px', fontSize: '14px', color: '#78716C' }}>Takes 2 minutes · 100% Free · No credit check required</p></FadeIn>
        </div>
      </section>

      <div className="stats-bar" role="region" aria-label="Key statistics">
        <div className="stat"><div className="stat-num">$<AnimatedCounter end={4} suffix="M+" /></div><div className="stat-label">Funded for Clients</div></div>
        <div className="stat"><div className="stat-num"><AnimatedCounter end={4} /> Steps</div><div className="stat-label">Proven System</div></div>
        <div className="stat"><div className="stat-num"><AnimatedCounter end={1000} suffix="+" /></div><div className="stat-label">Businesses Helped</div></div>
        <div className="stat"><div className="stat-num">$<AnimatedCounter end={0} /></div><div className="stat-label">Personal Guarantee</div></div>
      </div>

      <section className="section" role="region" aria-label="Why you need business credit">
        <FadeIn>
          <p className="section-label">The Problem</p>
          <h2 className="section-title">Your Business Deserves<br />Its Own Credit Profile</h2>
          <p className="section-desc">Most business owners don't know that business credit exists separately from personal credit — and that's costing them everything.</p>
        </FadeIn>
        <div className="problem-grid">
          {PROBLEMS.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <article className="problem-card"><div className="icon"><DiamondIcon /></div><h3>{item.title}</h3><p>{item.desc}</p></article>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="section" role="region" aria-label="4-step business credit system">
        <FadeIn>
          <p className="section-label">The System</p>
          <h2 className="section-title">Our Proven 4-Step<br /><span style={{ color: '#BF9B30' }}>Business Credit Formula</span></h2>
          <p className="section-desc" style={{ marginBottom: '48px' }}>The fastest process on the market. We've refined every step to get you funded in the shortest time possible.</p>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <article className="step-card">
                <div className="step-num">{step.num}</div>
                <div><h3 className="step-title">{step.title}</h3><p className="step-desc">{step.desc}</p></div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="section" role="region" aria-label="About Derick Oppong">
        <div className="about-split">
          <FadeIn>
            <div>
              <div className="photo-circle" style={{ width: '200px', height: '200px', marginBottom: '24px' }}>
                <img src={DERICK_PHOTO} alt="Derick Oppong - Business Credit Coach and Real Estate Investor" width="200" height="200" />
              </div>
              <p className="section-label">Meet Your Coach</p>
              <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>Derick Oppong</h2>
              <p style={{ color: '#A8A29E', lineHeight: 1.7, fontSize: '16px', marginTop: '16px', fontWeight: 300 }}>
                Real estate investor, author, and the creator of the 6 Figure Business Credit system. From Ghana to the Bronx to becoming THE authority on business credit — Derick has helped secure over $4 million in funding for entrepreneurs nationwide.
              </p>
              <button onClick={() => navigate('about')} className="cta-btn-outline" style={{ marginTop: '24px' }}>
                <span>Read My Full Story</span><ArrowRight />
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>What You'll Discover</h3>
              <p style={{ color: '#78716C', fontSize: '15px', marginBottom: '8px' }}>Take the free assessment and find out:</p>
              <ul className="checklist">
                {CHECKLIST_ITEMS.map((item, i) => (
                  <li key={i}><span className="check-icon"><CheckIcon /></span>{item}</li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="divider" />

      <section className="section" role="region" aria-label="Client testimonials">
        <FadeIn><div style={{ textAlign: 'center' }}><p className="section-label">Success Stories</p><h2 className="section-title">Real Entrepreneurs.<br />Real Results.</h2></div></FadeIn>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <article className="testimonial">
                <div className="stars">{Array.from({ length: 5 }).map((_, j) => <StarIcon key={j} />)}</div>
                <p className="text">{t.text}</p>
                <p className="author">{t.name}</p>
                <p className="company">{t.company}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="cta-section" role="region" aria-label="Call to action">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <div className="gold-line" />
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '16px' }}>It's Time to Stop Trying to<br />Find Money to Start, Grow &<br /><span style={{ color: '#BF9B30' }}>Scale Your Business</span></h2>
          </FadeIn>
          <FadeIn delay={0.1}><p style={{ color: '#A8A29E', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px', fontWeight: 300, textAlign: 'center' }}>Take the free 2-minute assessment and get your personalized business credit roadmap. No credit check. No obligation. Just clarity.</p></FadeIn>
          <FadeIn delay={0.2}><a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: '18px', padding: '22px 48px' }}><span>Take Your Free Assessment Now</span><ArrowRight /></a></FadeIn>
          <FadeIn delay={0.3}><p style={{ marginTop: '20px', fontSize: '14px', color: '#78716C' }}>Join 1,000+ entrepreneurs who've already started building business credit</p></FadeIn>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <main className="section" style={{ paddingTop: '140px' }}>
      <FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <div className="photo-circle" style={{ width: '240px', height: '240px', marginBottom: '28px', boxShadow: '0 20px 60px rgba(191,155,48,0.15)' }}>
            <img src={DERICK_PHOTO} alt="Derick Oppong - Founder of 6 Figure Business Credit" width="240" height="240" loading="lazy" />
          </div>
          <p className="section-label">About</p>
          <h1 className="section-title">Derick Oppong</h1>
          <p style={{ color: '#BF9B30', fontSize: '17px', fontWeight: 500, marginTop: '4px' }}>Real Estate Investor · Business Credit Coach · Author</p>
        </div>
      </FadeIn>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <FadeIn delay={0.1}>
          <div className="about-block">
            <h2 className="about-heading">From Ghana to the Bronx</h2>
            <p>Derick Oppong migrated from Ghana to the USA at the young age of 10. Life as an immigrant child in the early 90s Bronx was exciting and unconventional. While growing up, Derick fell victim to gang culture due to the pressures of fitting in, facing challenges all too familiar with inner city youth.</p>
            <p>With family support, forced self-reflection, and determination, Derick found a way out after many trials and tribulations.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="about-block">
            <h2 className="about-heading">Discovering the Power of Credit</h2>
            <p>While trying to buy his first property, Derick learned the power of credit the hard way — having bad credit, he was rejected for any credit and a mortgage. His struggles were doubled not only because of his background, but because he belonged to a community that historically had a hard time accessing financial resources.</p>
            <p>Black-owned businesses receive only 1% of funding, making them more likely to fail. It seemed like the odds were stacked against him. That's when Derick realized that in order to succeed in this system, he would have to understand it, use it, and master it.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="about-block">
            <h2 className="about-heading">Becoming THE Authority</h2>
            <p>Today, Derick doesn't just understand how funding processes work — he is an expert. As the founder of the 6 Figure Business Credit training system, he has helped secure over $4 million in business credit for his coaching and consulting clients. All small businesses, without big budgets.</p>
            <p>What makes Derick's approach so effective is an intimate familiarity with being on the other side. He knows the steps needed to climb the ladder to success — one that many can't even see.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="about-block">
            <h2 className="about-heading">The Mission</h2>
            <p>Derick is of the view that poor communities are hindered by a lack of funding. Businesses without funding don't last. He is here to change that statistic.</p>
            <p>A burning desire to have a lasting, life-changing impact led Derick back to his native Ghana, where his vision is to lay the groundwork for a business hub impacting the West African Diaspora at large.</p>
            <p>His resolve is to share the value of wealth building, home and business ownership, and financial literacy to those who historically have not had access to this critical information.</p>
          </div>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <div className="gold-line" />
            <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>Ready to Build Your<br /><span style={{ color: '#BF9B30' }}>Business Credit?</span></h2>
            <p style={{ color: '#A8A29E', marginTop: '12px', marginBottom: '32px', fontWeight: 300 }}>Take the first step with a free assessment.</p>
            <a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer"><span>Take Your Free Assessment</span><ArrowRight /></a>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

function AssessmentPage() {
  return (
    <main className="section" style={{ paddingTop: '140px', textAlign: 'center' }}>
      <FadeIn>
        <div className="gold-line" />
        <p className="section-label">Free Business Credit Assessment</p>
        <h1 className="section-title">Find Out How Ready Your<br />Business Is for <span className="gold-text">6-Figure Credit</span></h1>
        <p style={{ color: '#A8A29E', lineHeight: 1.7, maxWidth: '600px', margin: '20px auto 0', fontWeight: 300, fontSize: '18px' }}>
          This 2-minute assessment will reveal your business credit readiness score, identify gaps in your business foundation, and provide you with a personalized roadmap to get funded fast.
        </p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '800px', margin: '48px auto' }}>
          {[
            { icon: '01', title: 'Answer Questions', desc: 'Quick questions about your business structure and goals' },
            { icon: '02', title: 'Get Your Score', desc: 'See exactly where you stand on the credit-readiness scale' },
            { icon: '03', title: 'Receive Roadmap', desc: 'Get a personalized plan to build business credit fast' },
          ].map((s, i) => (
            <div key={i} className="problem-card" style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 800, color: 'rgba(191,155,48,0.3)', marginBottom: '12px' }}>{s.icon}</div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: '#A8A29E', fontSize: '14px', lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <ul className="checklist" style={{ maxWidth: '480px', margin: '0 auto 48px' }}>
          {['100% Free — no payment required', 'No credit check or SSN needed', 'Takes less than 2 minutes', 'Instant personalized results', 'Actionable next steps included'].map((item, i) => (
            <li key={i}><span className="check-icon"><CheckIcon /></span>{item}</li>
          ))}
        </ul>
      </FadeIn>
      <FadeIn delay={0.25}>
        <a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: '18px', padding: '22px 48px' }}>
          <span>Start Your Free Assessment</span><ArrowRight />
        </a>
        <p style={{ marginTop: '16px', fontSize: '14px', color: '#78716C' }}>Join 1,000+ entrepreneurs who took the first step</p>
      </FadeIn>
    </main>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  return (
    <main className="section" style={{ paddingTop: '140px' }}>
      <FadeIn>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="gold-line" />
          <p className="section-label">Get in Touch</p>
          <h1 className="section-title">Let's Talk About Your<br /><span className="gold-text">Business Credit Goals</span></h1>
          <p style={{ color: '#A8A29E', lineHeight: 1.7, maxWidth: '560px', margin: '16px auto 0', fontWeight: 300, fontSize: '17px' }}>
            Have questions about building business credit? Want to learn about our coaching programs? Reach out and let's start a conversation.
          </p>
        </div>
      </FadeIn>
      <div className="contact-grid">
        <FadeIn delay={0.1}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Contact Information</h2>
            <div className="contact-item"><MailIcon /><div><p className="contact-label">Email</p><a href="mailto:info@6figurebusinesscredit.com" className="contact-value">info@6figurebusinesscredit.com</a></div></div>
            <div className="contact-item"><MapIcon /><div><p className="contact-label">Location</p><p className="contact-value">United States</p></div></div>
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '16px' }}>Follow Derick</h3>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="https://instagram.com/derekoppong" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link"><InstagramIcon /></a>
                <a href="https://linkedin.com/in/derick-oppong-business-coach" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link"><LinkedInIcon /></a>
              </div>
            </div>
            <div style={{ marginTop: '40px', padding: '28px', border: '1px solid rgba(191,155,48,0.15)', borderRadius: '8px', background: 'rgba(191,155,48,0.03)' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '8px', color: '#BF9B30' }}>Prefer a quick start?</h3>
              <p style={{ color: '#A8A29E', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', fontWeight: 300 }}>Take the free 2-minute assessment and get your personalized business credit roadmap immediately.</p>
              <a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', padding: '12px 24px' }}><span>Take Free Assessment</span><ArrowRight /></a>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 32px', border: '1px solid rgba(191,155,48,0.2)', borderRadius: '8px', background: 'rgba(191,155,48,0.03)' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(191,155,48,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#BF9B30' }}><CheckIcon /></div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Message Sent!</h3>
                <p style={{ color: '#A8A29E', fontWeight: 300 }}>Thank you for reaching out. Derick or his team will get back to you within 24-48 hours.</p>
              </div>
            ) : (
              <div className="contact-form-wrapper">
                <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Send a Message</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your full name' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'your@email.com' },
                    { label: 'Phone (optional)', key: 'phone', type: 'tel', placeholder: '(555) 000-0000' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="form-label">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e => updateField(f.key, e.target.value)} className="form-input" />
                    </div>
                  ))}
                  <div>
                    <label className="form-label">Message</label>
                    <textarea placeholder="Tell us about your business credit goals..." value={form.message} onChange={e => updateField('message', e.target.value)} className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} />
                  </div>
                  <button type="button" onClick={() => setSubmitted(true)} className="cta-btn" style={{ width: '100%', justifyContent: 'center' }}><span>Send Message</span><ArrowRight /></button>
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (p) => {
    setPage(p);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* NAVIGATION */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-logo" onClick={() => navigate('home')}>
          <span className="gold">6 Figure</span> Business Credit
        </div>
        <div className="nav-links">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`nav-link ${page === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
          <a href={ASSESSMENT_URL} className="nav-cta-btn" target="_blank" rel="noopener noreferrer">Free Assessment</a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu"><MenuIcon /></button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><CloseIcon /></button>
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`nav-link ${page === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}>{item.label}</button>
          ))}
          <a href={ASSESSMENT_URL} className="cta-btn" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}><span>Free Assessment</span><ArrowRight /></a>
        </div>
      )}

      {/* PAGE CONTENT */}
      {page === 'home' && <HomePage navigate={navigate} />}
      {page === 'about' && <AboutPage />}
      {page === 'assessment' && <AssessmentPage />}
      {page === 'contact' && <ContactPage />}

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(191,155,48,0.1)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <div>
            <div className="nav-logo" style={{ marginBottom: '8px' }} onClick={() => navigate('home')}><span className="gold">6 Figure</span> Business Credit</div>
            <p style={{ color: '#57534E', fontSize: '13px' }}>© {new Date().getFullYear()} Bdopromotion LLC. All rights reserved.</p>
          </div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {NAV_ITEMS.map(item => (
              <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); navigate(item.id); }}>{item.label}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="https://instagram.com/derekoppong" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://linkedin.com/in/derick-oppong-business-coach" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
          </div>
        </div>
      </footer>
    </>
  );
}
