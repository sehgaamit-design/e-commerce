import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ShopContextProvider } from "./components/Context/ShopContext.jsx";

createRoot(document.getElementById("root")).render(
  <ShopContextProvider>
    <App />
  </ShopContextProvider>,
);
