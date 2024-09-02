import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreenButton } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, ModalBody } from "reactstrap";
import { iller } from "../city-data";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddressRadioComponent({ data, isSelected, onSelect }) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const {
    title,
    surname,
    name,
    city,
    id,
    neighborhood,
    user_id,
    phone,
    district,
  } = data;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: title,
      name: name,
      surname: surname,
      phone: phone,
      city: city,
      neighborhood: neighborhood,
      district: district,
      id: id,
      user_id: user_id,
    },
  });
  const formData = watch();
  const token = localStorage.getItem("token");
  const { MakeRequest, METHODS } = useAxios();

  const addressUpdateHandler = () => {
    MakeRequest({
      url: "/user/address",
      data: formData,
      method: METHODS.PUT,
      headers: {
        Authorization: token,
      },
    });

    toggle();

    setTimeout(() => {
      toast.success("Address başarıyla güncellendi");
    }, 1000);
  };

  const addressDeleteHandler = () => {
    axios
      .delete(
        `https://workintech-fe-ecommerce.onrender.com/user/address/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);

        toggle();

        toast.success("Adres başarıyla silindi");

        setTimeout(() => {}, 500);
      })
      .catch();
  };

  return (
    <>
      <div className={` cursor-pointer rounded-lg  flex flex-col  w-[100%] `}>
        <div className="flex gap-[0.5rem] w-full justify-between mb-[0.4rem]">
          <div className="flex gap-[0.4rem]">
            <p>{title}</p>
          </div>

          <button onClick={toggle} className="underline  decoration-solid">
            Düzenle
          </button>
        </div>

        <div
          onClick={() => onSelect(data)}
          className={`p-[1rem] flex flex-col border-1 border-solid border-gray-300 rounded-md  ${
            isSelected ? "border-2 border-solid border-yellow-500" : ""
          }`}
        >
          <div className="flex justify-between">
            <div className="flex items-center gap-[0.4rem]">
              <FontAwesomeIcon icon={faUser} style={{ color: "#f41a1a" }} />
              <p>{name}</p>
            </div>

            <div className="flex items-center gap-[0.4rem] ">
              <FontAwesomeIcon icon={faMobileScreenButton} />
              <p>{phone}</p>
            </div>
          </div>

          <p>{neighborhood}</p>
          <p>{city}</p>
        </div>

        <div className="">
          <Modal className="relative  " isOpen={modal} toggle={toggle}>
            <ModalBody>
              <form onSubmit={handleSubmit(addressUpdateHandler)}>
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
                    <p className="font-bold text-red-300">
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
                    <p className="font-bold text-red-300">
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
                    <p className="font-bold text-red-300">
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
                    <p className="font-bold text-red-300">
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
                    <p className="font-bold text-red-300">
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
                    <p className="font-bold text-red-300">
                      {errors.neighborhood.message}
                    </p>
                  )}
                </div>

                <div className="w-full flex items-center mt-[1.5rem] justify-between">
                  <button
                    className="btnBlueWithWhiteText  rounded-md"
                    type="submit"
                    disabled={!isValid}
                  >
                    Kaydet
                  </button>

                  <button
                    type="button"
                    onClick={addressDeleteHandler}
                    className="btnBlueWithWhiteText rounded-md bg-red-600"
                  >
                    {" "}
                    Sil
                  </button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </>
  );
}
