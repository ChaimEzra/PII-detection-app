function Contact() {
  return (
    <div className="nothing" style={{ textAlign: "center" }}>
      <h2>Let’s Talk</h2>
      <p>
        Whether you’re a potential customer, partner, or just curious about our
        technology, we’d love to hear from you.
      </p>
      <p>
        📧 Email:{" "}
        <a href="mailto:info@pii-detection.com">info@pii-detection.com</a>
        <br />
        📞 Phone: <a href="tel:+972501234567">+972-50-123-4567</a> <br />
        📍 Address:{" "}
        <a
          href="https://www.google.com/maps?q=Tel+Aviv+Israel"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tel Aviv, Israel
        </a>
      </p>
      <p>
        <b>Book a Live Demo</b> – See our platform in action and discover how it
        can protect your organization’s sensitive information.
      </p>
      <p>
        <b>Partnership Opportunities</b> – We collaborate with cybersecurity
        firms, SaaS providers, and compliance consultants worldwide.
      </p>
    </div>
  );
}
export default Contact;
