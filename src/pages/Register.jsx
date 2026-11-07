import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { registerUser } from "../redux/slices/authSlice";

const fieldClass =
  "mt-2 w-full border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none transition-colors placeholder:text-[#7A6A4E] focus:border-[#C9A24B]";
const labelClass =
  "block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNum: "",
    password: "",
    grade: "",
    group: "",
    dateOfBirth: "",
    part: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!image) {
      setImagePreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(image);
    setImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [image]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setError("");

    if (file && !file.type.startsWith("image/")) {
      setError("Choose an image file.");
      event.target.value = "";
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError("The profile image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "images");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpd7w91aa/image/upload",
          { method: "POST", body: formData }
        );
        const result = await response.json();
        if (!response.ok || !result.secure_url) {
          throw new Error(result.error?.message || "Profile photo upload failed.");
        }
        imageUrl = result.secure_url;
      }

      await dispatch(
        registerUser({
          email: form.email.trim(),
          password: form.password,
          grade: form.grade,
          displayName: form.name.trim(),
          group: form.group,
          imageUrl,
          phoneNum: form.phoneNum.trim(),
          age: form.dateOfBirth,
          part: form.part,
        })
      ).unwrap();

      navigate("/dash", { replace: true });
    } catch (registrationError) {
      setError(
        typeof registrationError === "string"
          ? registrationError
          : registrationError.message ||
              "Your account could not be created. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const maxDate = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-[#0B0704] px-4 py-8 text-[#F5EBD8] sm:px-6 sm:py-12">
      <section className="mx-auto max-w-3xl border border-[#C9A24B]/30 bg-[#150B07] p-5 shadow-2xl shadow-black/30 sm:p-9">
        <Link
          to="/"
          className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9A24B] hover:text-[#F5EBD8]"
        >
          Old Mushin Youth Choir
        </Link>
        <h1 className="font-display mt-5 text-3xl font-semibold sm:text-4xl">
          Join the choir
        </h1>
        <p className="mt-2 text-sm text-[#B9A685]">
          Create your member account. Fields marked required must be completed.
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Full name
              <input
                className={fieldClass}
                type="text"
                name="name"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                maxLength={80}
                required
              />
            </label>
            <label className={labelClass}>
              Email address
              <input
                className={fieldClass}
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
              />
            </label>
            <label className={labelClass}>
              WhatsApp phone number
              <input
                className={fieldClass}
                type="tel"
                name="phoneNum"
                value={form.phoneNum}
                onChange={updateField}
                autoComplete="tel"
                minLength={7}
                maxLength={20}
                pattern="[0-9+() -]{7,20}"
                placeholder="+234 000 000 0000"
                required
              />
            </label>
            <label className={labelClass}>
              Date of birth
              <input
                className={fieldClass}
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={updateField}
                max={maxDate}
                required
              />
            </label>
            <label className={labelClass}>
              Password
              <span className="relative mt-2 block">
                <input
                  className={`${fieldClass} mt-0 pr-12`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  autoComplete="new-password"
                  minLength={8}
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
            <label className={labelClass}>
              Profile photo <span className="font-normal normal-case tracking-normal text-[#8B6F3C]">(optional)</span>
              <input
                className={`${fieldClass} file:mr-3 file:border-0 file:bg-[#C9A24B] file:px-3 file:py-2 file:font-sans file:text-xs file:font-semibold file:text-[#150B07]`}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Selected profile preview"
                  className="mt-3 h-16 w-16 rounded-full border border-[#C9A24B]/40 object-cover"
                />
              )}
            </label>
            <label className={labelClass}>
              Grade
              <select
                className={fieldClass}
                name="grade"
                value={form.grade}
                onChange={updateField}
                required
              >
                <option className="bg-[#150B07]" value="">Select a grade</option>
                {["PRELIM", "GRADE 1", "GRADE 2", "GRADE 3", "GRADE 4", "GRADE 5"].map((grade) => (
                  <option className="bg-[#150B07]" key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Choir part
              <select
                className={fieldClass}
                name="part"
                value={form.part}
                onChange={updateField}
                required
              >
                <option className="bg-[#150B07]" value="">Select your part</option>
                {["SOPRANO", "ALTO", "TENOR", "BASS"].map((part) => (
                  <option className="bg-[#150B07]" key={part} value={part}>{part}</option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Choir group
              <select
                className={fieldClass}
                name="group"
                value={form.group}
                onChange={updateField}
                required
              >
                <option className="bg-[#150B07]" value="">Select your group</option>
                {["ODIOLOWO", "ALAFIA", "IDIORO"].map((group) => (
                  <option className="bg-[#150B07]" key={group} value={group}>{group}</option>
                ))}
              </select>
            </label>
          </div>

          {error && (
            <p className="border border-red-900/60 bg-[#1B0E08] px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}

          <button
            className="w-full border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#B9A685]">
          Already registered?{" "}
          <Link className="text-[#C9A24B] underline-offset-4 hover:underline" to="/login">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
