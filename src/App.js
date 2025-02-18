import React, { useState, useEffect } from "react";
import backgroundImage from "./assets/background.svg";
import logo from "./assets/logo.svg";
import "./styles.css";

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      const element = document.querySelector(".content-wrapper");
      if (element) {
        element.style.transition = "none";
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "waitlist",
          email,
        }),
      });

      setIsSubmitted(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="decorative-elements" aria-hidden="true">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <main className="main-section">
        <div className="background-image-container" aria-hidden="true">
          <img src={backgroundImage} alt="" className="background-image" />
        </div>

        <div className="container">
          <div className={`content-wrapper ${isVisible ? "visible" : ""}`}>
            <h1 className="hero-title">
              <span className="gradient-text">AI-Powered Seller</span>
              <br />
              <span className="title-underline">
                Prediction Platform <span>for Real Estate</span>
              </span>
            </h1>

            <p className="hero-description">
              Stop wasting time on dead leads. Our proprietary AI platform
              predicts likely sellers before they list, unifying fragmented data
              sources to deliver high-quality opportunities directly to your
              team.
            </p>

            <div className="features-grid-preview">
              <div className="feature-preview-card">
                <div className="feature-icon">🎯</div>
                <h3>Seller Prediction</h3>
                <p>AI-powered scoring of 100M+ properties</p>
              </div>
              <div className="feature-preview-card">
                <div className="feature-icon">📈</div>
                <h3>Smart Lead Scoring</h3>
                <p>Proprietary readiness prediction model</p>
              </div>
              <div className="feature-preview-card">
                <div className="feature-icon">⚡</div>
                <h3>Enterprise Platform</h3>
                <p>Unified data access and team tools</p>
              </div>
            </div>

            <div className="signup-section">
              {!isSubmitted ? (
                <>
                  <h2 className="signup-title">Get Priority Access</h2>
                  <form
                    onSubmit={handleSubmit}
                    className="signup-form"
                    data-netlify="true"
                    name="waitlist"
                    method="POST"
                  >
                    <input type="hidden" name="form-name" value="waitlist" />

                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="email-input"
                      required
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Joining..." : "Join Waitlist"}
                    </button>
                  </form>
                  {error && <p className="error-message">{error}</p>}
                  <p className="signup-note">
                    Limited enterprise beta spots available
                  </p>
                </>
              ) : (
                <div className="success-message">
                  <h2>🎉 You're on the list!</h2>
                  <p>We'll notify you when we launch. Stay tuned!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="modern-footer">
        <div className="backing-section">
          <span className="backed-by">BACKED BY LEADING INVESTORS</span>
          <div className="backer-logos">
            <div className="backer">Coming Soon</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
