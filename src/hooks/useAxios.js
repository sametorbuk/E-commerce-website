import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const METHODS = {
  PUT: "put",
  GET: "get",
  POST: "post",
  DELETE: "delete",
};

export default function useAxios() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

  const instance = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
    timeout: 1000,
    headers: { Authorization: "" },
  });

  const MakeRequest = ({ url, method, data = null, headers = {} }) => {
    setLoading(true);
    setError(null);

    return instance[method](
      url,
      data ? data : "",
      headers !== null ? { headers } : null
    )
      .then((response) => {
        setData(response.data);
        setLoading(false);

        if (url === "/order") {
          toast.success("Your order has been successfully received");
          localStorage.removeItem("cart");
          localStorage.removeItem("selectedAddress");
          localStorage.removeItem("addressAndContractCompleted");

          setTimeout(() => {
            toast.info("You are redirected to the homepage");
          }, 1500);

          setTimeout(() => {
            history.push("/");
          }, 3000);

          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }

        return response.data;
      })
      .catch((err) => {
        setError(err);
        if (url === "/verify") {
          localStorage.removeItem("token");
        }

        toast.warning(err);
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, MakeRequest, METHODS, loading, error, setData, setLoading };
}
