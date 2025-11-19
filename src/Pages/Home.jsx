import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// Removed unused imports: Ourclient, OurWork, Teams
import Services from "../components/Services";
import ContactUsPage from "../components/ContactUsPage.jsx";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <Ourclient/> */}
      {/* <OurWork/> */}
      <Services />
      {/* <Teams/> */}
      {/* <Title/> */}
      <ContactUsPage />
    </div>
  );
};

export default Home;
