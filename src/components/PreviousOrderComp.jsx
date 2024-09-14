import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PreviousOrder(props) {
  const [orderDetailArea, setOrderDetailArea] = useState(false);
  const { data } = props;
  console.log("samet");
  return (
    <div className="flex   flex-col w-[90%] border border-1 border-black rounded-md">
      <div
        onClick={() => setOrderDetailArea(!orderDetailArea)}
        className="flex gap-[1rem] w-full h-[2.5rem] bg-gray-300 items-center justify-between px-[2.5rem] rounded-md cursor-pointer"
      >
        <div className="flex gap-[1rem]">
          {!orderDetailArea ? (
            <FontAwesomeIcon className="text-2xl" icon={faCaretRight} />
          ) : (
            <FontAwesomeIcon className="text-2xl" icon={faCaretDown} />
          )}

          <p>
            Order date {">"} {data.order_date.split("T")[0]}
          </p>
        </div>

        <div className="flex gap-[1rem]">
          <p className="font-bold">Price:</p>
          <p className="font-bold">{data.price} TL</p>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-800 ease-out flex gap-[1rem] w-full bg-gray-300 items-center justify-between px-[2.5rem] rounded-md`}
        style={{ maxHeight: orderDetailArea ? "1000px" : "0px" }}
      >
        <div className="w-[100%]   md:w-[70%] grid grid-cols-3 gap-4 p-[1rem]">
          {data.products.map((item, ind) => {
            return (
              <div key={ind} className="flex gap-[0.5rem] flex-col">
                <img src={item.images[0].url} alt="" />
                <p className="text-center mt-[0.5rem]">{item.description}</p>
                <div className="flex w-full justify-center gap-[0.5rem]">
                  <p className="font-bold">Count:</p>
                  <p>{item.count}</p>
                </div>
                <div className="flex w-full justify-center gap-[0.5rem]">
                  <p className="font-bold">Price:</p>
                  <p>{item.price} ₺</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className=" w-[0%]    md:w-[30%]">
          <div
            className={` cursor-pointer hidden md:flex p-[1rem] px-[1.5rem] w-[18rem] flex flex-col gap-[1.5rem]
           border-2 border-solid border-blue-600 ${"border-3 border-solid border-blue-600"} rounded-lg`}
          >
            <p className="font-bold text-xl">Credit Card</p>
            <p className="text-blue-500">{data.card_no}</p>

            <div className="flex w-full justify-between">
              <p className="text-red-500">{data.card_name}</p>

              <div className="flex text-green-600">
                <p>{data.card_expire_month}</p>
                <p>/</p>
                <p>{data.card_expire_year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
