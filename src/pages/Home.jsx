import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Products from "../components/Products/Products";
import WhyUs from "../components/WhyUs/WhyUs";
import Industries from "../components/Industries/Industries";
import Process from "../components/Process/Process";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import FloatingButtons from "../components/FloatingButtons/FloatingButtons";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyUs />
      <Industries />
      <Process />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}

export default Home;