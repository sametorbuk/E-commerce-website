import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </>
  );
}

export default App;
