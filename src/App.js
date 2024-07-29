import { Home } from "./components/Home";
import { LoginModule } from "./components/LoginModule";
import { NavBar } from "./components/NavBar";
import { UserDashBoard } from "./components/userDashBoard";
import { ForgotPass } from "./components/ForgotPass";
import { UserProtection } from "./protected routes/UserProtection";
import { AdminDashBoard } from "./admin/AdminDashBoard";
import { AdminProtection } from "./protected routes/AdminProtection";
import { Navigation } from './admin/Navigation';
import { Categories } from "./admin/Categories";
import MyOrders from "./components/MyOrders";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { RegisterComponent } from "./components/RegisterComponent";
import { Products } from "./admin/Products";
import ProductsDisplayer from "./admin/ProductsDisplayer";
import UpdateProducts from "./admin/UpdateProducts";
import ProductDetails from "./components/ProductDetails";
import PaymentTest from "./components/PaymentTest";
import SearchResults from "./components/SearchResults";
import BillingDetails from "./components/BillingDetails";
import CanceledItems from "./components/CanceledItems";
import PaymentMethods from "./components/PaymentMethods";
import GoogleSignInSuccess from "./components/GoogleSignInSuccess";
import RateProduct from "./components/RateProduct";

//google oauth imports

const router = createBrowserRouter([
  {
    path: "/",
    element: <>
      <NavBar />
      <Home />
    </>
  },
  {
    path: "/:email",
    element: <>
      <NavBar />
      <Home />
    </>
  },
  {
    path: "/login",
    element: <><NavBar /><LoginModule /></>
  },
  {
    path: "/register",
    element: <><NavBar /><RegisterComponent /></>
  },
  {
    path: "/forgot",
    element: <><NavBar /><ForgotPass /></>
  },
  {
    path: "/dashboard/user",
    element: (
      <>
        <NavBar />
        <UserProtection />
      </>
    )
  }
  ,
  {
    path: "/dashboard/admin",
    element: (
      <>
        <NavBar />
        <AdminProtection />
      </>
    )
  },

  {
    path: "/products",
    element: (
      <>
        <NavBar />
        <ProductsDisplayer />
        <Navigation />
      </>
    )
  },
  {
    path: "/categories",
    element: (
      <>
        <NavBar />
        <Categories />
        <Navigation />
      </>
    )
  },
  {
    path: "/create-product",
    element: (<>
      <NavBar />
      <Products />
      <Navigation />
    </>)
  },
  {
    path: "/update/:id",
    element: (<>
      <NavBar />
      <UpdateProducts />
      <Navigation />
    </>)
  },
  {
    path: "/product-details/:id",
    element: (
      <>
        <NavBar />
        <ProductDetails />
      </>
    )
  },
  {
    path: "/payment-test/:id",
    element: (
      <>
        <NavBar />
        <PaymentTest />
      </>

    )
  },
  {
    path: "/search",
    element: (
      <>
        <NavBar />
        <SearchResults />
      </>
    )
  },
  {
    path: "/billing-details/:id/:quantity",
    element: (
      <>
        <NavBar />
        <BillingDetails />
      </>
    )
  },
  {
    path: "/my-orders",
    element: (
      <>
        <NavBar />
        <MyOrders />
      </>
    )
  },
  {
    path: "/cancelled-items",
    element: (
      <>
        <NavBar />
        <CanceledItems />
      </>
    )
  },
  {
    path: "/payment-methods",
    element: (
      <>
        <NavBar />
        <PaymentMethods />
      </>
    )
  },
  {
    path: "/success",
    element: (
      <>
        <GoogleSignInSuccess />
      </>
    )
  },
  {
    path: "/rate-product/:id",
    element: (
      <>
        <NavBar />
        <RateProduct />
      </>
    )
  }
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

export default App;
