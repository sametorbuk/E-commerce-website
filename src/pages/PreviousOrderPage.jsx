import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Footer from "../layouts/footer";
import Header from "../layouts/header";
import axios from "axios";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        console.log(res.data);
        setPreviousOrdersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />

      <main className="flex flex-col  md:flex md:flex-row  justify-center  md:px-[5rem] ">
        {previousOrdersData.length !== 0 && (
          <PreviousOrder data={previousOrdersData[0]} />
        )}

        {previousOrdersData.length === 0 && (
          <h2 className="text-4xl font-bold">There is no order</h2>
        )}
      </main>

      <Footer />
    </>
  );
}
