import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import themeRTL from "assets/theme/theme-rtl";
import routes from "routes";
import brand from "assets/images/logos/logohalf.png";
import { useSoftUIController, setUser, setMiniSidenav, setLoading } from "context";
import Sidenav from "examples/Sidenav";
import Loading from "layouts/loading";
import ApiClient from "Services/ApiClient";
import { ToastContainer, toast } from "react-toastify";
import { startLoading } from "context";
import { getAdminById } from "Services/endpointes";
import { getAllUsers } from "Services/endpointes";
import { setUsers } from "context";
import { getProducts } from "Services/endpointes";
import { setProducts } from "context";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor, user } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  let userId, authToken;
  function getCookie() {
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith("id" + "=")) {
        userId = cookie.substring(String("id").length + 1);
      } else if (cookie.startsWith("authToken" + "=")) {
        authToken = cookie.substring(String("authToken").length + 1);
      }
    }
    if (userId && authToken && user.id) {
      return true;
    } else {
      return false;
    }
  }
  async function getUser() {
    try {
      startLoading(dispatch, true);
      const response = await ApiClient.getData(`${getAdminById}/${userId}`);
      if (response.status === 200) {
        setUser(dispatch, response?.data);
        const users = await ApiClient.getData(getAllUsers);
        if (users.status == 200) {
          console.log(users, "usersssss");
          setUsers(dispatch, users.data);
          const temples = await ApiClient.getData(getProducts);
          if (temples.status == 200) {
            setProducts(dispatch, temples.data);
          }
        }
      } else {
        setLoading(dispatch, false);
      }
    } catch (error) {
      toast.success(error.toString());
      setLoading(dispatch, false);
    }
  }
  useEffect(() => {
    if (!getCookie()) {
      getUser();
    }

    // Scroll to the top of the page
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  return (
    <ThemeProvider theme={themeRTL}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <CssBaseline />
      {user.id && (
        <>
          {/* Render Sidenav and Configurator */}
          <Sidenav
            color={sidenavColor}
            brand={brand}
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Routes>
        {routes.map((route) => {
          if (getCookie() && route.auth !== null) {
            if (route.auth === user.type || route.auth === "any" || route.auth === "admin") {
              return (
                <Route
                  exact
                  path={route.route}
                  element={<Suspense fallback={<Loading />}>{route.component} </Suspense>}
                  key={`${route.key}-${route.route}`}
                />
              );
            }
          } else if (!getCookie() && route.auth === null) {
            return (
              <Route
                exact
                path={route.route}
                element={<Suspense fallback={<Loading />}>{route.component} </Suspense>}
                key={`${route.key}-${route.route}`}
              />
            );
          }

          return null;
        })}
        {!getCookie() ? (
          <Route path="/*" element={<Navigate to="/" />} />
        ) : (
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        )}
      </Routes>
    </ThemeProvider>
  );
}
