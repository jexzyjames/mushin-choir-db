import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "../redux/slices/authSlice";
import avatar from "../assets/reg-img.png";

const fieldClass =
  "mt-2 w-full border border-[#C9A24B]/25 bg-[#0F0805] px-3 py-3 text-sm text-[#F5EBD8] outline-none transition-colors focus:border-[#C9A24B]";
const labelClass =
  "block font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B]";

const Profile = ({ title = "Profile" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [form, setForm] = useState({
    phoneNum: user?.number || user?.phoneNum || "",
    part: user?.part || "",
    group: user?.group || "",
    grade: user?.grade || "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.imageUrl || avatar);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreview(user?.imageUrl || avatar);
      return undefined;
    }

    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image, user?.imageUrl]);

  useEffect(() => {
    setForm({
      phoneNum: user?.number || user?.phoneNum || "",
      part: user?.part || "",
      group: user?.group || "",
      grade: user?.grade || "",
    });
  }, [user]);

  if (id !== user?.uid) {
    return <Navigate to={`/profile/${user?.uid}`} replace />;
  }

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setFeedback(null);
    if (file && !file.type.startsWith("image/")) {
      setFeedback({ type: "error", message: "Choose an image file." });
      event.target.value = "";
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setFeedback({ type: "error", message: "The image must be smaller than 5 MB." });
      event.target.value = "";
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      let imageUrl = user.imageUrl || "";
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
        updateUserDetails({
          id: user.uid,
          userData: {
            number: form.phoneNum.trim(),
            part: form.part,
            group: form.group,
            grade: form.grade,
            imageUrl,
          },
        })
      ).unwrap();
      setImage(null);
      setFeedback({ type: "success", message: "Your profile has been updated." });
    } catch (saveError) {
      setFeedback({
        type: "error",
        message:
          typeof saveError === "string"
            ? saveError
            : saveError.message || "Your profile could not be updated. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl" aria-labelledby="profile-heading">
      <div className="mb-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8B6F3C]">
          Account details
        </p>
        <h2 id="profile-heading" className="font-display mt-2 text-3xl font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-[#B9A685]">
          Update your choir details and profile photo.
        </p>
      </div>

      <form
        className="space-y-6 border border-[#C9A24B]/25 bg-[#150B07] p-5 sm:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-4 border-b border-[#C9A24B]/20 pb-6 sm:flex-row">
          <img
            className="h-24 w-24 rounded-full border border-[#C9A24B]/50 object-cover"
            src={preview}
            alt={`${user?.name || "Member"} profile`}
          />
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl font-semibold">{user?.name}</h3>
            <p className="mt-1 text-sm text-[#B9A685]">{user?.email}</p>
          </div>
        </div>

        <label className={labelClass}>
          Profile photo <span className="normal-case tracking-normal text-[#8B6F3C]">(optional)</span>
          <input
            className={`${fieldClass} file:mr-3 file:border-0 file:bg-[#C9A24B] file:px-3 file:py-2 file:font-sans file:text-xs file:font-semibold file:text-[#150B07]`}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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
            minLength={7}
            maxLength={20}
            pattern="[0-9+() -]{7,20}"
            required
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={labelClass}>
            Choir part
            <select className={fieldClass} name="part" value={form.part} onChange={updateField} required>
              <option className="bg-[#150B07]" value="">Select your part</option>
              {["SOPRANO", "ALTO", "TENOR", "BASS"].map((part) => (
                <option className="bg-[#150B07]" key={part} value={part}>{part}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Choir group
            <select className={fieldClass} name="group" value={form.group} onChange={updateField} required>
              <option className="bg-[#150B07]" value="">Select your group</option>
              {["ODIOLOWO", "ALAFIA", "IDIORO"].map((group) => (
                <option className="bg-[#150B07]" key={group} value={group}>{group}</option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Grade
            <select className={fieldClass} name="grade" value={form.grade} onChange={updateField} required>
              <option className="bg-[#150B07]" value="">Select a grade</option>
              {["PRELIM", "GRADE 1", "GRADE 2", "GRADE 3", "GRADE 4", "GRADE 5"].map((grade) => (
                <option className="bg-[#150B07]" key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </label>
        </div>

        {feedback && (
          <p
            className={`border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-[#C9A24B]/30 text-[#D9C9A8]"
                : "border-red-900/60 text-red-200"
            }`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.message}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="border border-[#C9A24B] bg-[#C9A24B] px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-[#150B07] transition-colors hover:bg-transparent hover:text-[#C9A24B] disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving…" : "Save changes"}
          </button>
          <Link
            to="/dash"
            className="border border-[#C9A24B]/30 px-5 py-3 text-center font-sans text-xs uppercase tracking-[0.18em] text-[#D9C9A8] hover:border-[#C9A24B] hover:text-[#C9A24B]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Profile;

Profile.propTypes = {
  title: PropTypes.string,
};
