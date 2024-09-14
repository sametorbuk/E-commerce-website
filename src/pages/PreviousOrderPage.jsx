import { useEffect, useState } from "react";

import Footer from "../layouts/footer";
import Header from "../layouts/header";
import axios from "axios";

import PreviousOrder from "../components/PreviousOrderComp";

export default function PreviousOrderPage() {
  const [previousOrdersData, setPreviousOrdersData] = useState([]);

  const token =
    localStorage.getItem("token") === null
      ? sessionStorage.getItem("token")
      : localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://workintech-fe-ecommerce.onrender.com/order", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPreviousOrdersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(previousOrdersData);

  return (
    <>
      <Header />

      <main className="flex flex-col mt-[2rem]  md:flex md:flex-row   justify-center  md:px-[5rem] ">
        {previousOrdersData.length === 0 && (
          <h2 className="text-4xl font-bold">There is no order</h2>
        )}{" "}
        <div
          className={`flex flex-col w-full justify-center items-center ${
            previousOrdersData.length == 0 ? "hidden" : "flex"
          }`}
        >
          {previousOrdersData.map((item, ind) => {
            return <PreviousOrder data={item} key={ind} />;
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
