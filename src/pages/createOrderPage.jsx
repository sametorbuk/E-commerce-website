import { useDispatch, useSelector } from "react-redux";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import { useEffect } from "react";
import { fetchAddressList } from "../thunk/fetchAdressListThunk";
import AddressRadioComponent from "../components/adressRadioComponent";
import { useForm } from "react-hook-form";
import useAxios from "../hooks/useAxios";

import { iller } from "../city-data";
import { toast } from "react-toastify";
import PaymentArea from "../components/paymentArea";
import { setAddressList } from "../redux/clientSlice";

export default function CreateOrderPage() {
  const [selectedAddress, setSelectedAdress] = useState([]);
  const [contractApproval, setContractApproval] = useState(false);
  const [addressAndContractCompleted, setAddressAndContractCompleted] =
    useState(localStorage.getItem("addressAndContractCompleted") || false);

  const contractChangeHandler = (e) => {
    setContractApproval(e.target.checked);
  };

  const requiredsWarningHandler = () => {
    if (!(contractApproval && selectedAddress)) {
      toast.warning("Lütfen adresi seçiniz ardından sözleşmeyi onaylayınız");
    } else {
      setAddressAndContractCompleted(true);
      localStorage.setItem("addressAndContractCompleted", true);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAdress(address);
  };
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const { cart } = useSelector((state) => state.shoppingCart);

  const tickedProducts = cart.filter((item) => item.checked === true);
  let total = 0;

  for (let i = 0; i < tickedProducts.length; i++) {
    total = total + tickedProducts[i].count * tickedProducts[i].product.price;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddressList("/user/address"));
  }, []);

  const { addressList } = useSelector((state) => state.client);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",

      district: "",
    },
  });

  const formData = watch();

  const token = localStorage.getItem("token");
  console.log(token);

  const { MakeRequest, METHODS } = useAxios();

  const addAddressHandler = () => {
    MakeRequest({
      url: "/user/address",
      data: formData,
      method: METHODS.POST,
      headers: {
        Authorization: token,
      },
    });

    dispatch(setAddressList([...addressList, formData]));

    toggle();

    setTimeout(() => {
      toast.success("Address başarıyla kaydedildi");
    }, 1000);
  };

  return (
    <>
      <Header />

      {!addressAndContractCompleted && (
        <main className=" flex flex-col   md:flex md:flex-row mt-[3rem] justify-center ml-[2.8rem] md:ml-[0rem] md:px-[3rem] gap-[2rem]">
          <div className="flex flex-col  w-[90%] md:w-[70%] justify-center">
            <div className="flex w-full justify-between mb-[2rem] ">
              <div className="flex flex-col p-[1rem] w-[50%] border-t-2 border-l-2 border-r-2 border-b-4 border-t-gray-200 border-l-gray-200 border-r-gray-200 border-b-orange-500 rounded-lg">
                <h3 className="font-bold text-lg">Address Details</h3>
                <p>{selectedAddress.title}</p>
                <p>{selectedAddress.neighborhood}</p>
                <p>{selectedAddress.city}</p>
              </div>

              <div className="flex flex-col p-[1rem] w-[50%]">
                <h3 className="font-bold text-lg">Payment options</h3>
                <p>You can pay by bank credit card</p>
              </div>
            </div>

            <div className="flex flex-col p-[1rem] border-1 border-solid border-gray-500">
              <h2 className="font-bold">Delivery address</h2>

              <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-[1.5rem] mt-[2rem] items-center">
                <button
                  onClick={toggle}
                  className="w-full h-full bg-stone-200 rounded-md flex flex-col justify-center items-center"
                >
                  <p className="text-4xl font-bold text-amber-500">+</p>
                  <p>Add new address</p>
                </button>

                {addressList.map((data, ind) => {
                  return (
                    <AddressRadioComponent
                      key={ind}
                      onSelect={handleAddressSelect}
                      isSelected={selectedAddress === data}
                      data={data}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-[1.3rem]">
            <div className="hidden md:flex flex-col items-center w-[18rem] p-[0.8rem] gap-[1.2rem] w-[13rem] h-[17rem] bg-stone-100 rounded-lg border-1  border-gray-300 border-solid">
              <p className="font-bold">Order Summary</p>

              <div className="flex justify-between w-full">
                <p>Sum of products:</p>
                <p className="text-amber-500 font-bold flex grow-[0.5] ">
                  {total !== 0
                    ? (total >= 150 ? total : total + 29.99).toFixed(2)
                    : 0}
                  TL
                </p>
              </div>
              <div className="flex justify-between w-full">
                <p>Cargo total:</p>
                <p className="text-amber-500 font-bold ">29.99TL</p>
              </div>
              <div className="flex justify-between w-full justify-center items-center">
                <p className="w-[8rem] ">
                  150 TL and over free shipping (seller pays)
                </p>
                <p className="text-amber-500 font-bold">-29,99 TL</p>
              </div>
              <div className="w-full text-md font-bold gap-[1rem] ml-[0rem] flex justify-center md:justify-end  ">
                <p>Total:</p>
                <p className="text-amber-600 ">
                  {(total >= 150 ? total : total + 29.99).toFixed(2)}
                  TL
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

            <div onClick={requiredsWarningHandler}>
              <p className="btnBlueWithWhiteText cursor-pointer flex items-center justify-center font-bold w-[10rem] rounded-md h-[2.5rem] bg-sky-500">
                Save and continue
              </p>
            </div>
          </div>

          <div className="">
            <Modal className="relative  " isOpen={modal} toggle={toggle}>
              <ModalBody>
                <form onSubmit={handleSubmit(addAddressHandler)}>
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="title">Adress Title</label>
                    <input
                      className="bg-stone-200"
                      type="text"
                      id="title"
                      {...register("title", {
                        required: "Title shouldnt empty",
                        minLength: {
                          value: 2,
                          message: "Title have at least 2 characters",
                        },
                      })}
                    />
                    {errors.title && (
                      <p className="font-bold text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="name">Name</label>
                    <input
                      className="bg-stone-200"
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name shouldnt empty",
                        minLength: {
                          value: 4,
                          message: "Name have at least 4 characters",
                        },
                      })}
                    />
                    {errors.name && (
                      <p className="font-bold text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="surname">Surname</label>
                    <input
                      className="bg-stone-200"
                      type="text"
                      id="surname"
                      {...register("surname", {
                        required: "Surname area shouldnt empty",
                        minLength: {
                          value: 4,
                          message: "Surname have at least 4 characters",
                        },
                      })}
                    />
                    {errors.surname && (
                      <p className="font-bold text-red-500">
                        {errors.surname.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className="bg-stone-200"
                      type="text"
                      id="phone"
                      {...register("phone", {
                        required: "Phone area shouldnt empty",
                        pattern: {
                          value: /^(\+90|90)?5\d{9}$/,
                          message: "Please enter a valid Turkish phone number.",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="font-bold text-red-500">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="city">City</label>
                    <select
                      id="city"
                      className="bg-stone-200"
                      {...register("city", { required: "City is required" })}
                    >
                      <option value="">Select a city</option>
                      {iller.map((il) => (
                        <option key={il.value} value={il.value}>
                          {il.label}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="font-bold ">{errors.city.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="district">District</label>
                    <input
                      className="bg-stone-200"
                      type="text"
                      id="district"
                      {...register("district", {
                        required: "District shouldnt empty",
                        minLength: {
                          value: 4,
                          message: "District have at least 4 characters",
                        },
                      })}
                    />
                    {errors.district && (
                      <p className="font-bold text-red-600">
                        {errors.district.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-[0.5rem]">
                    <label htmlFor="neighborhood">Address</label>
                    <textarea
                      className="bg-stone-200"
                      rows={5}
                      type="text"
                      id="neighborhood"
                      {...register("neighborhood", {
                        required: "Address shouldnt empty",
                        minLength: {
                          value: 15,
                          message: "Address have at least 15 characters",
                        },
                      })}
                    />
                    {errors.neighborhood && (
                      <p className="font-bold text-red-500">
                        {errors.neighborhood.message}
                      </p>
                    )}
                  </div>
                  <button
                    className="btnBlueWithWhiteText mt-[1.5rem] rounded-md"
                    type="submit"
                    disabled={!isValid}
                  >
                    Submit
                  </button>
                </form>
              </ModalBody>
            </Modal>
          </div>
        </main>
      )}

      {addressAndContractCompleted && (
        <PaymentArea selectedAddress={selectedAddress} />
      )}

      <Footer />
    </>
  );
}
