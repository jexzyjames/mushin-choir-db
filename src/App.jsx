import { useEffect } from "react";
import {
  HashRouter as Router,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Main from "./components/Main";
import AdminPanel from "./pages/Admin";
import Assignments from "./pages/Assignments";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Filter from "./Testing/Filter";
import AdminLayout from "./pages/layout/AdminLayout";
import Hero from "./pages/layout/Hero";
import { listenForAuthChanges } from "./redux/slices/authSlice";

function RequireAuth() {
  const { user, authReady } = useSelector((state) => state.auth);

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0B0704] text-[#D9C9A8]">
        Checking your session…
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0704] px-5 text-center text-[#F5EBD8]">
      <div className="max-w-lg">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#C9A24B]">
          Old Mushin Youth Choir
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[#B9A685]">
          The page may have moved, or the address may be incorrect.
        </p>
        <Link
          className="mt-7 inline-flex border border-[#C9A24B] px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#150B07]"
          to="/"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = dispatch(listenForAuthChanges());
    return unsubscribe;
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAuth />}>
          <Route element={<Hero />}>
            <Route path="dash" element={<Dashboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="assignment" element={<Assignments />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="filter" element={<Filter />} />
            <Route path="admin" element={<AdminPanel />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
