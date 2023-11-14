import CartProvider from "./store/CartProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import SearchPage from "./components/pages/SearchPage";

function App() {

    const router = createBrowserRouter([
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/:search',
        element: <SearchPage />
      }
    ])

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
