import "./Process.css";

import {
  FaBoxOpen,
  FaPencilRuler,
  FaCogs,
  FaCheckCircle,
  FaGift,
  FaTruck,
} from "react-icons/fa";

function Process() {
  const steps = [
    {
      icon: <FaBoxOpen />,
      title: "Raw Material",
      description:
        "Premium non-woven fabrics and high-quality materials are carefully selected.",
    },
    {
      icon: <FaPencilRuler />,
      title: "Design",
      description:
        "Custom designs are prepared according to client branding and specifications.",
    },
    {
      icon: <FaCogs />,
      title: "Manufacturing",
      description:
        "Advanced production machines ensure precision and durability.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality Check",
      description:
        "Every product is inspected to maintain our premium quality standards.",
    },
    {
      icon: <FaGift />,
      title: "Packaging",
      description:
        "Finished products are packed securely for safe transportation.",
    },
    {
      icon: <FaTruck />,
      title: "Delivery",
      description:
        "Orders are dispatched quickly across India with reliable logistics.",
    },
  ];

  return (
    <section className="process" id="process">
      <div className="container">

        <div className="section-title"
          data-aos="fade-up">

          <span>Our Process</span>

          <h2>How We Manufacture Premium Packaging</h2>

          <p>
            Every order follows a streamlined production process to ensure
            quality, consistency and timely delivery.
          </p>

        </div>

        <div className="timeline"
          data-aos="fade-up"
          data-aos-delay="200">

          {steps.map((step, index) => (

            <div className="timeline-item" key={index}>

              <div className="timeline-icon">
                {step.icon}
              </div>

              <div className="timeline-content">

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Process;