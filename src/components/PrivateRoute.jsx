import { Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function PrivateRoute({ children, ...rest }) {
  const localStorageToken = localStorage.getItem("token");
  const sessionStorageToken = sessionStorage.getItem("token");

  return (
    <>
      <Route
        {...rest}
        render={({ location }) =>
          localStorageToken || sessionStorageToken ? (
            children
          ) : (
            <>
              <Redirect
                to={{ pathname: "/login", state: { from: location } }}
              />
              {toast.warning("please log in first")}
            </>
          )
        }
      />
    </>
  );
}
