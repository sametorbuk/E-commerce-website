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
  const [err, setErr] = useState(false);

  const instance = axios.create({
    baseURL: " https://workintech-fe-ecommerce.onrender.com",
    timeout: 1000,
    headers: { Autoauthentication: "" },
  });

  const MakeRequest = ({ url = null, method, data = null }) => {
    setLoading(true);

    instance[method](url ? url : null, data ? data : null)
      .then((response) => {
        setData(response.data);

        setLoading(false);
        return response.data;
      })
      .catch((err) => {
        setErr(!err);
      });
  };

  return { data, MakeRequest, setData, METHODS, loading };
}
