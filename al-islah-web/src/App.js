import { useState, useEffect, useRef } from "react";

const colors = {
  greenDeep: "#0a2a1a",
  greenMid: "#0f3d25",
  greenRich: "#1a5c38",
  greenLight: "#2e7d52",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  goldPale: "#f5e9c0",
  white: "#fafaf7",
  cream: "#f7f3ea",
  textDark: "#1a1a18",
  textMid: "#3a3a35",
};

function Toast({ msg, show }) {
  return (
    <div style={{
      position: "fixed", bottom: "2rem", right: "2rem", zIndex: 9999,
      background: colors.greenMid, color: "#fff", padding: "1rem 1.5rem",
      borderRadius: 12, fontSize: "0.88rem", border: `1px solid ${colors.gold}`,
      boxShadow: "0 8px 30px rgba(10,42,26,0.4)",
      transform: show ? "translateX(0)" : "translateX(150%)",
      transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
      maxWidth: 300,
    }}>{msg}</div>
  );
}

function useToast() {
  const [state, setState] = useState({ msg: "", show: false });
  const timer = useRef();
  const fire = (msg) => {
    clearTimeout(timer.current);
    setState({ msg, show: true });
    timer.current = setTimeout(() => setState(s => ({ ...s, show: false })), 3500);
  };
  return [state, fire];
}

function GoldBar({ center }) {
  return (
    <div style={{
      width: 60, height: 3, borderRadius: 2,
      background: `linear-gradient(90deg, ${colors.gold}, ${colors.goldLight})`,
      margin: center ? "0 auto 2rem" : "0 0 2rem",
    }} />
  );
}

function SectionLabel({ children, center }) {
  return (
    <span style={{
      fontFamily: "Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.2em",
      textTransform: "uppercase", color: colors.gold,
      display: "block", marginBottom: "0.5rem",
      textAlign: center ? "center" : "left",
    }}>{children}</span>
  );
}

function SectionTitle({ children, center }) {
  return (
    <h2 style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: "clamp(1.6rem,4vw,2.6rem)",
      color: colors.greenDeep, lineHeight: 1.25, marginBottom: "1rem",
      textAlign: center ? "center" : "left",
    }}>{children}</h2>
  );
}

// ── NAV ──────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "home", label: "হোম" },
    { id: "about", label: "আমাদের সম্পর্কে" },
    { id: "activities", label: "কার্যক্রম" },
    { id: "involve", label: "যোগ দিন" },
    { id: "contact", label: "যোগাযোগ" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5%", height: scrolled ? 60 : 72,
        background: scrolled ? "rgba(10,42,26,0.99)" : "rgba(10,42,26,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(201,168,76,0.25)",
        transition: "all 0.3s",
      }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: colors.greenDeep, fontWeight: 700, fontFamily: "Georgia, serif",
          }}>ا</div>
          <div>
            <div style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", lineHeight: 1.2 }}>আল ইসলাহ ফাউন্ডেশন</div>
            <div style={{ color: colors.goldLight, fontSize: "0.68rem", letterSpacing: "0.08em" }}>Al Islah Foundation</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: "1.8rem", alignItems: "center" }}>
          {links.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === l.id ? colors.goldLight : "rgba(255,255,255,0.8)",
              fontSize: "0.85rem", fontFamily: "Georgia, serif", letterSpacing: "0.03em",
              borderBottom: active === l.id ? `1px solid ${colors.gold}` : "1px solid transparent",
              paddingBottom: 2, transition: "all 0.2s",
            }}>{l.label}</button>
          ))}
          <button onClick={() => scrollTo("donate")} style={{
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
            color: colors.greenDeep, fontWeight: 700, padding: "8px 20px",
            borderRadius: 30, border: "none", cursor: "pointer",
            fontSize: "0.82rem", letterSpacing: "0.05em",
            boxShadow: "0 4px 15px rgba(201,168,76,0.4)",
            transition: "all 0.2s",
          }}>দান করুন</button>
        </div>

        {/* Hamburger - visible on small screens via inline media won't work in JSX, we use a simple toggle */}
        <button onClick={() => setMobileOpen(o => !o)} style={{
          background: "none", border: "none", cursor: "pointer", display: "none",
          flexDirection: "column", gap: 5, padding: 4,
        }} id="hamburger">
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, zIndex: 999,
          background: colors.greenDeep, padding: "1.5rem",
          borderBottom: "1px solid rgba(201,168,76,0.25)",
        }}>
          {[...links, { id: "donate", label: "দান করুন" }].map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.85)", fontSize: "1rem", padding: "0.75rem 0",
              cursor: "pointer", fontFamily: "Georgia, serif",
            }}>{l.label}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ── HERO ─────────────────────────────────────────────
