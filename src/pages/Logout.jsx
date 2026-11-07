import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/", { replace: true });
    } catch (logoutError) {
      setError(
        typeof logoutError === "string"
          ? logoutError
          : "You could not be signed out. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl border border-[#C9A24B]/25 bg-[#150B07] p-6 text-center sm:p-9">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9A24B]">
        Sign out
      </p>
      <h2 className="font-display mt-3 text-2xl font-semibold sm:text-3xl">
        Are you sure you want to sign out?
      </h2>
      <p className="mt-3 text-sm text-[#B9A685]">
        You are signed in as {user?.name || user?.email}.
      </p>

      {error && (
        <p className="mt-5 border border-red-900/60 px-4 py-3 text-sm text-red-200" role="alert">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          className="border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:opacity-60"
          type="button"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Signing out…" : "Yes, sign out"}
        </button>
        <Link
          className="border border-[#C9A24B]/30 px-5 py-3 font-sans text-xs uppercase tracking-[0.18em] text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B]"
          to="/dash"
        >
          Keep me signed in
        </Link>
      </div>
    </section>
  );
};

export default Logout;
