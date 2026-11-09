import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { loginUser, loginWithGoogle } from "../redux/slices/authSlice";
import ThemeToggle from "../components/ThemeToggle";

const fieldClass =
  "mt-2 w-full border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none transition-colors placeholder:text-[#7A6A4E] focus:border-[#C9A24B]";
const labelClass =
  "block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await dispatch(loginUser({ email: email.trim(), password })).unwrap();
      navigate("/dash", { replace: true });
    } catch (loginError) {
      setError(
        typeof loginError === "string"
          ? loginError
          : "We could not sign you in. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigate("/dash", { replace: true });
    } catch (loginError) {
      setError(
        typeof loginError === "string"
          ? loginError
          : "Google sign-in failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0704] px-4 py-10 text-[#F5EBD8]">
      <section className="w-full max-w-md border border-[#C9A24B]/30 bg-[#150B07] p-6 shadow-2xl shadow-black/30 sm:p-9">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9A24B] hover:text-[#F5EBD8]"
          >
            Old Mushin Youth Choir
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="font-display mt-5 text-3xl font-semibold sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-[#B9A685]">
          Sign in to open your choir member portal.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-8 flex min-h-12 w-full items-center justify-center gap-3 border border-[#C9A24B]/40 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-[#D9C9A8] transition-colors hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaGoogle aria-hidden="true" />
          {loading ? "Signing in…" : "Continue with Google"}
        </button>

        <div className="my-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-[#C9A24B]/20" />
          <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#8B6F3C]">
            or use email
          </span>
          <span className="h-px flex-1 bg-[#C9A24B]/20" />
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <label className={labelClass}>
            Email address
            <input
              className={fieldClass}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label className={labelClass}>
            Password
            <span className="relative mt-2 block">
              <input
                className={`${fieldClass} mt-0 pr-12`}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-[#B9A685] hover:text-[#C9A24B]"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((shown) => !shown)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </span>
          </label>

          {error && (
            <p className="border border-red-900/60 bg-[#1B0E08] px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}

          <button
            className="w-full border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#B9A685]">
          New to the choir?{" "}
          <Link className="text-[#C9A24B] underline-offset-4 hover:underline" to="/reg">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
