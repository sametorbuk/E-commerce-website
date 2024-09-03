import axios from "axios";
import { useState } from "react";

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
      data ? data : null,
      headers !== null ? { headers } : null
    )
      .then((response) => {
        setData(response.data);
        setLoading(false);
        return response.data;
      })
      .catch((err) => {
        setError(err);
        if (url === "/verify") {
          localStorage.removeItem("token");
        }
        return err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, MakeRequest, METHODS, loading, error, setData, setLoading };
}
