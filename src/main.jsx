import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { MovieProvider } from "./context/moviecontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieProvider>
      <App />
    </MovieProvider>
  </BrowserRouter>
);
