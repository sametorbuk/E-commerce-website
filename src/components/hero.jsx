import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const items = [
  {
    src: "./images/e-commerce-hero1.jpg",
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
    class: "w-[150vw] md:w-screen md:h-[45rem]",
    imgClass: "w-[150vw] md:w-screen md:h-[45rem]",
  },
  {
    src: "./images/e-commerce-hero2.jpg",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
    imgClass:
      " w-[17rem] h-[20rem] absolute left-[0rem] top-[12rem]  md:w-[30rem] md:h-[40rem] md:absolute md:top-[5rem] md:left-[48rem]  bg-[#23856D]",
    class: "w-screen h-[27.7rem]   md:w-screen md:h-[45rem] ",
  },
];

function Hero(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const history = useHistory();

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className={`${item.class}  bg-[#23856D] mt-[3rem] md:mt-[0rem] `}>
          <img className={item.imgClass} src={item.src} alt={item.altText} />

          <div className="absolute gap-[] top-[6.5rem] left-[5rem] md:top-[11rem] md:left-[13rem] md:absolute md:z-5 md:text-2xl">
            {item.altText === "Slide 1" && (
              <div className=" flex flex-col gap-[2rem] items-center md:items-start  md:flex md:flex-col text-white font-bold  md:gap-[2.5rem] ">
                <h3>Summer 2020</h3>

                <div className="flex flex-col items-center md:flex md:flex-row md:items-start md:gap-[1rem]">
                  <h1 className="text-4xl md:text-5xl">NEW </h1>
                  <h1 className="text-4xl md:text-5xl">COLLECTION</h1>
                </div>

                <h2 className=" hidden md:block font-normal    w-[13rem] md:w-[25rem]">
                  We know how large objects will act, but things on a smal scale
                </h2>

                <h2 className=" block md:hidden text-center font-normal    w-[13rem] md:w-[25rem]">
                  We know how large objects will act, but things on a smal scale
                </h2>

                <button
                  onClick={() => history.push("/shop")}
                  className=" px-[1rem] py-[0.5rem] bg-[#2DC071] md:py-[1rem] md:px-[2rem] md:w-[15rem] rounded-md"
                >
                  SHOP NOW
                </button>
              </div>
            )}

            {item.altText === "Slide 2" && (
              <div className=" flex flex-col gap-[2rem] items-center md:items-start  md:flex md:flex-col text-white font-bold  md:gap-[2.3rem] ">
                <h3>Summer 2020</h3>

                <div className="flex flex-col items-center md:items-start md:flex-col md:gap-[2rem]">
                  <h1 className="text-3xl md:text-6xl">Vita Classic</h1>
                  <h1 className=" text-3xl md:text-6xl">Product</h1>
                </div>

                <h2 className=" hidden md:block font-normal  w-[16rem] md:w-[29rem]">
                  We know how large objects will act, We know how large objects
                  will act , We know
                </h2>

                <h2 className=" block text-center  md:hidden font-normal  w-[16rem] md:w-[29rem]">
                  We know how large objects will act, We know how large objects
                  will act , We know
                </h2>

                <div className="flex flex-col md:flex md:flex-row items-center md:items-center gap-[1rem]">
                  <h1 className=" text-xl md:text-2xl">$18.48</h1>
                  <button className=" text-lg px-[1rem] py-[0.5rem] bg-[#2DC071] md:py-[0.7rem] md:px-[1.2rem] md:w-[11rem] rounded-md">
                    ADD TO CART
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}

export default Hero;
