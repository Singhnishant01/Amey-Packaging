import "./Industries.css";

import {
  FaShoppingBag,
  FaTshirt,
  FaGift,
  FaUtensils,
  FaIndustry,
  FaStore,
} from "react-icons/fa";

function Industries() {

  const industries = [
    {
      id: 1,
      icon: <FaShoppingBag />,
      title: "Retail Stores",
      description:
        "Premium shopping bags and packaging for retail businesses.",
    },
    {
      id: 2,
      icon: <FaTshirt />,
      title: "Garment Industry",
      description:
        "High-quality garment covers and clothing packaging solutions.",
    },
    {
      id: 3,
      icon: <FaGift />,
      title: "Gift Packaging",
      description:
        "Elegant customized bags and premium gift packaging.",
    },
    {
      id: 4,
      icon: <FaUtensils />,
      title: "Food & Hospitality",
      description:
        "Eco-friendly packaging for restaurants and food businesses.",
    },
    {
      id: 5,
      icon: <FaIndustry />,
      title: "Manufacturing",
      description:
        "Industrial packaging solutions for large-scale businesses.",
    },
    {
      id: 6,
      icon: <FaStore />,
      title: "Wholesale",
      description:
        "Bulk packaging products for distributors and wholesalers.",
    },
  ];

  return (
    <section className="industries" id="industries">

      <div className="container">

        <div className="section-title"
          data-aos="fade-up">

          <span>Industries We Serve</span>

          <h2>Serving Multiple Business Sectors</h2>

          <p>
            Our premium packaging solutions are trusted across a wide
            range of industries for quality, durability and customization.
          </p>

        </div>

        <div className="industries-grid"
          data-aos="fade-up"
          data-aos-delay="200">

          {industries.map((industry) => (

            <div
              className="industry-card"
              key={industry.id}
            >

              <div className="industry-icon">
                {industry.icon}
              </div>

              <h3>{industry.title}</h3>

              <p>{industry.description}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Industries;