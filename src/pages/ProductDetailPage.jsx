import {
  faArrowLeft,
  faCartShopping,
  faChevronRight,
  faEye,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../layouts/header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../thunk/fetchProductThunk";
import BestSellerProducts from "../layouts/best-seller-products-area";
import Footer from "../layouts/footer";
import {
  faAws,
  faHooli,
  faLyft,
  faPiedPiperHat,
  faRedditAlien,
  faStripe,
} from "@fortawesome/free-brands-svg-icons";
import { setCart } from "../redux/shoppingCartSlice";
import CartPreviewProduct from "../components/cartPreviewProductComp";
import { toast } from "react-toastify";

export default function ProductDetailPage({
  currentProduct,
  setCurrentProduct,
}) {
  console.log(currentProduct);
  const dispatch = useDispatch();

  const { productId } = useParams();
  const history = useHistory();
  console.log(productId);

  useEffect(() => {
    dispatch(fetchProduct(`/products/${productId}`));
  }, [productId]);

  const { product } = useSelector((state) => state.product);
  console.log(product);
  const { name, rating, stock, images, description, price } = product;

  const { cart } = useSelector((state) => state.shoppingCart);

  const addShoppingCartHandler = () => {
    const available = cart.filter((prdct) => product.id === prdct.product.id);
    if (available.length > 0) {
      const prdct = cart.find((prdct) => prdct.product.id === product.id);

      const newCart = cart.filter(
        (item) => item.product.id !== prdct.product.id
      );
      dispatch(
        setCart([
          ...newCart,
          { ...prdct, count: prdct.count + 1, checked: true, product: product },
        ])
      );
    } else {
      dispatch(
        setCart([...cart, { count: 1, checked: true, product: product }])
      );
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const [hoveredMyCartBtn, setHoveredMyCartBtn] = useState(false);
  const [hoveredCartPreviewArea, setHoveredCartPreviewArea] = useState(false);

  const navigateShoppingCartPage = () => {
    history.push("/shopping-cart-page");
  };

  return (
    <>
      <Header />
      <main className=" flex-col  md:flex md:flex-col items-center justify-center mt-[1.3rem]  md:px-[8rem] gap-[2rem]">
        <div className="flex items-center justify-center md:justify-start font-bold gap-[1rem] text-md w-full ">
          <p>Home</p>
          <FontAwesomeIcon icon={faChevronRight} style={{ color: "#9e9e9e" }} />
          <p className="text-[#9e9e9e]">Shop</p>
        </div>

        <div className="flex flex-col mt-[2rem] md:mt-[0rem] justify-center items-center justify-around w-full gap-[2rem] md:gap-[0rem] md:flex-row">
          <button
            onClick={() => history.goBack()}
            className="text-4xl absolute left-[5rem]"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <img className="w-[19rem] rounded-md" src={images[0].url} alt="" />

          <div className="flex flex-col bg-stone-100 w-[23.5rem] md:w-[38rem] p-[2rem] w-[50%] gap-[2rem] rounded-lg">
            <p className="font-bold text-lg">{name}</p>
            <p className="font-bold text-xl">{price}₺</p>

            <div className="flex gap-[0.5rem]">
              <p> Availability:</p>

              <p className={`${stock > 0 ? "text-blue-500" : "text-red-500"}`}>
                {stock > 0 ? "InStock" : "Out of Stock"}
              </p>
            </div>
            <p>Stock: {stock}</p>

            <div className="flex font-bold gap-[0.5rem]">
              <p>Rating:</p>
              <p className="text-yellow-500">{rating}★ </p>
            </div>

            <p className="font-bold text-[#858585]">{description}</p>
            <div className="flex md:flex gap-[0.4rem]">
              <button className="rounded-full w-[1.4rem] bg-black">.</button>
              <button className="rounded-full w-[1.4rem] bg-green-700">
                .
              </button>
              <button className="rounded-full w-[1.4rem] bg-sky-500">.</button>
              <button className="rounded-full w-[1.4rem] bg-amber-500">
                .
              </button>
            </div>

            <div className="flex mt-[3rem] gap-[1.8rem] items-center">
              <button className="btnBlueWithWhiteText bg-orange-700 w-[14rem] rounded-md h-[2.5rem] font-bold">
                Select Options
              </button>
              <button
                onClick={addShoppingCartHandler}
                className="btnBlueWithWhiteText w-[14rem] rounded-md h-[2.5rem] font-bold"
              >
                Add to cart
              </button>
            </div>
            <div className="flex items-center text-xl gap-[1.6rem]">
              <div className="flex">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              <div className="flex">
                <FontAwesomeIcon className="hidden md:block" icon={faEye} />
              </div>

              <div className="flex items-center cursor-pointer gap-[0.4rem]">
                <div
                  onClick={navigateShoppingCartPage}
                  onMouseEnter={() => setHoveredMyCartBtn(true)}
                  onMouseLeave={() => setHoveredMyCartBtn(false)}
                  className={`${
                    cart.length == 0 ? "hidden" : "flex"
                  }  items-center text-amber-500  gap-[0.4rem]`}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p>Sepetim</p>
                  <button className="rounded-full text-white font-bold items-center justify-center w-[1.8rem] bg-amber-500">
                    {cart.length}
                  </button>
                </div>

                <div
                  className={`${
                    cart.length == 0 ? "flex" : "hidden"
                  }  items-center   gap-[0.4rem]`}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  <p
                    onClick={navigateShoppingCartPage}
                    className="cursor-pointer"
                  >
                    Sepetim
                  </p>
                </div>
              </div>
            </div>

            {(hoveredMyCartBtn || hoveredCartPreviewArea) && (
              <div
                onMouseEnter={() => setHoveredCartPreviewArea(true)}
                onMouseLeave={() => setHoveredCartPreviewArea(false)}
                className="flex flex-col p-[1.2rem] h-[17rem]  overflow-y-auto scrollable-div bg-stone-200 rounded-lg  w-[23rem] absolute top-[49rem]"
              >
                <div className="flex  gap-[1rem] font-bold text-lg">
                  <p>Sepetim:</p>
                  <p>({cart.length} ürün) </p>
                </div>

                {cart.map((item, ind) => {
                  return <CartPreviewProduct key={ind} item={item} />;
                })}

                <div className="flex w-full justify-around mt-[1rem]">
                  <button
                    onClick={navigateShoppingCartPage}
                    className="btnBlueWithWhiteText w-[9rem] h-[2.5rem] rounded-md bg-amber-500"
                  >
                    Sepete git
                  </button>

                  <button className="btnBlueWithWhiteText w-[9rem] h-[2.5rem] rounded-md">
                    Sipariş tamamla
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <BestSellerProducts setCurrentProduct={setCurrentProduct} />
        <div className="flex flex-col md:flex-row justify-center items-center   text-7xl mt-[3rem]  gap-[2rem] md:gap-[3.5rem] mt-[4rem]  text-gray-500">
          <FontAwesomeIcon icon={faHooli} />

          <FontAwesomeIcon icon={faLyft} />
          <FontAwesomeIcon icon={faPiedPiperHat} />
          <FontAwesomeIcon icon={faStripe} />
          <FontAwesomeIcon icon={faAws} />
          <FontAwesomeIcon icon={faRedditAlien} />
        </div>
        <Footer />
      </main>
    </>
  );
}
