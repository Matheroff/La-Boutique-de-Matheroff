import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import myAxios from "./services/myAxios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import InfosPerso from "./pages/InfosPerso";
import Orders from "./pages/Orders";
import Apropos from "./pages/Apropos";
import Admin from "./pages/Admin";
import CategoriesList from "./pages/CategoriesList";
import Themes from "./pages/Themes";
import ThemeDetails from "./pages/ThemeDetails";
import ThemeEdit from "./components/ThemeEdit";
import ItemsList from "./pages/ItemsList";
import UsersList from "./pages/UsersList";
import Favorites from "./pages/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");

          return [response.data, responsecat.data];
        },
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");

          return [response.data, responsecat.data];
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const name = formData.get("name");
          const image = formData.get("image");

          const response = await myAxios.post("/api/items", { name, image });

          return redirect(`/shop/${response.data.insertId}`);
        },
      },
      {
        path: "/shop/:categoryId",
        element: <Shop />,
        loader: async ({ params }) => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");

          const categoryId = `${params.categoryId}`
          if (categoryId) {
            response.data = response.data.filter((item) => item.id_category == categoryId)
          }
          
          return [ response.data, responsecat.data];
        },
      },
      {
        path: "/item/:id",
        element: <ItemDetail />,
        loader: async ({ params }) => {
          const response = await myAxios.get(`/api/items/${params.id}`);

          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const image = formData.get("image");
          const name = formData.get("name");
          const unitPrice = formData.get("unit_price")
          const description = formData.get("description");
          console.info(image);
          console.info(name);
          console.info(unitPrice);
          console.info(description);

          const response = await myAxios.post("/api/items/:id", { image, name, "unit_price":unitPrice, description });

          return redirect(`/itemdetail/${response.data.insertId}`);
        },
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
      },
      {
        path: "/infosperso",
        element: <InfosPerso />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/apropos",
        element: <Apropos />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/categorieslist",
        element: <CategoriesList />,
        loader: async () => {
          const response = await myAxios.get("/api/categories");

          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await myAxios.put(`/api/categories/${params.id}`, {
                name: formData.get("name"),
              });

              return redirect(`/categories/${params.id}`);
            }
            case "delete": {
              await myAxios.delete(`/api/categories/${params.id}`);

              return redirect("/categories");
            }
            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/themes",
        element: <Themes />,
        loader: async () => {
          const response = await myAxios.get("/api/themes");

          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const name = formData.get("name");
          console.info(name);

          const response = await myAxios.post("/api/themes", { name });

          return redirect(`/themes/${response.data.insertId}`);
        },
      },
      {
        path: "/themes/:id",
        element: <ThemeDetails />,
        loader: async ({ params }) => {
          const response = await myAxios.get(`/api/themes/${params.id}`);

          return response.data;
        },
      },
      {
        path: "/themes/:id/edit",
        element: <ThemeEdit />,
        loader: async ({ params }) => {
          const response = await myAxios.get(`/api/themes/${params.id}`);

          return response.data;
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {
            case "put": {
              await myAxios.put(`/api/themes/${params.id}`, {
                name: formData.get("name"),
              });

              return redirect(`/themes/${params.id}`);
            }
            case "delete": {
              await myAxios.delete(`/api/themes/${params.id}`);

              return redirect("/themes");
            }
            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/items",
        element: <ItemsList />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          return [response.data, responsecat.data, responsethe.data];
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const name = formData.get("name");
          const description = formData.get("description");
          const image = formData.get("image");
          const unitprice = formData.get("unit_price");
          const category = formData.get("category");
          const theme = formData.get("theme");

          const response = await myAxios.post("/api/items", { name, description, image, "unit_price":unitprice, "id_category":category, "id_theme":theme });
          console.info(response);

          return redirect(`/items/${response.data.insertId}`);
        },
      },
      {
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
