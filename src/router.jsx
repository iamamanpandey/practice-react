import { createBrowserRouter } from "react-router";
import App from "./pages/App";
import Slider from "./pages/Slider";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/slider",
    element: <Slider />,
  },
]);
