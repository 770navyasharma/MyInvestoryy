import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from '../pages/Homepage'
import Personalized from "../pages/Personalized";
import Questions from "../pages/Questions";
import FinalPage from "../pages/FinalPage";
import StartAgain from "../pages/StartAgain";
import NotFound from "../pages/NotFound";
import RealEstate from "../pages/RealEstate";
import PropertyDetails from "../pages/PropertyDetails";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/personalize",
        element: <Personalized />
      },
      {
        path: "/quiz",
        element: <Questions />
      },
      {
        path: "/thank-you",
        element: <FinalPage />
      },
      {
        path: "/again",
        element: <StartAgain />
      },
      {
        path: "/real-estate",
        element: <RealEstate />
      },
      {
        path: "/property/:slug", // ✅ Dynamic route for property details
        element: <PropertyDetails />
      },
      {
        path: "*", // Catch-all route should be at the bottom
        element: <NotFound />
      }
    ]
  }
]);


export default Router;