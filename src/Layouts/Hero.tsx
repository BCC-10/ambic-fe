import React from "react";
import {slides} from "../data/index";
import LogicHero from "../Componets/Elements/Hero/LogicHero";

const Hero: React.FC = () => {


  return (
    <div className="relative flex mt-1/4 ">
      <LogicHero autoSlide={true} autoSlideInterval={3000}>
        {slides.map((_, idx) => (
          <img
            key={idx}
            src={_.Image}
            alt=""
            className=" w-full  object-cover min-h-screen bg-center"
          />
        ))}
      </LogicHero>
    </div>
  );
};

export default Hero;
