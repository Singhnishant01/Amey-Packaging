import { useState } from "react";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

import { sendEnquiry } from "../../admin/services/enquiryService";
function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await sendEnquiry(form);

      alert("✅ Your enquiry has been sent successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      alert("❌ Unable to send enquiry.");
    }

    setLoading(false);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">

        <div
          className="section-title"
          data-aos="fade-up"
        >
          <span>Contact Us</span>

          <h2>Let's Build Something Together</h2>

          <p>
            Have a bulk requirement or want customized packaging?
            Contact our team and we'll get back to you quickly.
          </p>
        </div>

        <div
          className="contact-wrapper"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Left Side */}

          <div className="contact-info">

            <div className="info-card">
              <FaMapMarkerAlt />

              <div>
                <h3>Address</h3>
                <p>Chaibasa, Jharkhand, India</p>
              </div>
            </div>

            <div className="info-card">
              <FaPhoneAlt />

              <div>
                <h3>Phone</h3>
                <p>+91 7970527373</p>
              </div>
            </div>

            <div className="info-card">
              <FaEnvelope />

              <div>
                <h3>Email</h3>
                <p>info@ameypackaging.com</p>
              </div>
            </div>

            <div className="info-card">
              <FaClock />

              <div>
                <h3>Working Hours</h3>
                <p>Mon – Sat | 9:00 AM – 7:00 PM</p>
              </div>
            </div>

          </div>

          {/* Contact Form */}

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject (Optional)"
              value={form.subject}
              onChange={handleChange}
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Tell us your requirement..."
              value={form.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Inquiry"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;