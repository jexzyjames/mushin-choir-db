import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBookOpen, FaListCheck, FaUser } from "react-icons/fa6";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  const destinations = [
    {
      label: "Lessons",
      description: "Explore the lessons prepared for your grade.",
      to: "/lessons",
      icon: FaBookOpen,
    },
    {
      label: "Assignments",
      description: "Review your grade assignments.",
      to: "/assignment",
      icon: FaListCheck,
    },
    {
      label: "Your profile",
      description: "Keep your choir contact details up to date.",
      to: `/profile/${user?.uid}`,
      icon: FaUser,
    },
  ];
  if (user?.email === "james@gmail.com" || user?.role === "admin") {
    destinations.push({
      label: "Admin tools",
      description: "Manage choir lessons and assignments.",
      to: "/filter",
      icon: FaListCheck,
    });
  }

  return (
    <section aria-label="Choir member dashboard">
      <div className="mb-7 border border-[#C9A24B]/25 bg-[#150B07] p-5 sm:p-7">
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#C9A24B]">
          Your choir portal
        </p>
        <h2 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">
          Welcome back{user?.name ? `, ${user.name}` : ""}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B9A685]">
          Your lessons, assignments and choir profile are all in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {destinations.map(({ label, description, to, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="group border border-[#C9A24B]/25 bg-[#150B07] p-5 transition-colors hover:border-[#C9A24B]/60 hover:bg-[#1B0E08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24B]"
          >
            <span className="flex h-11 w-11 items-center justify-center border border-[#C9A24B]/40 text-[#C9A24B]">
              <Icon aria-hidden="true" />
            </span>
            <h3 className="font-display mt-5 text-xl font-semibold group-hover:text-[#C9A24B]">
              {label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#B9A685]">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
