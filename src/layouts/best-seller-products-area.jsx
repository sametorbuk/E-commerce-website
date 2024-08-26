import { useSelector } from "react-redux";
import Product from "../components/product";

export default function BestSellerProducts({ setCurrentProduct }) {
  const { productList, fetchState } = useSelector((state) => state.product);

  const firstFour = productList.slice(13, 17);
  const secondFour = productList.slice(21, 25);

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
        {fetchState === "FETCHING" && <div className="loading-spinner"></div>}
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
