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

export default function CreateOrderPage() {
  const [selectedAddress, setSelectedAdress] = useState(null);

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

  console.log(addressList);

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
  console.log(formData);

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

    toggle();

    setTimeout(() => {
      toast.success("Address başarıyla kaydedildi");
    }, 1000);
  };

  return (
    <>
      <Header />

      <main className=" flex flex-col   md:flex md:flex-row mt-[3rem] justify-center ml-[2.8rem] md:ml-[0rem] md:px-[3rem] gap-[2rem]">
        <div className="flex flex-col  w-[90%] md:w-[70%] justify-center">
          <div className="flex w-full justify-between">
            <div className="flex flex-col p-[1rem]">
              <h3 className="font-bold text-lg">Adres Bilgileri</h3>
              <p>Ev</p>
              <p>{"Adress"}</p>
            </div>

            <div className="flex flex-col p-[1rem]">
              <h3 className="font-bold text-lg">Ödeme Seçenekleri</h3>
              <p>Banka kredi kartıyla ödeme yapabilirsiniz</p>
            </div>
          </div>

          <div className="flex flex-col p-[1rem] border-1 border-solid border-gray-500">
            <h2 className="font-bold">Teslimat adresi</h2>

            <div className="w-full flex flex-col md:grid md:grid-cols-2 gap-[1.5rem] mt-[2rem] items-center">
              <button
                onClick={toggle}
                className="w-full h-full bg-stone-200 rounded-md flex flex-col justify-center items-center"
              >
                <p className="text-4xl font-bold text-amber-500">+</p>
                <p>Yeni adres ekle</p>
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

        <div className="hidden md:flex flex-col items-center w-[%40] p-[0.8rem] gap-[1.2rem] w-[13rem] h-[17rem] bg-stone-100 rounded-lg border-1  border-gray-300 border-solid">
          <p className="font-bold">Sipariş Özeti</p>

          <div className="flex justify-between w-full">
            <p>Ürünler toplamı:</p>
            <p className="text-amber-500 font-bold flex grow-[0.5] ">
              {total !== 0 ? (total >= 150 ? total : total + 29.99) : 0}TL
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
        </div>
      </main>

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

      <Footer />
    </>
  );
}
