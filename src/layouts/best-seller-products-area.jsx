import Product from "../components/product";

const data = [
  "./images/bestseller-product/best-seller-1.jpg",
  "./images/bestseller-product/best-seller-2.jpg",
  "./images/bestseller-product/best-seller-3.jpg",
  "./images/bestseller-product/best-seller-4.jpg",
  "./images/bestseller-product/best-seller-5.jpg",
  "./images/bestseller-product/best-seller-6.jpg",
  "./images/bestseller-product/best-seller-7.jpg",
  "./images/bestseller-product/best-seller-8.jpg",
];

export default function BestSellerProducts({ setCurrentProduct }) {
  const firstFour = data.slice(0, 4);
  const secondFour = data.slice(4, 8);

  return (
    <>
      <div className="flex flex-col w-screen md:flex md:w-screen md:flex-col gap-[7rem] items-center md:w-screen mt-[4rem] md:mt-[6rem] mb-[6rem] ">
        <div className="flex flex-col md:flex md:flex-col items-center gap-[0.8rem]">
          <p className="text-[#737373] font-bold">Featured Products</p>
          <h2 className="font-bold text-2xl">BEST SELLER PRODUCTS</h2>
          <p className="text-[#737373] font-bold">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="flex flex-col md:flex md:flex-row justify-between">
          {firstFour.map((item, ind) => {
            return (
              <Product
                key={ind}
                setCurrentProduct={setCurrentProduct}
                item={item}
              />
            );
          })}
        </div>
        <div className="flex flex-col md:flex md:flex-row justify-between">
          {secondFour.map((item, ind) => {
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
    </>
  );
}
