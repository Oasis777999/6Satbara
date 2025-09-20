import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import Available from "./Available";
import Features from "./Features";
import AvailableProperties from "./AvailableProperties";

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <Services /> */} {/* All services Comm, Agri, Resi*/}
      {/* <Available /> */} {/*Available flats Section*/}
      <AvailableProperties />
      <Features />
    </div>
  );
};

export default Home;
