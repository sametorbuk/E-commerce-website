import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useState } from "react";
import "../App.css";
import Product from "../components/product";

const catImgData = [
  "./images/shop-page-category/shop-page-category-image1.jpg",
  "./images/shop-page-category/shop-page-category-image2.jpg",
  "./images/shop-page-category/shop-page-category-image3.jpg",
  "./images/shop-page-category/shop-page-category-image4.jpg",
  "./images/shop-page-category/shop-page-category-image5.jpg",
];

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
];

const firstFour = productData.slice(0, 4);
const secondFour = productData.slice(4, 8);
const thirdFour = productData.slice(8, 12);

export default function ShopPage() {
  const [activePage, setActivePage] = useState(1);

  const handlePageChange = (pageNumber) => {
    event.preventDefault();
    setActivePage(pageNumber);
    console.log(activePage);
  };
  return (
    <>
      <Header />

      <main className=" flex-col  md:flex md:h-screen md:flex-col border-2 items-center border-red-500 md:px-[5rem] gap-[2rem]">
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
          {catImgData.map((item, ind) => {
            const imgUrl = `${window.location.origin}/${item}`;

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
                    <h2 className="font-bold text-xl">CLOTHS</h2>
                    <p className="font-bold text-md">5 items</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <div className="flex flex-col w-screen md:flex md:w-screen md:flex-col gap-[7rem] items-center md:w-screen mt-[4rem] md:mt-[6rem] mb-[6rem] ">
          <div className="flex flex-col md:flex md:flex-row justify-between">
            {firstFour.map((item, ind) => {
              return <Product key={ind} item={item} />;
            })}
          </div>
          <div className="flex flex-col md:flex md:flex-row justify-between">
            {secondFour.map((item, ind) => {
              return <Product key={ind} item={item} />;
            })}
          </div>

          <div className="flex flex-col md:flex md:flex-row justify-between">
            {thirdFour.map((item, ind) => {
              return <Product key={ind} item={item} />;
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
            <PaginationLink onClick={() => handlePageChange(3)} last href="#" />
          </PaginationItem>
        </Pagination>
      </main>
    </>
  );
}
