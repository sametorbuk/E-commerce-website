import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function PreviousOrder({ data }) {
  const [orderDetailArea, setOrderDetailArea] = useState(false);

  return (
    <div className="flex flex-col w-[80%]">
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
            Order dated {">"} {data.order_date.split("T")[0]}
          </p>
        </div>

        <div className="flex gap-[1rem]">
          <p className="font-bold">Price:</p>
          <p>{data.price} TL</p>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-800 ease-out flex gap-[1rem] w-full bg-gray-300 items-center justify-between px-[2.5rem] rounded-md`}
        style={{ maxHeight: orderDetailArea ? "500px" : "0px" }}
      >
        <div className="w-[70%] grid grid-cols-3 gap-4 p-[1rem]">
          {data.products.map((item, ind) => {
            console.log(item);
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
        <div className="w-[30%]">
          <h2>SAMET</h2>
        </div>
      </div>
    </div>
  );
}
