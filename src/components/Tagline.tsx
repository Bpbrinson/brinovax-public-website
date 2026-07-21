import React from "react";
import { homepageTagline } from "../data/tagline";

const Tagline: React.FC = () => {
  return (
    <p className="homepage-tagline">
      {homepageTagline}
    </p>
  );
};

export default Tagline;
