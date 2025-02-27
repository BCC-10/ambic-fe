import React from "react";
import Banner1 from "../../src/assets/Background/anastasia-zhenina-YT_DCMps5Wg-unsplash.jpg";
import Banner2 from "../../src/assets/Background/jonathan-pielmayer-c69HK1HKHYs-unsplash.jpg";
import Banner3 from "../../src/assets/Background/v2osk-c9OfrVeD_tQ-unsplash.jpg";
import LogicHero from "../Componets/Elements/Hero/LogicHero";

const Hero = () => {
  const slides = [{ Image: Banner1 }, { Image: Banner2 }, { Image: Banner3 }];

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
