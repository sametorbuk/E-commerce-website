import { faCaretDown, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export default function PreviousOrder({ data }) {
  const [orderDetailArea, setOrderDetailArea] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = orderDetailArea
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [orderDetailArea]);

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
        ref={contentRef}
        className={`overflow-hidden transition-all duration-600 ease-out flex gap-[1rem] w-full bg-gray-300 items-center justify-between px-[2.5rem] rounded-md`}
        style={{ height: "0px" }}
      >
        <div className="w-[50%] grid grid-cols-3 gap-4">
          {data.products.map((item, ind) => (
            <img src={item.images[0].url} alt="" key={ind} />
          ))}
        </div>
        <div className="w-[50%]"></div>
      </div>
    </div>
  );
}
