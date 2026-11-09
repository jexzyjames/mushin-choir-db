import { useState } from "react";
import PropTypes from "prop-types";
import useTheme from "../context/useTheme";
import leaderPlaceholder from "../assets/dummy-img.jpeg";
import choirLeaders from "../data/choirLeaders";


// --- Signature divider: gold hairline with a center flourish dot ---
function Divider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A24B]/70" />
      <span className="h-1.5 w-1.5 rotate-45 bg-[#C9A24B]" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A24B]/70" />
    </div>
  );
}
Divider.propTypes = {
  className: PropTypes.string,
};

function Eyebrow({ children }) {
  return (
    <p className="font-sans text-[11px] tracking-[0.28em] uppercase text-[#C9A24B] font-semibold">
      {children}
    </p>
  );
}
Eyebrow.propTypes = {
  children: PropTypes.node.isRequired,
};

// --- Logo mark: headphones + music note, kept from original, rendered in gold line-art ---
function ChoirMark({ size = 64 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className="text-[#F5EBD8]"
      role="img"
      aria-label="Mushin Youth Choir crest: headphones and music note"
    >
      <circle cx="32" cy="32" r="31" stroke="#C9A24B" strokeWidth="1" opacity="0.5" />
      {/* headphone band */}
      <path
        d="M16 30C16 19.5 23 13 32 13C41 13 48 19.5 48 30"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* ear cups */}
      <rect x="12.5" y="29" width="8" height="13" rx="3.5" stroke="currentColor" strokeWidth="2.25" />
      <rect x="43.5" y="29" width="8" height="13" rx="3.5" stroke="currentColor" strokeWidth="2.25" />
      {/* music note nested in band */}
      <g transform="translate(26.5 24)">
        <path d="M9 0V14.2" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" />
        <path d="M9 0 L15.5 2.1V6.4L9 4.3" fill="#C9A24B" />
        <circle cx="6.3" cy="15.2" r="3.3" fill="#C9A24B" />
      </g>
    </svg>
  );
}
ChoirMark.propTypes = {
  size: PropTypes.number,
};

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#8B6F3C]">
        {label}
      </span>
      <input
        {...props}
        className="mt-2 w-full border-0 border-b border-[#C9A24B]/40 bg-transparent py-2 font-serif text-[#2A1B12] placeholder:text-[#B9A685] focus:border-[#C9A24B] focus:outline-none focus:ring-0 transition-colors"
      />
    </label>
  );
}
Input.propTypes = {
  label: PropTypes.string.isRequired,
};

