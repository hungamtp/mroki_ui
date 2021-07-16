import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="modal">
      Hung 25 tuoi
      <Link to={"/"}>
        <button type="submit">Add</button>
      </Link>
    </div>
  );
};

export default About;
