import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";

/* --------------------------- Floating Layers --------------------------- */

const FLAG_FILES = [
  "us.svg", "fr.svg", "es.svg", "de.svg", "jp.svg",
  "cn.svg", "ng.svg", "in.svg", "it.svg", "br.svg", "gb.svg",
];

const GREETINGS = [
  "Hello", "Bonjour", "Hola", "Nǐ hǎo", "Namaste", "Ciao",
  "Olá", "Salam", "Konnichiwa", "Guten Tag", "Zdravstvuyte", "Merhaba",
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FloatingFlags = ({ maxItems = 12, intervalMs = 1200 }) => {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      setItems((prev) => {
        const next = [...prev];
        if (next.length >= maxItems) next.shift();
        idRef.current += 1;
        next.push({
          id: idRef.current,
          src: `/flags/${pick(FLAG_FILES)}`,
          x: `${Math.round(rand(5, 90))}%`,
          size: Math.round(rand(28, 44)),
          dur: rand(9, 14),
          sway: Math.round(rand(10, 28)),
          opacity: rand(0.12, 0.22),
          delay: rand(0, 0.8),
        });
        return next;
      });
    };

    for (let i = 0; i < Math.min(6, maxItems); i++) spawn();
    const t = setInterval(spawn, intervalMs);
    return () => clearInterval(t);
  }, [maxItems, intervalMs]);

  const remove = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="absolute inset-0 pointer-events-none select-none hidden sm:block">
      {items.map((f) => (
        <motion.img
          key={f.id}
          src={f.src}
          alt=""
          aria-hidden="true"
          className="absolute"
          style={{
            left: f.x,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))",
          }}
          initial={{ y: "110vh", x: 0, rotate: 0 }}
          animate={{
            y: "-15vh",
            x: [0, f.sway, 0, -f.sway, 0],
            rotate: [0, 6, 0, -6, 0],
          }}
          transition={{
            duration: f.dur,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1],
            delay: f.delay,
          }}
          onAnimationComplete={() => remove(f.id)}
        />
      ))}
    </div>
  );
};

const FloatingPhrases = ({
  maxItems = 10,
  intervalMs = 1200,
  palette = ["from-blue-700 to-purple-700", "from-indigo-700 to-pink-700"],
}) => {
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const spawn = () => {
      setItems((prev) => {
        const next = [...prev];
        if (next.length >= maxItems) next.shift();
        idRef.current += 1;
        const left = `${Math.round(rand(6, 88))}%`;
        next.push({
          id: idRef.current,
          text: pick(GREETINGS),
          left,
          dur: rand(7, 11),
          opacity: rand(0.18, 0.35),
          delay: rand(0, 0.6),
          gradient: pick(palette),
          size: rand(0, 1) > 0.5 ? "text-base" : "text-sm",
        });
        return next;
      });
    };

    for (let i = 0; i < Math.min(5, maxItems); i++) spawn();
    const t = setInterval(spawn, intervalMs);
    return () => clearInterval(t);
  }, [maxItems, intervalMs, palette]);

  const remove = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="absolute inset-0 pointer-events-none select-none hidden sm:block">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute font-semibold bg-clip-text text-transparent ${p.size}`}
          style={{
            left: p.left,
            opacity: p.opacity,
            whiteSpace: "nowrap",
          }}
          initial={{ y: "108vh" }}
          animate={{ y: "-12vh" }}
          transition={{ duration: p.dur, ease: "easeInOut", delay: p.delay }}
          onAnimationComplete={() => remove(p.id)}
        >
          <span className={`bg-gradient-to-r ${p.gradient}`}>{p.text}</span>
        </motion.span>
      ))}
    </div>
  );
};

/* ----------------------------- Login Page ----------------------------- */

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await signIn(emailOrUsername, password);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Floating Background Layers */}
      <div className="absolute inset-0 z-0">
        <FloatingFlags maxItems={12} intervalMs={1200} />
        <FloatingPhrases maxItems={10} intervalMs={1200} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/60">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your <span className="font-semibold">Fluent.io</span> account
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <Input
                type="text"
                label="Email or Username"
                placeholder="Enter your email or username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                error={error && !emailOrUsername ? "Email or username is required" : ""}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && !password ? "Password is required" : ""}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Login;

// DEBUG: Checked Login animation flow and floating elements rendering properly.
