import PropTypes from "prop-types";
import { Link, Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBookOpen,
  FaHouse,
  FaListCheck,
  FaMusic,
  FaRightFromBracket,
  FaUser,
} from "react-icons/fa6";
import logo from "../assets/logo.jpg";
import avatar from "../assets/reg-img.png";
import ThemeToggle from "./ThemeToggle";

const memberNavigation = [
  { label: "Dashboard", to: "/dash", icon: FaHouse, end: true },
  { label: "Lessons", to: "/lessons", icon: FaBookOpen },
  { label: "Assignments", to: "/assignment", icon: FaListCheck },
];

const adminNavigation = [
  { label: "Overview", to: "/filter", icon: FaHouse, end: true },
  { label: "Post content", to: "/admin", icon: FaMusic },
];

function PortalLayout({ admin = false }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (admin && user?.email !== "james@gmail.com" && user?.role !== "admin") {
    return <Navigate to="/dash" replace />;
  }

  const navigation = admin ? adminNavigation : memberNavigation;
  const pageTitle =
    location.pathname === "/admin"
      ? "Post content"
      : location.pathname === "/filter"
        ? "Admin overview"
        : location.pathname === "/lessons"
          ? "Lessons"
          : location.pathname === "/assignment"
            ? "Assignments"
            : location.pathname.startsWith("/profile/")
              ? "Your profile"
              : "Dashboard";

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-clip bg-[#0B0704] text-[#F5EBD8]">
      <header className="sticky top-0 z-40 border-b border-[#C9A24B]/25 bg-[#150B07]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img className="h-11 w-11 object-contain" src={logo} alt="" />
            <span className="font-display truncate text-lg font-semibold sm:text-xl">
              Old Mushin Youth Choir
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to={`/profile/${user?.uid}`}
              className="flex items-center gap-2 text-sm text-[#D9C9A8] transition-colors hover:text-[#C9A24B]"
            >
              <img
                src={user?.imageUrl || avatar}
                alt=""
                className="h-9 w-9 rounded-full border border-[#C9A24B]/40 object-cover"
              />
              <span className="hidden max-w-36 truncate sm:block">
                {user?.name || "Choir member"}
              </span>
            </Link>
            <Link
              to="/logout"
              aria-label="Sign out"
              title="Sign out"
              className="flex h-10 w-10 items-center justify-center border border-[#C9A24B]/35 text-[#C9A24B] transition-colors hover:bg-[#C9A24B]/10"
            >
              <FaRightFromBracket aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid min-h-[calc(100vh-76px)] w-full min-w-0 max-w-7xl md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="border-b border-[#C9A24B]/20 bg-[#0F0805] px-4 py-3 md:border-b-0 md:border-r md:px-4 md:py-8">
          <p className="hidden px-3 pb-4 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B6F3C] md:block">
            {admin ? "Administration" : "Choir portal"}
          </p>
          <nav
            aria-label={admin ? "Admin navigation" : "Member navigation"}
            className="flex gap-2 overflow-x-auto md:flex-col"
          >
            {navigation.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 border px-3 py-3 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors md:w-full ${
                    isActive
                      ? "border-[#C9A24B]/50 bg-[#C9A24B]/10 text-[#C9A24B]"
                      : "border-transparent text-[#B9A685] hover:border-[#C9A24B]/25 hover:text-[#F5EBD8]"
                  }`
                }
              >
                <Icon aria-hidden="true" className="shrink-0" />
                {label}
              </NavLink>
            ))}
            {!admin && (
              <NavLink
                to={`/profile/${user?.uid}`}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 border px-3 py-3 font-sans text-xs font-medium uppercase tracking-[0.1em] transition-colors md:w-full ${
                    isActive
                      ? "border-[#C9A24B]/50 bg-[#C9A24B]/10 text-[#C9A24B]"
                      : "border-transparent text-[#B9A685] hover:border-[#C9A24B]/25 hover:text-[#F5EBD8]"
                  }`
                }
              >
                <FaUser aria-hidden="true" />
                Profile
              </NavLink>
            )}
          </nav>
        </aside>

        <main className="w-full min-w-0 overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
          <div className="mb-7 border-b border-[#C9A24B]/20 pb-5">
            <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#8B6F3C]">
              {admin ? "Choir management" : `Welcome${user?.name ? `, ${user.name}` : ""}`}
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
              {pageTitle}
            </h1>
            {!admin && user?.grade && (
              <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-[#B9A685]">
                {user.grade}
              </p>
            )}
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;

PortalLayout.propTypes = {
  admin: PropTypes.bool,
};
