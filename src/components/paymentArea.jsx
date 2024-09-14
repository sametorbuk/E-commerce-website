import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody } from "reactstrap";

import { useEffect, useState } from "react";
import axios from "axios";
import { setCreditCards } from "../redux/clientSlice";
import { useForm } from "react-hook-form";
import CreditCard from "./creditCardComponent";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";

const months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const currentInstallments = [3, 6, 9, 12];

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i <= 10; i++) {
  years.push(currentYear + i);
}

console.log(years);

export default function PaymentArea({ selectedAddress }) {
  const { creditCards } = useSelector((state) => state.client);
  const [modal, setModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [contractApproval, setContractApproval] = useState(false);
  const contractChangeHandler = (e) => {
    setContractApproval(e.target.checked);
  };

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.shoppingCart);

  const tickedProducts = cart.filter((item) => item.checked === true);
  let total = 0;

  for (let i = 0; i < tickedProducts.length; i++) {
    total = total + tickedProducts[i].count * tickedProducts[i].product.price;
  }

  const token =
    localStorage.getItem("token") === null
      ? sessionStorage.getItem("token")
      : localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://workintech-fe-ecommerce.onrender.com/user/card", {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setCreditCards(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      expire_month: "",
      expire_year: "",
      card_no: "",
      CVV: "",
      name_on_card: "",
    },
    mode: "onBlur",
  });

  const formData = watch();
  console.log(formData);

  const requiredFormat = { ...formData };
  delete requiredFormat.CVV;
  const onSubmit = () => {
    axios
      .post(
        "https://workintech-fe-ecommerce.onrender.com/user/card",
        requiredFormat,
        {
          headers: { Authorization: token },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setCreditCards([...creditCards, res.data]));

        toast.success("Card successfully added");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(selectedCard);

  const { MakeRequest, METHODS } = useAxios();

  const orderRequestHandler = () => {
    if (!(contractApproval && selectedCard)) {
      toast.warning("Please select the card and confirm the contract");
    } else {
      const date = new Date();
      const currentCard = creditCards.find(
        (card) => card.id === selectedCard.id
      );

      let products = [];

      for (let i = 0; i < cart.length; i++) {
        products.push({
          product_id: cart[i].product.id,
          count: cart[i].count,
          detail: cart[i].product.description,
        });
      }
      console.log(products);

      const requiredFormatOfOrderData = {
        address_id: selectedAddress.id,
        order_date: date,
        card_no: selectedCard.card_no,
        card_name: selectedCard.name_on_card,
        card_expire_month: selectedCard.expire_month,
        card_expire_year: selectedCard.expire_year,
        card_ccv: null,
        price: total,
        products: products,
      };

      MakeRequest({
        url: "/order",
        method: METHODS.POST,
        data: requiredFormatOfOrderData,
        headers: {
          Authorization: token,
        },
      });
    }
  };

  return (
    <>
      <main className=" flex flex-col   md:flex md:flex-row mt-[3rem] justify-center ml-[2.8rem] md:ml-[0rem] md:px-[3rem] gap-[2rem]">
        <div className="flex flex-col  w-[90%] md:w-[70%] justify-center">
          <div className="flex w-full justify-between mb-[2rem] ">
            <div className="flex flex-col p-[1rem] w-[50%] ">
              <h3 className="font-bold text-lg">Address Details</h3>
              <p>{selectedAddress.title}</p>
              <p>{selectedAddress.neighborhood}</p>
              <p>{selectedAddress.city}</p>
            </div>

            <div className="flex flex-col p-[1rem] w-[50%] border-t-2 border-l-2 border-r-2 border-b-4 border-t-gray-200 border-l-gray-200 border-r-gray-200 border-b-sky-500 rounded-lg">
              <h3 className="font-bold text-lg">Payment options</h3>
              <p>You can pay by bank credit card</p>
            </div>
          </div>

          <div className="flex flex-col p-[1rem] border-1 border-solid border-gray-500">
            <h2 className="font-bold">Pay by credit card</h2>

            <div className="w-full flex flex-col md:flex-row gap-[1.5rem] mt-[2rem] items-center">
              <div className="w-full md:w-[50%]  items-center md:items-start flex flex-col">
                <button
                  onClick={toggle}
                  className="w-full h-[2.5rem] bg-stone-200 rounded-md flex flex-col justify-center items-center"
                >
                  <p>Pay with another card</p>
                </button>
                {creditCards.map((data, ind) => {
                  return (
                    <CreditCard
                      setSelectedCard={setSelectedCard}
                      isSelected={selectedCard === data}
                      data={data}
                      key={ind}
                    />
                  );
                })}
              </div>

              <div>
                <Modal
                  className="relative top-[3rem]"
                  isOpen={modal}
                  toggle={toggle}
                >
                  <ModalBody className="">
                    <form
                      className="mt-[0rem] p-[1rem]"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="flex flex-col gap-[0.5rem]">
                        <label className="font-bold" htmlFor="card_no">
                          Card no
                        </label>
                        <input
                          className="bg-stone-300 rounded-sm h-[2rem]"
                          type="text"
                          id="card_no"
                          {...register("card_no", {
                            required: "Card field cannot be empty",
                            pattern: {
                              value: /^\d{16}$/,
                              message: "Card number must be 16 digits",
                            },
                          })}
                        />
                        {errors.card_no && (
                          <p className=" text-red-400">
                            {errors.card_no.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-[0.5rem]">
                        <label className="font-bold" htmlFor="name_on_card">
                          Name
                        </label>
                        <input
                          className="bg-stone-300 rounded-sm h-[2rem]"
                          type="text"
                          id="name_on_card"
                          {...register("name_on_card", {
                            required: "Name field cannot be empty",
                            minLength: {
                              value: 6,
                              message:
                                "Name field must contain at least 10 characters",
                            },
                          })}
                        />
                        {errors.name_on_card && (
                          <h2 className=" text-red-500">
                            {errors.name_on_card.message}
                          </h2>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label
                          className="my-[1rem] font-bold"
                          htmlFor="expiryDate"
                        >
                          Expiry Date
                        </label>
                        <div className="flex w-full justify-between">
                          <div className=" flex gap-[0.6rem]">
                            <div className="flex flex-col">
                              <select
                                className="bg-stone-300 rounded-md w-[4rem] h-[2rem]"
                                id="expire_month"
                                {...register("expire_month", {
                                  required: "Month field cannot be empty",
                                })}
                              >
                                <option value="">Month</option>
                                {months.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                              {errors.expire_month && (
                                <h2 className="text-red-500">
                                  {errors.expire_month.message}
                                </h2>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <select
                                className="bg-stone-300 rounded-md w-[4rem] h-[2rem]"
                                id="expire_year"
                                {...register("expire_year", {
                                  required: "Year field cannot be empty",
                                })}
                              >
                                <option value="">Year</option>
                                {years.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                              {errors.expire_year && (
                                <h2 className=" text-red-500">
                                  {errors.expire_year.message}
                                </h2>
                              )}
                            </div>
                          </div>

                          <div className="flex  gap-[0.4rem]">
                            <label className="font-bold" htmlFor="CVV">
                              CVV
                            </label>

                            <div className="flex flex-col">
                              <input
                                className="w-[4rem] bg-stone-300 rounded-sm h-[2rem]"
                                type="number"
                                id="CVV"
                                {...register("CVV", {
                                  required: "CVV field cannot be empty",
                                  pattern: {
                                    value: /^\d{3,4}$/,
                                    message: "CVV must be 3 or 4 digits",
                                  },
                                })}
                              />
                              {errors.CVV && (
                                <p className=" text-red-500">
                                  {errors.CVV.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full flex justify-around mt-[5rem]">
                        <button
                          type="submit"
                          disabled={!isValid}
                          className="btnBlueWithWhiteText rounded-md h-[2rem] "
                          onClick={toggle}
                        >
                          Kaydet
                        </button>{" "}
                        <button
                          className="btnBlueWithWhiteText rounded-md h-[2rem]"
                          onClick={toggle}
                        >
                          Vazgeç
                        </button>
                      </div>
                    </form>
                  </ModalBody>
                </Modal>
              </div>

              <div className="w-[23rem]   md:w-[50%]  p-[1rem] flex border-Simple ">
                <div className="flex flex-col w-[50%] ">
                  <div className="flex justify-center  font-bold border-Simple ">
                    Number of instalments
                  </div>

                  <div className="flex items-center justify-center border-Simple  gap-[2rem] ">
                    <label className="cursor-pointer" htmlFor="one">
                      Tek çekim
                    </label>
                    <input type="radio" id="one" name="numberOfInstalments" />
                  </div>
                  {currentInstallments.map((item, ind) => {
                    return (
                      <>
                        <div
                          key={ind}
                          className="flex cursor-pointer items-center gap-[2rem] text-md justify-center font-bold border-Simple"
                        >
                          <label className="cursor-pointer" htmlFor={item}>
                            {item} taksit
                          </label>
                          <input
                            type="radio"
                            id={item}
                            name="numberOfInstalments"
                          />
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="flex flex-col  w-[50%] border-Simple">
                  <div className="flex justify-center font-bold border-Simple">
                    Monthly Payment
                  </div>

                  <div className="flex items-center gap-[2rem] text-md justify-center font-bold border-Simple">
                    <p>{total.toFixed(2)} TL</p>
                  </div>
                  {currentInstallments.map((item, ind) => {
                    return (
                      <>
                        <div
                          key={ind}
                          className="flex items-center gap-[2rem] text-md justify-center font-bold border-Simple"
                        >
                          <p>{(total / item).toFixed(2)} TL</p>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-[1.3rem]">
          <div className="hidden md:flex flex-col items-center w-[18rem] p-[0.8rem] gap-[1.2rem] w-[13rem] h-[17rem] bg-stone-100 rounded-lg border-1  border-gray-300 border-solid">
            <p className="font-bold">Order Summary</p>

            <div className="flex justify-between w-full">
              <p>Sum of products:</p>
              <p className="text-sky-500 justify-end font-bold flex grow-[0.5] ">
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
            <div className="w-full text-md font-bold gap-[1rem] ml-[0rem] flex justify-center md:justify-end  ">
              <p>Total:</p>
              <p className="text-sky-600 ">
                {(total >= 150 ? total : total + 29.99).toFixed(2)} TL
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <input type="checkbox" onChange={contractChangeHandler} />
            <div className="ml-2">
              <p className="underline cursor-pointer">
                Prior information conditions
              </p>

              <p className="underline cursor-pointer">
                Distance sales contract
              </p>
              <p>I read, I approve</p>
            </div>
          </div>

          <div>
            <button
              onClick={orderRequestHandler}
              className="btnBlueWithWhiteText cursor-pointer flex items-center justify-center font-bold w-[10rem] rounded-md h-[2.5rem] bg-sky-500"
            >
              Make the payment
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
