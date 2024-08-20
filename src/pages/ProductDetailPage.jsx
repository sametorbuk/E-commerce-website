import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    src: "https://picsum.photos/id/123/1200/400",
    altText: "Slide 1",
    caption: "Slide 1",
    key: 1,
  },
  {
    src: "https://picsum.photos/id/456/1200/400",
    altText: "Slide 2",
    caption: "Slide 2",
    key: 2,
  },
];

export default function ProductDetailPage({ currentProduct }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    setCurrentData(currentProduct);
  }, [currentProduct]);

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
        <img className="h-[20rem]" src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });
  return (
    <>
      <Header />
      <main className=" flex-col  md:flex md:flex-col items-center justify-center mt-[1.3rem]  md:px-[8rem] gap-[2rem]">
        <div className="flex items-center font-bold gap-[1rem] text-md w-full ">
          <p>Home</p>
          <FontAwesomeIcon icon={faChevronRight} style={{ color: "#9e9e9e" }} />
          <p className="text-[#9e9e9e]">Shop</p>
        </div>

        <div className="flex flex-col justify-center justify-between  md:flex-row">
          <Carousel
            className="w-[50%] "
            activeIndex={activeIndex}
            next={next}
            previous={previous}
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

          <div className="flex flex-col bg-stone-500 p-[2rem] w-[50%]">
            <h2>samet</h2>
          </div>
        </div>
      </main>
    </>
  );
}
