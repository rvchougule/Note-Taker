import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
  });
  const [accessToken, setAccessToken] = useState(false);

  useEffect(() => {
    setAccessToken(localStorage.getItem("access_token"));

    if (accessToken) {
      axios
        .post(
          "/user/refresh-token",
          {
            refreshToken: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(function (res) {
          console.log(res);
          localStorage.setItem("access_token", res.data.data.accessToken);
          localStorage.setItem("refresh_token", res.data.data.refreshToken);
          setAccessToken(res.data.data.accessToken);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.headers.common["Authorization"] = accessToken;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            accessToken ? (
              <Home
                user={user}
                setUser={setUser}
                setAccessToken={setAccessToken}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/login"
          element={
            !accessToken ? (
              <Login setAccessToken={setAccessToken} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        {/* <Route path='/createDocs/:docsId' element={isLoggedIn ? <CreateDocs /> : <Navigate to="/login"/>} /> */}
        <Route
          path="*"
          element={accessToken ? <Home /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
