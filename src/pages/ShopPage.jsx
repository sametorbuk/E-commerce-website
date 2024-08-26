import {
  faChevronDown,
  faChevronRight,
  faList,
  faTableCellsLarge,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

import "../App.css";
import Product from "../components/product";
import Footer from "../layouts/footer";
import {
  faAws,
  faHooli,
  faLyft,
  faPiedPiperHat,
  faRedditAlien,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";


const productData = [
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-2.jpg",
  "./images/bestseller-product/best-seller-3.jpg",
  "./images/bestseller-product/best-seller-4.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-6.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-8.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-6.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-8.jpg",
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-6.jpg",
  "./images/bestseller-product/best-seller-3.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-3.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-8.jpg",
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-4.jpg",
  "./images/bestseller-product/best-seller-2.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-8.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-6.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-4.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-2.jpg",
  "./images/bestseller-product/best-seller-4.jpg",
];

export default function ShopPage(props) {
  const [activePage, setActivePage] = useState(1);
  const { setCurrentProduct } = props;
  const handlePageChange = (pageNumber) => {
    event.preventDefault();
    setActivePage(pageNumber);
    console.log(activePage);
  };

  const currenPaginationData = () => {
    let data = null;
    if (activePage === 1) {
      data = productData.slice(0, 12);
    } else if (activePage === 2) {
      data = productData.slice(12, 24);
    } else if (activePage === 3) {
      data = productData.slice(24, 36);
    }

    return data;
  };

  const { categories } = useSelector((state) => state.product);

  console.log(categories);
  const sortedCategories = [...categories].sort((a, b) => b.rating - a.rating);
  const topFiveCategories = sortedCategories.slice(0, 5);
  console.log(topFiveCategories);

  return (
    <>
      <Header />

      <main className=" flex-col  md:flex md:flex-col items-center justify-center  md:px-[5rem] gap-[2rem]">
        <div className="flex flex-col mt-[2rem] gap-[2rem]  items-center md:flex-row w-full justify-between">
          <h2 className="font-bold text-xl">Shop</h2>

          <div className="flex items-center font-bold gap-[1rem] text-md">
            <p>Home</p>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ color: "#9e9e9e" }}
            />
            <p className="text-[#9e9e9e]">Shop</p>
          </div>
        </div>

        <section className="flex items-center mt-[3rem] md:mt-[0rem] gap-[1rem]  md:gap-[1rem] flex-col md:flex-row justify-between">
          {topFiveCategories.map((item, ind) => {
            const imgUrl = item.img;
            console.log(imgUrl);

            return (
              <div key={ind} className="relative w-[13rem] h-[10rem]">
                <div
                  style={{ backgroundImage: `url(${imgUrl})` }}
                  className="absolute inset-0 bg-cover bg-center"
                >
                  <div className="absolute inset-0 bg-black opacity-30"></div>
                </div>

                <div className="relative flex justify-center items-center h-full text-white">
                  <div className="flex flex-col items-center">
                    <h2 className="font-bold text-xl">
                      {item.gender == "k" ? "Kadın" : "Erkek"}
                    </h2>
                    <p className="font-bold text-md">{item.title}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="flex flex-col md:flex md:flex-row justify-center gap-[1rem] justify-between mt-[2rem] w-full items-center  ">
          <p className="text-[#737373] font-bold">Showing all 12 results </p>

          <div className="flex gap-[1rem]  items-center ">
            <p className="text-[#737373] font-bold ">Views:</p>
            <button className="p-[0.7rem] border border-gray-300 rounded-md ">
              <FontAwesomeIcon icon={faTableCellsLarge} />
            </button>
            <button className="p-[0.7rem] border border-gray-300 rounded-md">
              <FontAwesomeIcon icon={faList} />
            </button>
          </div>

          <div className="flex gap-[1.5rem]">
            <button className="items-center  border border-gray-500 p-[0.5rem] w-[7rem] rounded-md ">
              Popularity <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <button className=" text-white font-bold p-[0.5rem] w-[6rem] rounded-md bg-[#23A6F0]">
              Filter
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[2.7rem] items-center">
          <div className="flex flex-col w-screen md:flex md:w-screen md:flex-col gap-[2rem]  md:gap-[5rem] items-center md:w-screen mt-[4rem] md:mt-[2rem]  ">
            <div className="flex flex-col gap-[2.5rem] md:gap-[0rem]  md:flex md:flex-row justify-between">
              {currenPaginationData()
                .slice(0, 4)
                .map((item, ind) => {
                  return (
                    <Product
                      key={ind}
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col gap-[2.5rem] md:gap-[0rem] md:flex md:flex-row justify-between">
              {currenPaginationData()
                .slice(4, 8)
                .map((item, ind) => {
                  return (
                    <Product
                      key={ind}
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    />
                  );
                })}
            </div>

            <div className="flex flex-col  gap-[2.5rem] md:gap-[0rem]  md:flex md:flex-row justify-between">
              {currenPaginationData()
                .slice(8, 12)
                .map((item, ind) => {
                  return (
                    <Product
                      key={ind}
                      setCurrentProduct={setCurrentProduct}
                      item={item}
                    />
                  );
                })}
            </div>
          </div>

          <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={activePage === 1}>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                first
                href="#"
              />
            </PaginationItem>
            <PaginationItem disabled={activePage === 1}>
              <PaginationLink
                onClick={() => handlePageChange(activePage - 1)}
                previous
                href="#"
              />
            </PaginationItem>
            <PaginationItem active={activePage === 1}>
              <PaginationLink onClick={() => handlePageChange(1)} href="#">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={activePage === 2}>
              <PaginationLink onClick={() => handlePageChange(2)} href="#">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem active={activePage === 3}>
              <PaginationLink onClick={() => handlePageChange(3)} href="#">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem disabled={activePage === 3}>
              <PaginationLink
                onClick={() => handlePageChange(activePage + 1)}
                next
                href="#"
              />
            </PaginationItem>
            <PaginationItem disabled={activePage === 3}>
              <PaginationLink
                onClick={() => handlePageChange(3)}
                last
                href="#"
              />
            </PaginationItem>
          </Pagination>
        </div>
      </main>

      <div className="flex flex-col md:flex-row justify-center items-center   text-8xl mt-[3rem]  gap-[2rem] md:gap-[3.5rem]  text-gray-500">
        <FontAwesomeIcon icon={faHooli} />

        <FontAwesomeIcon icon={faLyft} />
        <FontAwesomeIcon icon={faPiedPiperHat} />
        <FontAwesomeIcon icon={faStripe} />
        <FontAwesomeIcon icon={faAws} />
        <FontAwesomeIcon icon={faRedditAlien} />
      </div>

      <Footer />
    </>
  );
}
