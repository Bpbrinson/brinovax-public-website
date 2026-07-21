import React from "react";
import Tagline from "../components/Tagline";

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to BrinovaX</h1>
        <Tagline />
      </section>
    </div>
  );
};

export default Home;
