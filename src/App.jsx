import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Link,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
// import { Main } from './components/Main'
import Community from "./components/Community";
import Main from "./components/Main";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";
import Assignments from "./pages/Assignments";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { useSelector, useDispatch } from "react-redux";
import { listenForAuthChanges } from "../src/redux/slices/authSlice";
import AdminPanel from "./pages/Admin";
import Hero from "./pages/layout/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./pages/Home";
import Filter from "./Testing/Filter";
import AdminLayout from "./pages/layout/AdminLayout";
const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const names = [
    {
      title: "DASHBOARD",
    },

    {
      title: "LESSONS",
    },

    {
      title: "ASSIGNMENT",
    },

    {
      title: "PROFILE",
    },
  ];
  const ProtectedRoute = () => {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  };

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [user]);

  return (
    <div>
      <Router>
        <Routes>
          {/* <Header/> */}
          <Route element={<Main />}>
            <Route path="/" element={<Home />} />
            <Route path="community" element={<Community />} />
            
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          
          <Route path="/reg" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<Hero />}>
              <Route
                path="lessons"
                element={<Lessons title={names[1].title} />}
              />
              <Route
                path="dash"
                index
                element={<Dashboard title={names[1].title} />}
              />
              <Route
                path="assignment"
                element={<Assignments title={names[2].title} />}
              />
              <Route
                path="profile/:id"
                element={<Profile title={names[3].title} />}
              />

              <Route
                path="logout"
                element={<Logout title={names[3].title} />}
              />
            </Route>
          
            <Route element={<AdminLayout/>}>

              <Route  path="/admin" element={<AdminPanel />} />
              <Route index path="/filter" element={<Filter />} />
            </Route>
          
          
          

          {user ? (
            <Route element={<Hero />}>
              <Route
                path="lessons"
                element={<Lessons title={names[1].title} />}
              />
              <Route
                path="dash"
                index
                element={<Dashboard title={names[1].title} />}
              />
              <Route
                path="assignment"
                element={<Assignments title={names[2].title} />}
              />
              <Route
                path="profile/:id"
                element={<Profile title={names[3].title} />}
              />

              <Route
                path="logout"
                element={<Logout title={names[3].title} />}
              />
            </Route>
          ) : (
            <Route
              path="*"
              element={
                <div className="flex flex-col  h-screen m-auto justify-center items-center rounded-lg bg-white shadow-md ">
                  <h1 className="text-3xl font-extrabold ">
                    404 User Not Found
                  </h1>
                  <h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4v2m0-6v2M2 7h16M7 17h7a2 2 0 002-2H7a2 2 0 00-2 2zm10 0h7a2 2 0 002-2h7a2 2 0 00-2 2z"
                      />
                    </svg>
                    <h1 className='font-bold text-xl text-amber-700' >Oops! You're not Logged in.</h1>
                  </h1>

                  <div className=" shadow-md mt-3 bg-slate-300 rounded-lg p-3 flex gap-4  justify-center items-center">
                    <h1>Please register or login to access this page</h1>
                    <Link
                      className="bg-blue-400 p-2 text-white rounded-md cursor-pointer  "
                      to="/reg"
                    >
                      Register
                    </Link>
                    <Link
                      className="bg-sky-400 text-white p-2 rounded-md cursor-pointer"
                      to="dash"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              }
            />
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
