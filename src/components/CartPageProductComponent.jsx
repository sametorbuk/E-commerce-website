import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/shoppingCartSlice";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export default function CartPageProductComp({ prdct }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const { cart } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();

  const { count, product } = prdct;

  const { price, images, description, id } = product;

  const productCountIncreaseHandler = () => {
    let ind = 0;

    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].product.id === id) {
        newCart[i] = { ...newCart[i], count: newCart[i].count + 1 };
        console.log(newCart[i]);
        dispatch(setCart(newCart));
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        ind = ind + 1;
      }
    }
  };

  const productCountDecreaseHandler = () => {
    let ind = 0;

    let newCart = [...cart];
    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].product.id === id) {
        newCart[i] = {
          ...newCart[i],
          count: newCart[i].count > 0 ? newCart[i].count - 1 : 0,
        };
        console.log(newCart[i]);
        dispatch(setCart(newCart));
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        ind = ind + 1;
      }
    }
  };

  const clearProductFromCartHandler = () => {
    const newCart = cart.filter((item) => item.product.id !== product.id);

    dispatch(setCart(newCart));
    localStorage.setItem("cart", JSON.stringify(newCart));
    toggle();
  };

  const checkboxOnChangeHandler = (e) => {
    const { checked } = e.target;

    let newCart = [...cart];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].product.id === id) {
        newCart[i] = { ...newCart[i], checked: checked };
        dispatch(setCart(newCart));
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
  };
  return (
    <>
      {cart.length === 0 && (
        <div>
          <h2>SEPETİNİZDE ÜRÜN BULUNMAMAKTADIR</h2>
        </div>
      )}
      <div className="flex  mt-[1rem] w-[60rem] gap-[5rem] items-center">
        <input
          onChange={checkboxOnChangeHandler}
          type="checkbox"
          id={product.id}
          checked={prdct.checked}
        />

        <label className="flex items-center gap-[1.9rem]" htmlFor={product.id}>
          <img className="w-[8rem] h-[8rem]" src={images[0].url} alt="" />

          <div className="flex flex-col w-[30rem] gap-[0.2rem]">
            <h2>{description}</h2>

            <div className="flex">
              <p className="text-gray-400 font-bold">Adet: {count}</p>
            </div>

            <p className="text-xl text-amber-500">{price} TL</p>
          </div>

          <div className="flex text-2xl items-center h-[3rem] ">
            <button
              onClick={productCountDecreaseHandler}
              className="text-5xl w-[2rem] rounded-md flex items-center justify-center h-full  border border-gray-500"
            >
              -
            </button>

            <p className="w-[3rem] flex items-center rounded-md justify-center h-full  text-center border h-[2rem] border-gray-500">
              {count}
            </p>

            <button
              onClick={productCountIncreaseHandler}
              className="text-4xl w-[2rem]  rounded-md flex items-center justify-center h-full text-amber-500 border border-gray-500"
            >
              +
            </button>
          </div>
        </label>

        <p className="text-2xl font-bold text-amber-500">{count * price}TL</p>
        <button onClick={toggle}>
          <FontAwesomeIcon
            className="text-gray-500 font-bold text-xl"
            icon={faTrashCan}
          />
        </button>
      </div>

      <div className="">
        <Modal className="relative top-[7rem] " isOpen={modal} toggle={toggle}>
          <ModalBody>
            Ürünü sepetinizden silmek istediğinize emin misiniz ?
          </ModalBody>
          <ModalFooter className="flex gap-[2rem] h-[4rem]">
            <button
              className="btnBlueWithWhiteText rounded-md h-[2rem] w-[6rem]"
              onClick={clearProductFromCartHandler}
            >
              Yes
            </button>
            <button
              className="btnBlueWithWhiteText w-[6rem] h-[2rem] rounded-md bg-gray-500"
              onClick={toggle}
            >
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
