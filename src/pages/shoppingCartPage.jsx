import { useSelector } from "react-redux";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import CartPageProductComp from "../components/CartPageProductComponent";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

export default function ShoppingCartPage() {
  const { cart } = useSelector((state) => state.shoppingCart);
  const history = useHistory();

  const tickedProducts = cart.filter((item) => item.checked === true);
  let total = 0;

  for (let i = 0; i < tickedProducts.length; i++) {
    total = total + tickedProducts[i].count * tickedProducts[i].product.price;
  }

  const navigateToCreateOrderPage = () => {
    if (cart.length !== 0) {
      history.push("/create-order-page");
    } else {
      toast.warning("Please add items to your basket first");
    }
  };

  return (
    <>
      <Header />

      <main className="flex flex-col md:flex-row   justify-around  w-full">
        <div className="flex flex-col">
          {cart.map((prdct, ind) => (
            <CartPageProductComp key={ind} prdct={prdct} />
          ))}

          {cart.length == 0 && (
            <h2 className="font-bold text-3xl text-center mt-[3.5rem]">
              THERE IS NO PRODUCT IN YOUR BASKET
            </h2>
          )}
        </div>

        <div className="hidden md:flex flex-col items-center p-[0.3rem] gap-[1.2rem] w-[13rem] md:mt-[3.5rem] h-[17rem] bg-stone-100 rounded-lg border-1  border-gray-300 border-solid">
          <p className="font-bold">Order Summary</p>

          <div className="flex justify-between w-full">
            <p>Sum of products:</p>
            <p className="text-sky-500  font-bold flex justify-end grow-[0.5] ">
              {total !== 0
                ? (total >= 150 ? total : total + 29.99).toFixed(2)
                : 0}
              TL
            </p>
          </div>
          <div className="flex justify-between w-full">
            <p>Cargo total:</p>
            <p className="text-sky-500 font-bold ">29.99TL</p>
          </div>
          <div className="flex justify-between w-full justify-center items-center">
            <p className="w-[8rem] ">
              150 TL and over free shipping (seller pays)
            </p>
            <p className="text-sky-500 font-bold">-29,99 TL</p>
          </div>

          <button
            onClick={navigateToCreateOrderPage}
            className="flex   items-center gap-[1rem] justify-center rounded-sm h-[2rem] btnBlueWithWhiteText bg-sky-500 w-[10rem]"
          >
            Confirm
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="flex md:hidden mt-[3rem] w-full justify-center items-center">
          <button
            onClick={navigateToCreateOrderPage}
            className="flex md:hidden   items-center gap-[1rem] justify-center rounded-sm h-[2rem] btnBlueWithWhiteText bg-sky-500 w-[10rem]"
          >
            Confirm
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </main>

      <div className="w-full text-2xl font-bold gap-[1rem] mt-[3rem] flex justify-center md:justify-end px-[14rem] ">
        <p>Total:</p>
        <p className="text-sky-500 ">
          {total !== 0 ? (total >= 150 ? total : total + 29.99).toFixed(2) : 0}
          TL
        </p>
      </div>

      <Footer />
    </>
  );
}