export default function MushinYouthChoir({ leadership = choirLeaders }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [subscribed, setSubscribed] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Choir updates");
    const body = encodeURIComponent(`Please add ${email} to choir updates.`);
    window.location.href = `mailto:ycmushin@gmail.com?subject=${subject}&body=${body}`;
    setSubscribed(true);
  }

  MushinYouthChoir.propTypes = {
    leadership: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        image: PropTypes.string,
      })
    ),
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    const subject = encodeURIComponent(`Choir website message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nName: ${form.name}\nPhone: ${form.phone || "Not provided"}`
    );
    window.location.href = `mailto:ycmushin@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const programs = [
    {
      title: "Rudiments of Music",
      copy: "Sight-reading, rhythm and theory — the grammar every minstrel needs before they sing or play a single note.",
    },
    {
      title: "Instrumental Training",
      copy: "Hands-on practice on keyboard, percussion and strings, taught by working musicians within the choir.",
    },
    {
      title: "Songs Training",
      copy: "Voice placement, harmony and hymn repertoire — building a sonorous, disciplined sound from the heart.",
    },
  ];

  return (
    <div id="home" className="min-h-screen bg-[#0B0704] font-serif text-[#F5EBD8] selection:bg-[#C9A24B]/30">
      <style>{`
        .font-serif { font-family: 'Lora', Georgia, serif; }
        .font-display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden border-b border-[#C9A24B]/20">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              theme === "light"
                ? "radial-gradient(circle at 50% -10%, rgba(201,162,75,0.12), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F7F5EF 70%)"
                : "radial-gradient(circle at 50% -10%, rgba(90,30,18,0.55), transparent 55%), linear-gradient(180deg, #150B07 0%, #0B0704 70%)",
          }}
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-28">
          <ChoirMark size={72} />
          <p className="mt-6 font-sans text-[11px] tracking-[0.32em] uppercase text-[#8B6F3C]">
            Est. in the Spirit of Song
          </p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-wide text-[#F5EBD8] sm:text-5xl">
            Old Mushin Youth Choir
          </h1>
          <Divider className="mt-6" />
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#D9C9A8] sm:text-base">
            A fast-growing community of voices aged 13 to 25, raised together
            in song, discipline and grace.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-none border border-[#C9A24B]/40 bg-[#150B07] px-4 py-3 text-sm text-[#F5EBD8] placeholder:text-[#7A6A4E] focus:border-[#C9A24B] focus:outline-none"
            />
            <button
              type="submit"
              className="border border-[#C9A24B] px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-[#C9A24B] transition-colors hover:bg-[#C9A24B] hover:text-[#150B07]"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="mt-3 font-sans text-xs tracking-wide text-[#C9A24B]">
              Your email app should open with a request to receive choir updates.
            </p>
          )}
        </div>
      </header>

      {/* ===== PROGRAMS ===== */}
      <section id="programs" className="mx-auto scroll-mt-24 max-w-5xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <Eyebrow>What We Offer</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
            Our Programs
          </h2>
        </div>
        <Divider className="mt-7" />

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {programs.map((p, i) => (
            <div key={p.title} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A24B]/50">
                <span className="font-display text-lg text-[#C9A24B]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-[#F5EBD8]">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B9A685]">
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ANNOUNCEMENTS ===== */}
      <section
        id="announcements"
        className="scroll-mt-24 border-y border-[#C9A24B]/20 bg-[#0F0805]"
      >
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
          <Eyebrow>Choir News</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
            Announcements
          </h2>
          <Divider className="mt-7" />
          <div className="mt-10 border border-[#C9A24B]/25 bg-[#150B07] px-6 py-10 sm:px-10">
            <p className="font-display text-xl font-semibold text-[#D9C9A8]">
              ALABANZA EXHORTADA 2.O IS COMING SOON!
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#B9A685]">
              Check back here for choir news, rehearsal updates and upcoming
              events.
            </p>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="relative scroll-mt-24 border-y border-[#C9A24B]/20 bg-[#0F0805]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <Eyebrow>About Us</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
            Raising Godly &amp; Competent Minstrels
          </h2>
          <Divider className="mt-7" />
          <p className="font-display mt-8 text-xl italic leading-relaxed text-[#D9C9A8] sm:text-2xl">
            &ldquo;Music is everybody&apos;s possession — it is only publishers who
            think that people own it.&rdquo;
          </p>
          <p className="mt-8 text-[15px] leading-relaxed text-[#B9A685]">
            We are committed to raising Godly, competent and disciplined
            minstrels — capable of singing hymns and playing instruments with
            a sonorous voice and grace from their hearts.
          </p>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section
        id="leadership"
        className="scroll-mt-24 border-y border-[#C9A24B]/20 bg-[#0F0805]"
      >
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <Eyebrow>Our Leadership</Eyebrow>
            <h2 className="font-display mt-3 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
              Growing Together Through Music
            </h2>
            <Divider className="mt-7" />
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#B9A685] sm:text-base">
              Our choir is guided by people committed to nurturing talent,
              building discipline and helping every member find their voice.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {leadership.map((leader, index) => (
              <article
                key={leader.id}
                className="overflow-hidden border border-[#C9A24B]/25 bg-[#150B07] text-center"
              >
                <img
                  src={leader.image || leaderPlaceholder}
                  alt={`Portrait of ${leader.name}`}
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
                <div className="px-3 py-5 sm:px-5">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-[#C9A24B]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold text-[#F5EBD8] sm:text-xl">
                    {leader.name}
                  </h3>
                  <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.14em] text-[#B9A685] sm:text-xs">
                    {leader.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="mx-auto scroll-mt-24 max-w-5xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <Eyebrow>Get In Touch</Eyebrow>
          <h2 className="font-display mt-3 text-3xl font-semibold text-[#F5EBD8] sm:text-4xl">
            Contact Us
          </h2>
          <Divider className="mt-7" />
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-[#B9A685]">
            Reach out with your feedback, questions or suggestions — we&apos;d
            love to hear from you.
          </p>
        </div>

        <div className="mt-14 grid gap-12 sm:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <div className="space-y-6">
            <div>
              <Eyebrow>Email</Eyebrow>
              <p className="mt-2 text-[15px] text-[#F5EBD8]">
                ycmushin@gmail.com
              </p>
            </div>
            <div>
              <Eyebrow>Phone</Eyebrow>
              <p className="mt-2 text-[15px] text-[#F5EBD8]">
                +234 704 566 6940
              </p>
            </div>
            <div>
              <Eyebrow>Address</Eyebrow>
              <p className="mt-2 text-[15px] text-[#F5EBD8]">
                Owo Street, Alafia
              </p>
            </div>
          </div>

          {/* Form — styled like a hymnal page */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#FFF8E7] px-7 py-9 text-[#2A1B12] sm:px-9 sm:py-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Input
                label="Your Name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                required
              />
              <Input
                label="Your Number"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone number"
              />
            </div>
            <label className="mt-6 block">
              <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#8B6F3C]">
                Your Feedback
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Write your feedback"
                required
                className="mt-2 w-full resize-none border-0 border-b border-[#C9A24B]/40 bg-transparent py-2 font-serif text-[#2A1B12] placeholder:text-[#B9A685] focus:border-[#C9A24B] focus:outline-none"
              />
            </label>
            <button
              type="submit"
              className="mt-8 w-full bg-[#5A1E12] py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-[#F5EBD8] transition-colors hover:bg-[#3F140C]"
            >
              Submit
            </button>
            {sent && (
              <p className="mt-4 text-center font-sans text-xs tracking-wide text-[#5A1E12]">
                Your email app should open with your message ready to send.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#C9A24B]/20 py-10 text-center">
        <ChoirMark size={36} />
        <p className="mt-4 font-sans text-[11px] tracking-[0.2em] uppercase text-[#8B6F3C]">
          Old Mushin Youth Choir
        </p>
      </footer>
    </div>
  );
}