function Hero({ scrollTo }) {
  return (
    <section id="home" style={{
      position: "relative", minHeight: "100vh",
      background: `linear-gradient(160deg, ${colors.greenDeep} 0%, ${colors.greenMid} 60%, #0a2e1a 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 5% 80px", overflow: "hidden",
    }}>
      {/* Pattern overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="hp" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
            <circle cx="50" cy="50" r="18" fill="none" stroke="#c9a84c" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#hp)"/>
      </svg>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem,3.5vw,2.2rem)", color: colors.goldLight, marginBottom: "1.5rem", letterSpacing: "0.02em" }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#fff", lineHeight: 1.15, marginBottom: "0.5rem" }}>
          <span style={{ color: colors.gold }}>আল ইসলাহ</span> ফাউন্ডেশন
        </h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem,2.5vw,1.35rem)", color: "rgba(255,255,255,0.7)", fontStyle: "italic", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
          Spreading Light · Reviving Faith · Building Character
        </p>
        <div style={{ width: 80, height: 2, background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`, margin: "1.2rem auto" }} />
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem", fontSize: "0.95rem" }}>আলো ছড়াই · ঈমান জাগাই · চরিত্র গড়ি</p>
        <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.9, fontSize: "0.9rem" }}>
          একটি আলোকিত সমাজ গড়ার স্বপ্ন নিয়ে আল ইসলাহ ফাউন্ডেশনের যাত্রা শুরু। তাওহীদের প্রচার, নৈতিক মূল্যবোধের পুনর্জাগরণ এবং অসহায় মানুষের পাশে দাঁড়ানোই আমাদের লক্ষ্য।
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("involve")} style={{
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
            color: colors.greenDeep, fontWeight: 700, padding: "14px 36px",
            borderRadius: 40, border: "none", cursor: "pointer", fontSize: "1rem",
            letterSpacing: "0.04em", boxShadow: "0 6px 24px rgba(201,168,76,0.4)",
            transition: "transform 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >আমাদের সাথে যোগ দিন</button>
          <button onClick={() => scrollTo("donate")} style={{
            border: "1.5px solid rgba(255,255,255,0.4)", color: "#fff",
            background: "rgba(255,255,255,0.05)",
            padding: "14px 36px", borderRadius: 40, cursor: "pointer", fontSize: "1rem",
            letterSpacing: "0.04em", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = colors.gold; e.currentTarget.style.color = colors.goldLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
          >দান করুন</button>
        </div>
      </div>
    </section>
  );
}

// ── STATS ────────────────────────────────────────────
function Stats() {
  const items = [
    { num: "১০০০+", label: "উপকৃত মানুষ" },
    { num: "৫০+", label: "দাওয়াহ ক্যাম্পেইন" },
    { num: "২০০+", label: "স্বেচ্ছাসেবক" },
    { num: "৫+", label: "বছরের অভিজ্ঞতা" },
  ];
  return (
    <div style={{ background: `linear-gradient(90deg, ${colors.greenRich}, ${colors.greenDeep})`, display: "flex", flexWrap: "wrap" }}>
      {items.map((s, i) => (
        <div key={i} style={{
          flex: "1 1 150px", padding: "1.8rem 2rem", textAlign: "center",
          borderRight: i < items.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: colors.goldLight, lineHeight: 1 }}>{s.num}</div>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em", marginTop: "0.4rem" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── FOCUS CARDS ──────────────────────────────────────
function Focus() {
  const cards = [
    { icon: "🕌", title: "দাওয়াহ ও সচেতনতা", desc: "লিফলেট, পোস্টার, আলোচনা সভার মাধ্যমে তাওহীদ ও সুন্নাহর প্রচার।" },
    { icon: "📖", title: "ইসলামী শিক্ষা", desc: "স্টাডি সার্কেল, ওয়াজ মাহফিল এবং অনলাইন ক্লাসের মাধ্যমে ইলমের বিস্তার।" },
    { icon: "❤️", title: "দাতব্য ও সহায়তা", desc: "অসহায়, দরিদ্র ও সুবিধাবঞ্চিত মানুষের পাশে — খাদ্য, বৃত্তি ও ত্রাণ।" },
    { icon: "🌟", title: "যুব সংস্কার", desc: "তরুণ প্রজন্মকে ক্ষতিকর প্রভাব থেকে রক্ষা করে ইসলামী মূল্যবোধে গড়া।" },
    { icon: "🤝", title: "নৈতিক মূল্যবোধ", desc: "সমাজে সততা, ন্যায়পরায়ণতা ও ভ্রাতৃত্বের চর্চা বাড়ানো।" },
    { icon: "🌙", title: "তাওহীদের প্রচার", desc: "শিরক ও বিদআত থেকে সমাজকে মুক্ত রাখার সুনির্দিষ্ট প্রচেষ্টা।" },
  ];
  const [hovered, setHovered] = useState(null);
  return (
    <section id="focus" style={{ padding: "80px 5%", background: colors.cream, position: "relative" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <SectionLabel center>আমাদের লক্ষ্য</SectionLabel>
        <SectionTitle center>মূল কার্যক্ষেত্র</SectionTitle>
        <GoldBar center />
        <p style={{ color: colors.textMid, maxWidth: 560, margin: "0 auto", lineHeight: 1.85, fontSize: "0.95rem" }}>
          ইসলামের সুমহান শিক্ষাকে মানুষের দরজায় পৌঁছে দেওয়া এবং একটি নৈতিক ও আলোকিত সমাজ গঠনই আমাদের মূল লক্ষ্য।
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.8rem" }}>
        {cards.map((c, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: colors.white, borderRadius: 16, padding: "2rem",
              border: `1px solid rgba(201,168,76,${hovered === i ? 0.4 : 0.15})`,
              boxShadow: hovered === i ? "0 20px 50px rgba(10,42,26,0.12)" : "0 4px 24px rgba(10,42,26,0.06)",
              transform: hovered === i ? "translateY(-8px)" : "translateY(0)",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
              position: "relative", overflow: "hidden",
            }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 3,
              background: `linear-gradient(90deg, ${colors.greenRich}, ${colors.gold})`,
              transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left", transition: "transform 0.4s",
            }} />
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: `linear-gradient(135deg, rgba(26,92,56,0.1), rgba(201,168,76,0.1))`,
              border: `1px solid rgba(201,168,76,0.2)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.5rem", marginBottom: "1rem",
            }}>{c.icon}</div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", color: colors.greenDeep, marginBottom: "0.6rem" }}>{c.title}</h3>
            <p style={{ color: colors.textMid, fontSize: "0.88rem", lineHeight: 1.8 }}>{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── QURAN QUOTE ──────────────────────────────────────
function Quote() {
  return (
    <section id="quote" style={{
      padding: "80px 5%",
      background: `linear-gradient(135deg, ${colors.greenDeep}, ${colors.greenMid})`,
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }} viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="qp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <polygon points="40,8 47,28 68,28 52,41 58,62 40,50 22,62 28,41 12,28 33,28" fill="none" stroke="#c9a84c" strokeWidth="0.7"/>
          </pattern>
        </defs>
        <rect width="600" height="400" fill="url(#qp)"/>
      </svg>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.2rem,3vw,2rem)", color: colors.goldLight, lineHeight: 1.8, marginBottom: "1.2rem", direction: "rtl" }}>
          وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.95rem,2vw,1.3rem)", color: "rgba(255,255,255,0.85)", fontStyle: "italic", marginBottom: "0.8rem", maxWidth: 680, margin: "0 auto 0.8rem" }}>
          "And let there be among you a group inviting to all that is good, enjoining righteousness and forbidding evil — it is they who are the successful."
        </p>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
          "তোমাদের মধ্যে এমন একটি দল থাকুক যারা মানুষকে কল্যাণের দিকে আহ্বান করবে — তারাই সফলকাম।"
        </p>
        <p style={{ color: colors.gold, fontSize: "0.82rem", letterSpacing: "0.1em", fontFamily: "Georgia, serif" }}>
          — সূরা আল-ইমরান: ১০৪ | Surah Al-Imran: 104
        </p>
      </div>
    </section>
  );
}

// ── ABOUT ────────────────────────────────────────────
function About() {
  const mvCards = [
    { title: "আমাদের মিশন", desc: "তাওহীদের সঠিক আকীদা প্রচার করা, সমাজকে নৈতিকভাবে সংস্কার করা এবং দরিদ্র ও অসহায় মানুষের সেবায় নিবেদিত থাকা।" },
    { title: "আমাদের ভিশন", desc: "এমন একটি সমাজ গড়া যেখানে ইসলামের নীতিমালা অনুযায়ী মানুষ শান্তি ও ন্যায়বিচারের সাথে জীবন যাপন করতে পারবে।" },
    { title: "আমাদের মূল্যবোধ", desc: "ইখলাস (আন্তরিকতা), আমানাত (বিশ্বস্ততা), উখুওয়াহ (ভ্রাতৃত্ব) এবং আদল (ন্যায়বিচার) আমাদের মূল স্তম্ভ।" },
  ];
  return (
    <section id="about" style={{ padding: "80px 5%", background: colors.white }}>
      <SectionLabel>আমাদের সম্পর্কে</SectionLabel>
      <SectionTitle>আল ইসলাহ ফাউন্ডেশন</SectionTitle>
      <GoldBar />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3rem", alignItems: "start" }}>
        {/* Visual box */}
        <div style={{
          background: `linear-gradient(160deg, ${colors.greenMid}, ${colors.greenDeep})`,
          borderRadius: 20, padding: "2.5rem", position: "relative", overflow: "hidden",
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07, pointerEvents: "none" }} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
            <defs><pattern id="ap" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="14" fill="none" stroke="#c9a84c" strokeWidth="0.8"/></pattern></defs>
            <rect width="300" height="400" fill="url(#ap)"/>
          </svg>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", color: colors.goldLight, direction: "rtl", lineHeight: 1.7, marginBottom: "0.8rem" }}>
              إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", fontStyle: "italic", marginBottom: "2rem" }}>
              "নিশ্চয়ই সকল আমল নিয়তের উপর নির্ভরশীল।" — সহীহ বুখারী
            </p>
            <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: 12, padding: "1.2rem", border: "1px solid rgba(201,168,76,0.2)" }}>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", lineHeight: 1.9 }}>
                আমাদের প্রতিটি কাজ আল্লাহর সন্তুষ্টির জন্য। ইসলামের নীতিমালাই একটি সুশীল ও নৈতিক সমাজ গঠনের একমাত্র পথ।
              </p>
            </div>
          </div>
        </div>
        {/* Text */}
        <div>
          <p style={{ color: colors.textMid, lineHeight: 2, fontSize: "0.93rem", marginBottom: "1.5rem" }}>
            আল ইসলাহ ফাউন্ডেশন একটি অরাজনৈতিক ও স্বেচ্ছাসেবী ইসলামী সংগঠন। আমাদের মূল উদ্দেশ্য হলো ইসলামের সুমহান শিক্ষা সমাজের প্রতিটি স্তরে ছড়িয়ে দেওয়া এবং তাওহীদের ভিত্তিতে একটি আলোকিত, নৈতিক ও মানবিক সমাজ গড়ে তোলা।
          </p>
          <p style={{ color: colors.textMid, lineHeight: 2, fontSize: "0.93rem", marginBottom: "2rem" }}>
            আজকের যুগে তরুণ প্রজন্ম অনেক বিপথগামী সাংস্কৃতিক প্রভাবের শিকার। আমরা ইসলামের আলোয় তাদের পথ দেখাতে চাই এবং শরীয়তের সীমার মধ্যে থেকে জীবন পরিচালনার অনুপ্রেরণা দিতে চাই।
          </p>
          {mvCards.map((mv, i) => (
            <div key={i} style={{
              padding: "1.2rem 1.4rem", borderRadius: 12, marginBottom: "0.8rem",
              borderLeft: `3px solid ${colors.gold}`,
              background: "rgba(201,168,76,0.05)",
            }}>
              <h4 style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, marginBottom: "0.3rem" }}>{mv.title}</h4>
              <p style={{ fontSize: "0.87rem", color: colors.textMid, lineHeight: 1.75 }}>{mv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ACTIVITIES ───────────────────────────────────────
function Activities() {
  const [hovered, setHovered] = useState(null);
  const acts = [
    { icon: "📣", title: "দাওয়াহ ক্যাম্পেইন", sub: "Dawah & Outreach", desc: "লিফলেট বিতরণ, পোস্টার প্রচারণা এবং সামাজিক মাধ্যমে ইসলামের সঠিক বার্তা ছড়িয়ে দেওয়া।", tags: ["লিফলেট", "পোস্টার", "সোশ্যাল মিডিয়া"] },
    { icon: "📚", title: "ইসলামী স্টাডি সার্কেল", sub: "Study Circles", desc: "কুরআন, হাদীস ও আকীদাহ বিষয়ক নিয়মিত আলোচনা সভা। বিশেষজ্ঞ আলেমদের তত্ত্বাবধানে।", tags: ["কুরআন", "হাদীস", "আকীদাহ"] },
    { icon: "🍚", title: "দাতব্য কার্যক্রম", sub: "Charity & Welfare", desc: "অসহায় পরিবারের মাঝে খাদ্য সহায়তা, চিকিৎসা সহায়তা এবং মেধাবী শিক্ষার্থীদের বৃত্তি।", tags: ["খাদ্য সহায়তা", "বৃত্তি", "চিকিৎসা"] },
    { icon: "🌙", title: "রমাদান কার্যক্রম", sub: "Ramadan Programs", desc: "রমাদান মাসে ইফতার বিতরণ, তারাবীহ ক্লাস এবং বিশেষ দাওয়াহ প্রচারণা।", tags: ["ইফতার", "কুরআন ক্লাস", "দাওয়াহ"] },
    { icon: "👨‍🏫", title: "যুব উন্নয়ন", sub: "Youth Development", desc: "তরুণদের জন্য ইসলামী নেতৃত্ব ট্রেনিং, ক্যারিয়ার গাইডেন্স এবং মেন্টরিং।", tags: ["লিডারশিপ", "মেন্টরিং", "ক্যারিয়ার"] },
    { icon: "🕌", title: "মাসজিদ কার্যক্রম", sub: "Masjid Programs", desc: "স্থানীয় মাসজিদগুলোতে খুতবা সহায়তা, ইমামদের প্রশিক্ষণ ও কমিউনিটি গঠনে সহায়তা।", tags: ["খুতবা", "প্রশিক্ষণ", "কমিউনিটি"] },
  ];
  return (
    <section id="activities" style={{ padding: "80px 5%", background: colors.cream }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <SectionLabel center>কার্যক্রম</SectionLabel>
        <SectionTitle center>আমাদের কার্যক্রম সমূহ</SectionTitle>
        <GoldBar center />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: "1.8rem" }}>
        {acts.map((a, i) => (
          <div key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 16, overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
              boxShadow: hovered === i ? "0 16px 40px rgba(10,42,26,0.1)" : "0 4px 20px rgba(10,42,26,0.06)",
              transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
              transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
            }}>
            <div style={{ padding: "1.6rem", background: `linear-gradient(135deg, ${colors.greenRich}, ${colors.greenDeep})`, display: "flex", gap: "1rem", alignItems: "center" }}>
              <span style={{ fontSize: "1.8rem" }}>{a.icon}</span>
              <div>
                <div style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "1.1rem" }}>{a.title}</div>
                <div style={{ color: colors.goldLight, fontSize: "0.78rem" }}>{a.sub}</div>
              </div>
            </div>
            <div style={{ padding: "1.5rem", background: colors.white }}>
              <p style={{ color: colors.textMid, fontSize: "0.88rem", lineHeight: 1.85, marginBottom: "1rem" }}>{a.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {a.tags.map((t, j) => (
                  <span key={j} style={{ padding: "3px 12px", borderRadius: 20, fontSize: "0.74rem", background: "rgba(26,92,56,0.08)", color: colors.greenRich, border: "1px solid rgba(26,92,56,0.15)" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── INVOLVE ──────────────────────────────────────────
function Involve({ toast }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", area: "", msg: "" });
  const options = [
    { icon: "🙋", title: "স্বেচ্ছাসেবক হোন", desc: "আপনার দক্ষতা ও সময় দিয়ে আমাদের কার্যক্রমে অংশগ্রহণ করুন।" },
    { icon: "🌐", title: "দাওয়াহ টিমে যোগ দিন", desc: "অনলাইন ও অফলাইনে ইসলামের সঠিক বার্তা ছড়িয়ে দিতে আমাদের দলে আসুন।" },
    { icon: "📢", title: "শেয়ার করুন", desc: "আমাদের কন্টেন্ট বন্ধু ও পরিবারের সাথে শেয়ার করে দাওয়াহে অংশ নিন।" },
    { icon: "💰", title: "আর্থিক সহায়তা", desc: "আপনার সদকাহ ও যাকাত দিয়ে আমাদের দাতব্য কার্যক্রমকে এগিয়ে নিন।" },
  ];
  const inp = (field) => ({
    value: form[field],
    onChange: e => setForm(f => ({ ...f, [field]: e.target.value })),
    style: {
      width: "100%", padding: "10px 13px", borderRadius: 10,
      border: "1px solid rgba(201,168,76,0.3)", background: colors.white,
      fontSize: "0.88rem", color: colors.textDark, outline: "none",
      fontFamily: "inherit",
    },
  });
  const submit = () => {
    if (!form.name || !form.phone) { toast("⚠️ নাম ও মোবাইল নম্বর আবশ্যক।"); return; }
    toast("✅ জাযাকাল্লাহ খাইর! আপনার নিবন্ধন সফল হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।");
    setForm({ name: "", phone: "", email: "", area: "", msg: "" });
  };
  return (
    <section id="involve" style={{ padding: "80px 5%", background: colors.white }}>
      <SectionLabel>অংশগ্রহণ</SectionLabel>
      <SectionTitle>আমাদের সাথে যোগ দিন</SectionTitle>
      <GoldBar />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3rem" }}>
        <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
          {options.map((o, i) => (
            <div key={i} style={{ padding: "1.3rem", borderRadius: 14, border: "1px solid rgba(201,168,76,0.2)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.7rem", flexShrink: 0 }}>{o.icon}</span>
              <div>
                <h4 style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, marginBottom: "0.3rem" }}>{o.title}</h4>
                <p style={{ fontSize: "0.84rem", color: colors.textMid, lineHeight: 1.75 }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: colors.cream, borderRadius: 20, padding: "2rem", border: "1px solid rgba(201,168,76,0.2)" }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, fontSize: "1.4rem", marginBottom: "1.5rem" }}>স্বেচ্ছাসেবক নিবন্ধন</h3>
          {[["পূর্ণ নাম *", "name", "text", "আপনার নাম লিখুন"], ["মোবাইল নম্বর *", "phone", "tel", "01XXXXXXXXX"], ["ইমেইল", "email", "email", "example@email.com"]].map(([label, field, type, ph]) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem", letterSpacing: "0.04em" }}>{label}</label>
              <input type={type} placeholder={ph} {...inp(field)} />
            </div>
          ))}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>আগ্রহের ক্ষেত্র</label>
            <select value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1px solid rgba(201,168,76,0.3)", background: colors.white, fontSize: "0.88rem", color: colors.textDark, outline: "none", fontFamily: "inherit" }}>
              <option value="">বেছে নিন</option>
              {["দাওয়াহ ও প্রচারণা", "ইসলামী শিক্ষা", "দাতব্য কার্যক্রম", "যুব উন্নয়ন", "সোশ্যাল মিডিয়া", "অন্যান্য"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>আপনার বার্তা</label>
            <textarea placeholder="কেন যোগ দিতে চান?" {...inp("msg")} style={{ ...inp("msg").style, minHeight: 80, resize: "vertical" }} />
          </div>
          <button onClick={submit} style={{
            width: "100%", padding: 13, border: "none", borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.greenRich}, ${colors.greenMid})`,
            color: "#fff", fontSize: "1rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "Georgia, serif", letterSpacing: "0.04em",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >নিবন্ধন করুন — জাযাকাল্লাহ খাইর 🤲</button>
        </div>
      </div>
    </section>
  );
}

// ── DONATION ─────────────────────────────────────────
function Donate({ toast }) {
  const amounts = ["১০০", "৫০০", "১০০০", "৫০০০", "অন্য পরিমাণ"];
  const pays = [{ icon: "📱", label: "bKash" }, { icon: "📲", label: "Nagad" }, { icon: "🏦", label: "ব্যাংক" }];
  const [selAmt, setSelAmt] = useState(1);
  const [selPay, setSelPay] = useState(0);
  const [name, setName] = useState("");
  const [custom, setCustom] = useState("");

  const submit = () => {
    toast("🤲 আল্লাহ আপনার দান কবুল করুন। bKash/Nagad: 01780494163 নম্বরে পাঠান।");
  };

  return (
    <section id="donate" style={{ padding: "80px 5%", background: `linear-gradient(160deg, ${colors.cream}, #ede9dd)` }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <SectionLabel center>সদকাহ</SectionLabel>
          <SectionTitle center>দান করুন, সওয়াব অর্জন করুন</SectionTitle>
          <GoldBar center />
        </div>
        {/* Sadaqah banner */}
        <div style={{ background: `linear-gradient(135deg, ${colors.greenMid}, ${colors.greenDeep})`, borderRadius: 16, padding: "1.8rem", marginBottom: "2rem", textAlign: "center" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", color: colors.goldLight, marginBottom: "0.6rem", direction: "rtl" }}>
            مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ
          </p>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", fontStyle: "italic" }}>
            "যারা আল্লাহর পথে সম্পদ ব্যয় করে তাদের উদাহরণ হলো সেই শস্যের মতো যা সাতটি শীষ জন্মায়..." — সূরা বাকারাহ: ২৬১
          </p>
        </div>
        {/* Form */}
        <div style={{ background: colors.white, borderRadius: 20, padding: "2.5rem", boxShadow: "0 20px 60px rgba(10,42,26,0.1)" }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, fontSize: "1.4rem", marginBottom: "1.5rem" }}>অনুদান প্রদান করুন</h3>
          <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.6rem" }}>পরিমাণ নির্বাচন করুন (টাকা)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginBottom: "1.5rem" }}>
            {amounts.map((a, i) => (
              <button key={i} onClick={() => setSelAmt(i)} style={{
                padding: "8px 20px", borderRadius: 25, cursor: "pointer",
                border: `1.5px solid ${selAmt === i ? colors.gold : "rgba(201,168,76,0.3)"}`,
                background: selAmt === i ? colors.gold : "transparent",
                color: selAmt === i ? colors.greenDeep : colors.textMid,
                fontWeight: selAmt === i ? 700 : 400,
                fontSize: "0.88rem", fontFamily: "inherit", transition: "all 0.2s",
              }}>{a}</button>
            ))}
          </div>
          {selAmt === 4 && (
            <div style={{ marginBottom: "1.2rem" }}>
              <input type="number" placeholder="পরিমাণ লিখুন (টাকায়)" value={custom} onChange={e => setCustom(e.target.value)}
                style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1px solid rgba(201,168,76,0.3)", background: colors.cream, fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }} />
            </div>
          )}
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>নাম (ঐচ্ছিক)</label>
            <input type="text" placeholder="আপনার নাম" value={name} onChange={e => setName(e.target.value)}
              style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1px solid rgba(201,168,76,0.3)", background: colors.white, fontSize: "0.88rem", outline: "none", fontFamily: "inherit" }} />
          </div>
          <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.6rem" }}>পেমেন্ট পদ্ধতি</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.7rem", marginBottom: "0.6rem" }}>
            {pays.map((p, i) => (
              <button key={i} onClick={() => setSelPay(i)} style={{
                padding: 12, borderRadius: 10, cursor: "pointer", textAlign: "center",
                border: `1.5px solid ${selPay === i ? colors.greenRich : "rgba(201,168,76,0.25)"}`,
                background: selPay === i ? "rgba(26,92,56,0.07)" : "transparent",
                color: selPay === i ? colors.greenRich : colors.textMid,
                fontWeight: selPay === i ? 700 : 400,
                fontSize: "0.82rem", fontFamily: "inherit", transition: "all 0.2s",
              }}>
                <span style={{ display: "block", fontSize: "1.3rem", marginBottom: 3 }}>{p.icon}</span>
                {p.label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: "0.8rem", color: colors.textMid, marginBottom: "1.5rem" }}>
            bKash/Nagad নম্বর: <strong style={{ color: colors.greenDeep }}>01780494163</strong>
          </p>
          <button onClick={submit} style={{
            width: "100%", padding: 14, border: "none", borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`,
            color: colors.greenDeep, fontSize: "1rem", fontWeight: 700, cursor: "pointer",
            fontFamily: "Georgia, serif", letterSpacing: "0.04em", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >দান করুন — আল্লাহ কবুল করুন 🤲</button>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────
function Contact({ toast }) {
  const [form, setForm] = useState({ name: "", contact: "", subject: "সাধারণ জিজ্ঞাসা", msg: "" });
  const inp = (field) => ({
    value: form[field],
    onChange: e => setForm(f => ({ ...f, [field]: e.target.value })),
    style: {
      width: "100%", padding: "10px 13px", borderRadius: 10,
      border: "1px solid rgba(201,168,76,0.3)", background: colors.white,
      fontSize: "0.88rem", color: colors.textDark, outline: "none", fontFamily: "inherit",
    },
  });
  const submit = () => {
    if (!form.name || !form.contact) { toast("⚠️ নাম ও যোগাযোগের তথ্য আবশ্যক।"); return; }
    toast("✉️ আপনার বার্তা পাঠানো হয়েছে। আমরা শীঘ্রই উত্তর দেব। ইনশাআল্লাহ।");
    setForm({ name: "", contact: "", subject: "সাধারণ জিজ্ঞাসা", msg: "" });
  };
  const info = [
    { icon: "📱", title: "হোয়াটসঅ্যাপ / ফোন", value: "01780494163", href: "tel:+8801780494163" },
    { icon: "✉️", title: "ইমেইল", value: "abdkafi1212@gmail.com", href: "mailto:abdkafi1212@gmail.com" },
    { icon: "📍", title: "অবস্থান", value: "বাংলাদেশ", href: null },
    { icon: "🕐", title: "যোগাযোগের সময়", value: "সোম — শুক্র: সকাল ৯টা — রাত ৯টা", href: null },
  ];
  return (
    <section id="contact" style={{ padding: "80px 5%", background: colors.white }}>
      <SectionLabel>যোগাযোগ</SectionLabel>
      <SectionTitle>আমাদের সাথে যোগাযোগ করুন</SectionTitle>
      <GoldBar />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "3rem" }}>
        <div style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
          {info.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1.2rem", borderRadius: 12, border: "1px solid rgba(201,168,76,0.2)" }}>
              <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, fontSize: "0.95rem", marginBottom: "0.2rem" }}>{c.title}</div>
                {c.href ? (
                  <a href={c.href} style={{ color: colors.textMid, fontSize: "0.87rem", textDecoration: "none" }}>{c.value}</a>
                ) : (
                  <p style={{ color: colors.textMid, fontSize: "0.87rem" }}>{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: colors.cream, borderRadius: 20, padding: "2rem" }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: colors.greenDeep, fontSize: "1.4rem", marginBottom: "1.5rem" }}>বার্তা পাঠান</h3>
          {[["আপনার নাম *", "name", "text", "পূর্ণ নাম"], ["ইমেইল / ফোন *", "contact", "text", "যোগাযোগের তথ্য"]].map(([label, field, type, ph]) => (
            <div key={field} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>{label}</label>
              <input type={type} placeholder={ph} {...inp(field)} />
            </div>
          ))}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>বিষয়</label>
            <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} style={{ width: "100%", padding: "10px 13px", borderRadius: 10, border: "1px solid rgba(201,168,76,0.3)", background: colors.white, fontSize: "0.88rem", color: colors.textDark, outline: "none", fontFamily: "inherit" }}>
              {["সাধারণ জিজ্ঞাসা", "স্বেচ্ছাসেবক হতে চাই", "দাওয়াহ বিষয়ক", "দাতব্য সহায়তা", "অন্যান্য"].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: "1.2rem" }}>
            <label style={{ display: "block", fontSize: "0.8rem", color: colors.textMid, marginBottom: "0.35rem" }}>আপনার বার্তা *</label>
            <textarea placeholder="আপনার বার্তা এখানে লিখুন..." {...inp("msg")} style={{ ...inp("msg").style, minHeight: 110, resize: "vertical" }} />
          </div>
          <button onClick={submit} style={{
            width: "100%", padding: 13, border: "none", borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.greenRich}, ${colors.greenMid})`,
            color: "#fff", fontSize: "1rem", fontWeight: 600, cursor: "pointer",
            fontFamily: "Georgia, serif", transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >বার্তা পাঠান ✉️</button>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────
function Footer({ scrollTo }) {
  const links = [["দাওয়াহ ক্যাম্পেইন","activities"],["স্টাডি সার্কেল","activities"],["দাতব্য কার্যক্রম","activities"],["যুব উন্নয়ন","activities"],["রমাদান প্রোগ্রাম","activities"]];
  const nav = [["হোম","home"],["আমাদের সম্পর্কে","about"],["স্বেচ্ছাসেবক","involve"],["দান করুন","donate"],["যোগাযোগ","contact"]];
  return (
    <footer style={{ background: colors.greenDeep, color: "rgba(255,255,255,0.65)", padding: "3rem 5% 2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "3rem", marginBottom: "2.5rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.gold}, ${colors.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", color: colors.greenDeep, fontWeight: 700, fontSize: 16 }}>ا</div>
            <span style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem" }}>আল ইসলাহ ফাউন্ডেশন</span>
          </div>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>ইসলামের আলোয় একটি আলোকিত সমাজ গড়ার স্বপ্ন নিয়ে আমরা কাজ করে যাচ্ছি।</p>
          <p style={{ marginTop: "1rem", fontFamily: "Georgia, serif", color: colors.goldLight, fontSize: "1rem" }}>رَبَّنَا تَقَبَّلْ مِنَّا</p>
        </div>
        <div>
          <h4 style={{ color: colors.goldLight, fontFamily: "Georgia, serif", marginBottom: "1rem" }}>কার্যক্রম</h4>
          {links.map(([l, id]) => (
            <button key={l} onClick={() => scrollTo(id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", cursor: "pointer", marginBottom: "0.5rem", padding: 0, fontFamily: "inherit", textAlign: "left" }}>{l}</button>
          ))}
        </div>
        <div>
          <h4 style={{ color: colors.goldLight, fontFamily: "Georgia, serif", marginBottom: "1rem" }}>লিংক</h4>
          {nav.map(([l, id]) => (
            <button key={l} onClick={() => scrollTo(id)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", cursor: "pointer", marginBottom: "0.5rem", padding: 0, fontFamily: "inherit", textAlign: "left" }}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
        <p style={{ fontSize: "0.8rem" }}>© ২০২৪ আল ইসলাহ ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত।</p>
        <span style={{ fontFamily: "Georgia, serif", color: colors.goldLight, fontSize: "0.95rem", direction: "rtl" }}>وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ</span>
      </div>
    </footer>
  );
}

// ── APP ──────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("home");
  const [toastState, fireToast] = useToast();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <div style={{ fontFamily: "'Noto Serif Bengali', Georgia, 'Times New Roman', serif", background: colors.white, color: colors.textDark, overflowX: "hidden" }}>
      <Navbar active={active} setActive={setActive} />
      <div style={{ paddingTop: 0 }}>
        <Hero scrollTo={scrollTo} />
        <Stats />
        <Focus />
        <Quote />
        <About />
        <Activities />
        <Involve toast={fireToast} />
        <Donate toast={fireToast} />
        <Contact toast={fireToast} />
        <Footer scrollTo={scrollTo} />
      </div>
      <Toast msg={toastState.msg} show={toastState.show} />
    </div>
  );
}