import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaAlignLeft, FaRegAddressCard, FaTimes, FaUser } from "react-icons/fa";
import logo from "../assets/logo.jpg";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { label: "Home", id: "home" },
  { label: "Programs", id: "programs" },
  { label: "Announcements", id: "announcements" },
  { label: "About", id: "about" },
  { label: "Leadership", id: "leadership" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const closeMenu = () => setIsOpen(false);
  const scrollToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#C9A24B]/25 bg-[#150B07]/95 text-[#F5EBD8] shadow-lg shadow-black/10 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between px-5">
        <Link
          className="flex items-center gap-3"
          to="/"
          aria-label="Old Mushin Youth Choir home"
          onClick={closeMenu}
        >
          <img className="h-12 w-12 object-contain" src={logo} alt="" />
          <span className="font-display lg:text-lg font-semibold tracking-wide text-[#F5EBD8] sm:text-md">
            Old Mushin Youth Choir
          </span>
        </Link>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-[#C9A24B]/40 text-[#C9A24B] transition-colors hover:bg-[#C9A24B]/10"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <FaTimes /> : <FaAlignLeft />}
          </button>
        </div>

        <nav
          id="primary-navigation"
          className={`${isOpen ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-[#C9A24B]/25 bg-[#150B07] px-5 py-4 lg:static lg:flex lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {navigation.map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(event) => scrollToSection(event, id)}
              className="py-2 font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#D9C9A8] transition-colors hover:text-[#C9A24B] md:py-3"
            >
              {label}
            </a>
          ))}

          <div className="mt-2 border-t border-[#C9A24B]/20 pt-4 lg:hidden">
            {user?.name ? (
              <Link
                className="flex items-center gap-2 py-2 font-sans text-xs uppercase tracking-[0.16em] text-[#C9A24B]"
                to="/dash"
                onClick={closeMenu}
              >
                <FaUser /> {user.name}
              </Link>
            ) : (
              <Link
                to="/reg"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 border border-[#C9A24B] px-4 py-2 font-sans text-xs uppercase tracking-[0.16em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#150B07]"
              >
                <FaRegAddressCard /> Register
              </Link>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {user?.name ? (
            <Link
              className="flex items-center gap-2 border border-[#C9A24B]/50 px-4 py-2 font-sans text-xs uppercase tracking-[0.12em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B]/10"
              to="/dash"
            >
              <FaUser /> {user.name}
            </Link>
          ) : (
            <Link
              to="/reg"
              className="inline-flex items-center gap-2 border border-[#C9A24B] px-4 py-2 font-sans text-xs uppercase tracking-[0.16em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#150B07]"
            >
              <FaRegAddressCard /> Register
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
