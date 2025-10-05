import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Navbar from "../ui/Navbar";

/* ---------------- Floating Multilingual Greetings ---------------- */
const GREETINGS = [
  "Hello", "Bonjour", "Hola", "Nǐ hǎo", "Namaste", "Ciao",
  "Olá", "Salam", "Konnichiwa", "Guten Tag", "Zdravstvuyte", "Merhaba",
  "Hej", "Sawubona", "Annyeong", "Yassas", "Selamat", "Privet"
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FloatingPhrases = ({
  maxItems = 12,
  intervalMs = 1500,
  palette = [
    "from-pink-600 to-purple-600",
    "from-blue-700 to-indigo-700",
    "from-emerald-600 to-teal-600",
    "from-orange-600 to-red-600",
  ],
}) => {
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
          text: pick(GREETINGS),
          left: `${Math.round(rand(5, 90))}%`,
          dur: rand(10, 16),
          opacity: rand(0.25, 0.45),
          delay: rand(0, 1),
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

  return (
    <div className="absolute inset-0 pointer-events-none select-none hidden sm:block overflow-hidden">
      {items.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute font-semibold bg-clip-text text-transparent ${p.size}`}
          style={{
            left: p.left,
            opacity: p.opacity,
            whiteSpace: "nowrap",
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, p.opacity, 0] }}
          transition={{
            duration: p.dur,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          <span className={`bg-gradient-to-r ${p.gradient}`}>{p.text}</span>
        </motion.span>
      ))}
    </div>
  );
};

/* --------------------------- Register Component --------------------------- */
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { signUp, showNavbarAfterSignup } = useAuth();
  const navigate = useNavigate();

  const validateUsername = (username) => {
    if (username.length < 3) return "Username must be at least 3 characters";
    if (username.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return "Username can only contain letters, numbers, and underscores";
    if (/^[0-9]/.test(username)) return "Username cannot start with a number";
    return "";
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value.toLowerCase();
    setUsername(newUsername);
    setUsernameError(validateUsername(newUsername));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    const formatError = validateUsername(username);
    if (formatError) {
      setError(formatError);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");

    const { data, error } = await signUp(email, password, username);
    if (error) setError(error.message);
    else {
      setRegistrationSuccess(true);
      showNavbarAfterSignup();
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Fluent.io!
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Your account has been created successfully. Check your email to verify your
                account and start using all features.
              </p>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  onClick={() => navigate("/voice-cloning")}
                  className="w-full"
                >
                  🎤 Clone Your Voice
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <Navbar />

      {/* Floating multilingual greetings */}
      <FloatingPhrases maxItems={12} intervalMs={1500} />

      {/* Soft radial glows */}
      <div className="pointer-events-none absolute -top-40 -left-36 h-96 w-96 rounded-full bg-purple-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-36 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Fluent.io</h1>
              <p className="text-gray-600">Create your account to get started</p>
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
                label="Username"
                placeholder="Choose a unique username"
                value={username}
                onChange={handleUsernameChange}
                error={usernameError}
              />

              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email ? "Email is required" : ""}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error && !password ? "Password is required" : ""}
              />

              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={
                  error && !confirmPassword ? "Please confirm your password" : ""
                }
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
                disabled={loading || !!usernameError}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Register;
