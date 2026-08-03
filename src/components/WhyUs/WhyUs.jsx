import "./WhyUs.css";
import {
  FaAward,
  FaLeaf,
  FaShippingFast,
  FaHandshake,
} from "react-icons/fa";

function WhyUs() {
  const features = [
    {
      id: 1,
      icon: <FaAward />,
      title: "Premium Quality",
      description:
        "We manufacture high-quality packaging products using durable and premium materials.",
    },
    {
      id: 2,
      icon: <FaLeaf />,
      title: "Eco Friendly",
      description:
        "Our packaging solutions are reusable, sustainable and environmentally responsible.",
    },
    {
      id: 3,
      icon: <FaShippingFast />,
      title: "Fast Delivery",
      description:
        "Efficient production and logistics ensure timely delivery for bulk orders.",
    },
    {
      id: 4,
      icon: <FaHandshake />,
      title: "Trusted Partner",
      description:
        "Businesses trust Amey Packaging for consistent quality and long-term partnerships.",
    },
  ];

  return (
    <section className="why-us" id="why-us">
      <div className="container">

        <div className="section-title"
          data-aos="fade-up">
          <span>Why Choose Us</span>

          <h2>Why Businesses Choose Amey Packaging</h2>

          <p>
            We combine quality, innovation, reliability, and customer
            satisfaction to deliver packaging solutions that help businesses
            grow.
          </p>
        </div>

        <div className="why-grid"
          data-aos="zoom-in"
          data-aos-delay="200">
          {features.map((feature) => (
            <div className="why-card" key={feature.id}>

              <div className="why-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default WhyUs;