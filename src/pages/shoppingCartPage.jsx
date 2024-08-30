import { useSelector } from "react-redux";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import CartPageProductComp from "../components/CartPageProductComponent";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ShoppingCartPage() {
  const { cart } = useSelector((state) => state.shoppingCart);
  const history = useHistory();

  const tickedProducts = cart.filter((item) => item.checked === true);
  let total = 0;

  for (let i = 0; i < tickedProducts.length; i++) {
    total = total + tickedProducts[i].count * tickedProducts[i].product.price;
  }

  return (
    <>
      <Header />

      <main className="flex flex-col md:flex-row   justify-around  w-full">
        <div className="flex flex-col">
          {cart.map((prdct, ind) => (
            <CartPageProductComp key={ind} prdct={prdct} />
          ))}
        </div>
        <div className="hidden md:flex flex-col items-center p-[0.8rem] gap-[1.2rem] w-[13rem] h-[17rem] bg-stone-100 rounded-lg border-1  border-gray-300 border-solid">
          <p className="font-bold">Sipariş Özeti</p>

          <div className="flex justify-between w-full">
            <p>Ürünler toplamı:</p>
            <p className="text-amber-500 font-bold flex grow-[0.5] ">
              {total >= 150 ? total : total + 29.99}TL
            </p>
          </div>
          <div className="flex justify-between w-full">
            <p>Kargo toplam:</p>
            <p className="text-amber-500 font-bold ">29.99TL</p>
          </div>
          <div className="flex justify-around w-full justify-center items-center">
            <p className="w-[8rem] ">
              150 TL ve üzeri kargo bedava (satıcı karşılar)
            </p>
            <p className="text-amber-500 font-bold">-29,99 TL</p>
          </div>

          <button
            onClick={() => history.push("/create-order-page")}
            className="flex   items-center gap-[1rem] justify-center rounded-sm h-[2rem] btnBlueWithWhiteText bg-amber-500 w-[10rem]"
          >
            Sepeti onayla
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="flex md:hidden mt-[3rem] w-full justify-center items-center">
          <button
            onClick={() => history.push("/create-order-page")}
            className="flex md:hidden   items-center gap-[1rem] justify-center rounded-sm h-[2rem] btnBlueWithWhiteText bg-amber-500 w-[10rem]"
          >
            Sepeti onayla
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </main>

      <div className="w-full text-2xl font-bold gap-[1rem] mt-[3rem] flex justify-center md:justify-end px-[14rem] ">
        <p>Toplam:</p>
        <p className="text-amber-600 ">
          {total >= 150 ? total : total + 29.99} TL
        </p>
      </div>

      <Footer />
    </>
  );
}
