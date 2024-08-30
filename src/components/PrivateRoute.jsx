import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const value = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        value ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
