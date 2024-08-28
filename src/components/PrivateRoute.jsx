import { Route, Redirect } from 'react-router-dom';


export default function PrivateRoute({ children, ...rest }) {
  const value  = JSON.parse(localStorage.getItem("token"))

  return (
    <Route
      {...rest}
      render={({ location }) =>
        value ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
} 