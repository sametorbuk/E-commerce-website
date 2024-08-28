import { useSelector } from "react-redux";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import CartPageProductComp from "../components/CartPageProductComponent";

export default function ShoppingCartPage() {
  const { cart } = useSelector((state) => state.shoppingCart);

  const tickedProducts = cart.filter((item) => item.checked === true);
  let total = 0;

  for (let i = 0; i < tickedProducts.length; i++) {
    total = total + tickedProducts[i].count * tickedProducts[i].product.price;
  }

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center w-full">
        {cart.map((prdct, ind) => (
          <CartPageProductComp key={ind} prdct={prdct} />
        ))}
      </main>
      <div className="w-full text-2xl font-bold gap-[1rem] mt-[3rem] flex justify-end px-[14rem] ">
        <p>Toplam:</p>
        <p className="text-amber-600 ">{total} TL</p>
      </div>
      <Footer />
    </>
  );
}
