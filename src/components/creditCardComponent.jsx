import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCreditCards } from "../redux/clientSlice";
import { useForm } from "react-hook-form";

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

const currentYear = new Date().getFullYear();
const years = [];
for (let i = 0; i <= 10; i++) {
  years.push(currentYear + i);
}

export default function CreditCard({ data, isSelected, setSelectedCard }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const { expire_month, expire_year, card_no, name_on_card, id, user_id } =
    data;
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { creditCards } = useSelector((state) => state.client);

  const toggle = (e) => {
    setModal(!modal);
    const { id } = e.target;

    if (id === "deleteBtn") {
      setDeleteModal(!deleteModal);
    } else {
      setUpdateModal(!updateModal);
    }
  };

  useEffect(() => {
    if (modal === false) {
      setDeleteModal(false);
      setUpdateModal(false);
    }
  }, [modal]);
  const token = localStorage.getItem("token");

  const deleteCardHandler = () => {
    axios
      .delete(`https://workintech-fe-ecommerce.onrender.com/user/card/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const newState = creditCards.filter((card) => card.id !== id);
        console.log(res.data);
        toast.success("Card successfully deleted");
        dispatch(setCreditCards(newState));
      })
      .catch((err) => {
        toast.warning(err);
      });
    toggle();
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      expire_month: expire_month,
      expire_year: expire_year,
      card_no: card_no,
      name_on_card: name_on_card,
      id: id,
      user_id: user_id,
    },
    mode: "all",
  });
  const formData = watch();
  console.log(formData);

  const onSubmit = () => {
    axios
      .put(`https://workintech-fe-ecommerce.onrender.com/user/card`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Card successfully updated");
      })
      .catch((err) => {
        toast.warning(err);
      });
    toggle();
  };

  return (
    <>
      <div className="flex flex-col mt-[2rem]">
        <div className="flex w-full gap-[10rem]">
          <button
            id="deleteBtn"
            onClick={toggle}
            className="bg-red-500 mb-[0.2rem] font-bold rounded-md w-[4rem] h-[2rem] text-white"
          >
            Delete
          </button>
          <button
            id="updateBtn"
            onClick={toggle}
            className="bg-sky-500 mb-[0.2rem] font-bold rounded-md w-[4rem] h-[2rem] text-white"
          >
            Update
          </button>
        </div>

        <div
          onClick={() => setSelectedCard(data)}
          className={` cursor-pointer p-[1rem] px-[1.5rem] w-[18rem] flex flex-col gap-[1.5rem]
           border-2 border-solid border-blue-600 ${
             isSelected
               ? "border-3 border-solid border-blue-600"
               : "border-2 border-solid border-gray-600"
           } rounded-lg`}
        >
          <p className="font-bold text-xl">Credit Card</p>
          <p className="text-blue-500">{card_no}</p>

          <div className="flex w-full justify-between">
            <p className="text-red-500">{name_on_card}</p>

            <div className="flex text-green-600">
              <p>{expire_month}</p>
              <p>/</p>
              <p>{expire_year}</p>
            </div>
          </div>
        </div>
        <div>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalBody>
              {deleteModal && (
                <p>
                  Are you sure you want to delete this card from your records?
                </p>
              )}
              {updateModal && (
                <>
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
                      </div>
                    </div>

                    <div className="w-full flex justify-around mt-[5rem]">
                      <button
                        type="submit"
                        disabled={!isValid}
                        className="btnBlueWithWhiteText rounded-md h-[2rem] "
                      >
                        Saved
                      </button>{" "}
                      <button
                        className="btnBlueWithWhiteText bg-red-500 rounded-md h-[2rem]"
                        onClick={toggle}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </>
              )}
            </ModalBody>

            {deleteModal && (
              <ModalFooter className="w-full flex justify-around">
                <>
                  <button
                    className="btnBlueWithWhiteText w-[5rem] h-[2rem] rounded-md"
                    onClick={deleteCardHandler}
                  >
                    Delete
                  </button>{" "}
                  <button
                    className="btnBlueWithWhiteText bg-red-500  w-[5rem] h-[2rem] rounded-md"
                    onClick={toggle}
                  >
                    Cancel
                  </button>
                </>
              </ModalFooter>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
}
