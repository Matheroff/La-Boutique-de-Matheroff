import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import myAxios from "./services/myAxios";
import Apropos from "./pages/Apropos";
import Cart from "./pages/Cart";
import CategoriesList from "./pages/CategoriesList";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import Home from "./pages/Home";
import InfosPerso from "./pages/InfosPerso";
import ItemDetail from "./pages/ItemDetail";
import ItemsList from "./pages/ItemsList";
import Login from "./components/Login";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import OrderDetailAdmin from "./pages/OrderDetailAdmin";
import OrdersList from "./pages/OrdersList";
import Register from "./components/Register";
import Shop from "./pages/Shop";
import ThankYouForOrder from "./pages/ThankYouForOrder";
import Themes from "./pages/ThemesList";
import UserProfile from "./pages/UserProfile";
import UsersList from "./pages/UsersList";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    loader: async () => {
      const response = await myAxios.get("/api/items");
      const responseUsers = await myAxios.get("/api/users");

      return [response.data, responseUsers.data];
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
        path: "/apropos",
        element: <Apropos />,
      },
      {
        path: "/cart",
        element: <Cart />,
        loader: async () => {
          const responsecart = await myAxios.get("/api/carts");
          const responseitem = await myAxios.get("/api/items");

          return [responsecart.data, responseitem.data];
        },
      },
      {
        path: "/categories",
        element: <ProtectedRoute
          element={<CategoriesList />}
        />,
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
        path: "/dashboard",
        element: (
          <ProtectedRoute
            element={<Dashboard />}
          />
        ),
        loader: async () => {
          const response = await myAxios.get("/api/orders");
          const responseus = await myAxios.get("/api/users");
          const responsecat = await myAxios.get("/api/categories");
          const responsethe = await myAxios.get("/api/themes");
          const responseit = await myAxios.get("/api/items");

          return [response.data, responseus.data, responsecat.data, responsethe.data, responseit.data];
        },
      },
      {
        path: "/favorites",
        element: <Favorites />,
        loader: async () => {
          const responsefav = await myAxios.get("/api/favorites");
          const responseitem = await myAxios.get("/api/items");

          return [responsefav.data, responseitem.data];
        },
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
          const responseall = await myAxios.get("/api/items");
          const responsecart = await myAxios.get("/api/carts");
          const responsefav = await myAxios.get("/api/favorites");
          
          const currentItem = response.data; // L'article actuellement affiché
          const currentItemName = currentItem.name.toLowerCase(); // Nom de l'article affiché

          // Filtrer les articles dont le nom contient un mot similaire
          const filteredItems = responseall.data.filter((item) => {
            const itemName = item.name.toLowerCase();
            const wordsInName = currentItemName.split(" "); // Découpe le nom en mots clés

            // Vérifie si l'un des mots du nom de l'article est contenu dans le nom des autres articles
            return wordsInName.some((word) => itemName.includes(word)) && item.id !== currentItem.id;
          });

          return [response.data, filteredItems, responsecart.data, responsefav.data];
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const image = formData.get("image");
          const name = formData.get("name");
          const unitPrice = formData.get("unit_price")
          const description = formData.get("description");

          const response = await myAxios.post("/api/items/:id", { image, name, "unit_price":unitPrice, description });

          return redirect(`/itemdetail/${response.data.insertId}`);
        },
      },
      {
        path: "/items",
        element: <ProtectedRoute
          element={<ItemsList />}
        />,
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
        loader: async () => {
          const response = await myAxios.get("/api/orders");

          return response.data;
        },
      },
      {
        path: "/orderdetail/:id",
        element: <OrderDetail />,
        loader: async ({params}) => {
          const responseOrder = await myAxios.get(`/api/orders/${params.id}`);
          const responseUserOrder = await myAxios.get("/api/userorders");
          const responseItem = await myAxios.get("/api/items");

          const idOrder = `${params.id}`
          if (idOrder) {
            // Filtre sur user_orders avec le params.id = id_order
            responseUserOrder.data = responseUserOrder.data.filter((userOrder) => userOrder.id_order == idOrder);

            // Filtre les items à partir des id_item présents dans responseuo.data
            responseItem.data = responseItem.data.filter((item) =>
            responseUserOrder.data.some((userOrder) => String(userOrder.id_item) === String(item.id)) // Forcer la comparaison en chaîne de caractères
            );
          }

          return [responseOrder.data, responseUserOrder.data, responseItem.data];
        },
      },
      {
        path: "/orderdetailadmin/:id",
        element: <ProtectedRoute
          element={<OrderDetailAdmin />}
        />,
        loader: async ({params}) => {
          const responseOrder = await myAxios.get(`/api/orders/${params.id}`);
          const responseUserOrder = await myAxios.get("/api/userorders");
          const responseItem = await myAxios.get("/api/items");

          const idOrder = `${params.id}`
          if (idOrder) {
            // Filtre sur user_orders avec le params.id = id_order
            responseUserOrder.data = responseUserOrder.data.filter((userOrder) => userOrder.id_order == idOrder);

            // Filtre les items à partir des id_item présents dans responseuo.data
            responseItem.data = responseItem.data.filter((item) =>
            responseUserOrder.data.some((userOrder) => String(userOrder.id_item) === String(item.id)) // Forcer la comparaison en chaîne de caractères
            );
          }

          return [responseOrder.data, responseUserOrder.data, responseItem.data];
        },
      },
      {
        path: "/orderslist",
        element: <ProtectedRoute
          element={<OrdersList />}
        />,
        loader: async () => {
          const response = await myAxios.get("/api/orders");
          const responseus = await myAxios.get("/api/users");

          return [response.data, responseus.data];
        },
      },
      {
        path: "/register",
        element: <Register />,
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
            response.data = response.data.filter((item) => item.id_category == categoryId)
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
            response.data = response.data.filter((item) => item.id_theme == themeId)
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
        path: "/thankyoufororder",
        element: <ThankYouForOrder />,
      },
      {
        path: "/themes",
        element: <ProtectedRoute
          element={<Themes />}
        />,
        loader: async () => {
          const response = await myAxios.get("/api/themes");

          return response.data;
        },
        action: async ({ request }) => {
          const formData = await request.formData();

          const name = formData.get("name");

          const response = await myAxios.post("/api/themes", { name });

          return redirect(`/themes/${response.data.insertId}`);
        },
      },
      {
        path: "/users",
        element: <ProtectedRoute
          element={<UsersList />}
        />,
        loader: async () => {
          const response = await myAxios.get("/api/users");
          
          return response.data;
        },
      },
      {
        path: "/userprofile/:id",
        element: <UserProfile />,
        loader: async ({ params }) => {
          const response = await myAxios.get(`/api/users/${params.id}`);
          
          return response.data;
        },
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
