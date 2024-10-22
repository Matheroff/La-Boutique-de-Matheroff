import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import myAxios from "./services/myAxios";
import Admin from "./pages/Admin";
import Apropos from "./pages/Apropos";
import Cart from "./pages/Cart";
import CategoriesList from "./pages/CategoriesList";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Home from "./pages/Home";
import InfosPerso from "./pages/InfosPerso";
import ItemDetail from "./pages/ItemDetail";
import ItemsList from "./pages/ItemsList";
import Login from "./components/Login";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Themes from "./pages/ThemesList";
import UserProfile from "./pages/UserProfile";
import UsersList from "./pages/UsersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    loader: async () => {
      const response = await myAxios.get("/api/items");

      return response.data;
    },
    children: [
      {
        path: "/",
        element: <Home />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          return [response.data, responsecat.data, responsethe.data];
        },
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/apropos",
        element: <Apropos />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/categories",
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
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/infosperso",
        element: <InfosPerso />,
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
        path: "/items",
        element: <ItemsList />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          return [response.data, responsecat.data, responsethe.data];
        },
        action: async ({ request, params }) => {
          const formData = await request.formData();

          switch (request.method.toLowerCase()) {

            case "post": {
              console.info('-------POST---------')
              const name = formData.get("name");
              const description = formData.get("description");
              const image = formData.get("image");
              const unitprice = formData.get("unit_price");
              const category = formData.get("category");
              const theme = formData.get("theme");

              const response = await myAxios.post("/api/items", { name, description, image, "unit_price":unitprice, "id_category":category, "id_theme":theme });

              return redirect(`/items/${response.data.insertId}`);
            }

            case "put": {
              console.info('-------PUT---------')
              await myAxios.put(`/api/items/${params.id}`, {
                name: formData.get("name"),
                description : formData.get("description"),
                image : formData.get("image"),
                unitprice : formData.get("unit_price"),
                category : formData.get("category"),
                theme : formData.get("theme")
              });

              return redirect(`/item/${params.id}`);
            }

            case "delete": {
              await myAxios.delete(`/api/items/${params.id}`);

              return redirect("/items");
            }

            default:
              throw new Response("", { status: 405 });
          }
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/shop",
        element: <Shop />,
        loader: async () => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          return [response.data, responsecat.data, responsethe.data];
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
        path: "/shop/category/:categoryId",
        element: <Shop />,
        loader: async ({ params }) => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          const categoryId = `${params.categoryId}`
          if (categoryId) {
            response.data = response.data.filter((item) => item.id_category === categoryId)
          }
          
          return [ response.data, responsecat.data, responsethe.data];
        },
      },
      {
        path: "/shop/theme/:themeId",
        element: <Shop />,
        loader: async ({ params }) => {
          const response = await myAxios.get("/api/items");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");

          const themeId = `${params.themeId}`
          if (themeId) {
            response.data = response.data.filter((item) => item.id_theme === themeId)
          }
          
          return [ response.data, responsecat.data, responsethe.data];
        },
      },
      {
        path: "/shop/search/:searchTerm",
        element: <Shop />,
        loader: async ({ params }) => {
          const response = await myAxios.get("/api/items");
          const responsecategories = await myAxios.get("/api/categories");
          const responsethemes = await myAxios.get("/api/themes");

          const searchTerm = `${params.searchTerm}`
          if (searchTerm) {
            // includes permet de voir si le string est contenu dans le nom de l'item
            response.data = response.data.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
          }

          return [ response.data, responsecategories.data, responsethemes.data];
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
        path: "/users",
        element: <UsersList />,
      },
      {
        path: "/userprofile",
        element: <UserProfile />,
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
