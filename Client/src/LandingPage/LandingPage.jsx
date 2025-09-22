import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import { useNavigate } from "react-router-dom";  // ⬅️ import

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [emailCount, setEmailCount] = useState(0);
  const [faqOpen, setFaqOpen] = useState({});
const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll
      const sections = ['home', 'features', 'how-it-works', 'testimonials', 'pricing', 'faq'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate email counter
    const interval = setInterval(() => {
      setEmailCount(prev => {
        if (prev >= 10000) return 0;
        return prev + 123;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonials = [
    {
      name: "Saket Yadav",
      role: "Software Developer",
      avatar: "SC",
      text: "Transformed my job search! I sent 500 personalized emails in minutes.",
      rating: 5
    },
    {
      name: "Vedansh Bhatnagar",
      role: "Marketing Manager",
      avatar: "MR",
      text: "The AI understands context perfectly. My response rate increased by 300%!",
      rating: 5
    },
    {
      name: "Utsav Kushwaha",
      role: "Data Scientist",
      avatar: "EJ",
      text: "No more copying and pasting. This tool is a game-changer for networking.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "Can I customize the AI emails?",
      answer: "Absolutely! Our AI generates personalized templates that you can edit and refine to match your voice perfectly."
    },
    {
      question: "Is my resume data safe?",
      answer: "Your privacy is our priority. We use bank-level encryption and never store your personal data after processing."
    },
    {
      question: "How many emails can I send?",
      answer: "Free plan: 50 emails/month. Pro plan: 1000 emails/month. Enterprise: Unlimited with custom features."
    },
    {
      question: "Does it work with all email providers?",
      answer: "Yes! We integrate with Gmail, Outlook, Yahoo, and support SMTP for custom domains."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      features: ["50 AI emails/month", "Basic templates", "Resume parsing", "Email tracking"],
      highlight: false
    },
    {
      name: "Professional",
      price: "$29",
      features: ["1000 AI emails/month", "Premium templates", "Bulk sending", "Advanced analytics", "Priority support"],
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Unlimited emails", "Custom AI training", "API access", "Dedicated account manager", "White-label options"],
      highlight: false
    }
  ];

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">✉️</span>
            <span className="logo-text">AI<span className="gradient-text">Mail</span>Pro</span>
          </div>
          <ul className="nav-links">
            {['Home', 'Features', 'How It Works', 'Testimonials', 'Pricing', 'FAQ'].map(item => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className={activeSection === item.toLowerCase().replace(' ', '-') ? 'active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.toLowerCase().replace(' ', '-'));
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <button className="nav-cta" onClick={() => navigate("/login")}  // ⬅️ redirect
    >Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="particle-background">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-headline">
            Turn Your Resume into
            <span className="gradient-text"> Powerful AI Emails</span>
          </h1>
          <p className="hero-subheadline">
            Send Smarter. Reach Faster. Land Your Dream Job.
          </p>
          <button
      className="cta-button primary"
      onClick={() => navigate("/login")}  // ⬅️ redirect
    >
      <span>Get Started Free</span>
      <span className="button-glow"></span>
    </button>
          <div className="hero-visual">
            <div className="transform-animation">
              <div className="resume-card" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                <div className="resume-icon">📄</div>
                <span>Resume</span>
              </div>
              <div className="arrow-flow">
                <span className="flow-arrow">→</span>
                <span className="ai-badge">AI</span>
                <span className="flow-arrow">→</span>
              </div>
              <div className="email-cards">
                <div className="email-card" style={{ transform: `translateY(${-scrollY * 0.05}px)` }}>✉️</div>
                <div className="email-card delayed" style={{ transform: `translateY(${-scrollY * 0.08}px)` }}>✉️</div>
                <div className="email-card more-delayed" style={{ transform: `translateY(${-scrollY * 0.03}px)` }}>✉️</div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose AI<span className="gradient-text">Mail</span>Pro?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Generate 100+ personalized emails in under 60 seconds</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Targeting</h3>
              <p>AI matches your skills with job requirements perfectly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Performance</h3>
              <p>Real-time analytics on opens, clicks, and responses</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>Bank-level encryption for your data protection</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Upload Resume</h3>
              <p>Drop your PDF or paste your LinkedIn</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analyzes</h3>
              <p>Our AI extracts skills & experience</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Generate Emails</h3>
              <p>Create personalized outreach instantly</p>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Send & Track</h3>
              <p>Bulk send and monitor responses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Email Visualization */}
      <section className="bulk-visualization">
        <div className="section-container">
          <h2 className="section-title">Send to Thousands, With One Click</h2>
          <div className="email-animation-container">
            <div className="email-counter">
              <span className="counter-number">{emailCount.toLocaleString()}</span>
              <span className="counter-label">Emails Sent Today</span>
            </div>
            <div className="flying-emails">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`flying-email delay-${i}`}>
                  <span>✉️</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <div className="stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-container">
          <h2 className="section-title">Choose Your Plan</h2>
          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.highlight ? 'highlighted' : ''}`}>
                {plan.highlight && <div className="popular-badge">Most Popular</div>}
                <h3>{plan.name}</h3>
                <div className="price">
                  {plan.price === "Custom" ? plan.price : (
                    <>
                      <span className="currency">$</span>
                      <span className="amount">{plan.price.replace('$', '')}</span>
                      {plan.price !== "Free" && <span className="period">/mo</span>}
                    </>
                  )}
                </div>
                <ul className="features-list">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="checkmark">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/login")} className={`cta-button ${plan.highlight ? 'primary' : 'secondary'}`}>
                  {plan.price === "Free" ? "Start Free" : plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className={`faq-icon ${faqOpen[index] ? 'open' : ''}`}>+</span>
                </button>
                <div className={`faq-answer ${faqOpen[index] ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="section-container">
          <h2>Ready to Supercharge Your Job Hunt?</h2>
          <p>Join thousands of professionals landing their dream jobs faster</p>
          <button className="cta-button primary large" >
            <span>Start Now — Free</span>
            <span className="button-glow"></span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <span className="logo-icon">✉️</span>
              <span className="logo-text">AI<span className="gradient-text">Mail</span>Pro</span>
            </div>
            <p>Transform your job search with AI-powered email outreach</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#careers">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 AIMailPro. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="LinkedIn">in</a>
            <a href="#" aria-label="GitHub">⚡</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;