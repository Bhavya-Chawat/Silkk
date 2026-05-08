import { Navigate, Outlet, createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { useAppState } from "./state/AppState";
import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import HomeDecorPage from "./pages/HomeDecorPage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CreatorCollectionPage from "./pages/CreatorCollectionPage";
import ExplorePage from "./pages/ExplorePage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function RequireAuth() {
  const { authenticated } = useAppState();

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/app",
    Component: RequireAuth,
    children: [
      {
        Component: Layout,
        children: [
          { index: true, Component: HomePage },
          { path: "home-decor", Component: HomeDecorPage },
          { path: "products", Component: ProductListingPage },
          { path: "product/:id", Component: ProductDetailPage },
          { path: "cart", Component: CartPage },
          { path: "checkout", Component: CheckoutPage },
          { path: "creator/:handle", Component: CreatorCollectionPage },
          { path: "confirmation", Component: OrderConfirmationPage },
          { path: "explore", Component: ExplorePage },
          { path: "search", Component: SearchPage },
          { path: "wishlist", Component: WishlistPage },
          { path: "profile", Component: ProfilePage },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
