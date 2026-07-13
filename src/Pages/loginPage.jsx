import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/loginPage.css";
import { useAuth } from "../context/AuthContext";

const LOGIN_EMAIL_KEY = "gamehub-login-email"

export default function LoginPage({ mode = "login", onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(() => localStorage.getItem(LOGIN_EMAIL_KEY) || "");
  const isSignup = mode === "signup";
  const navigate = useNavigate();
  const { login, register } = useAuth();

  useEffect(() => {
    if (!isSignup) {
      localStorage.setItem(LOGIN_EMAIL_KEY, email)
    }
  }, [email, isSignup])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onSubmit?.(data);

    if (isSignup) {
      const result = register({
        name: data.fullName || "",
        email: data.email,
        password: data.password,
      })

      if (!result.success) {
        setErrorMessage(result.message)
        return
      }
    } else {
      const result = login(data.email, data.password)

      if (!result.success) {
        setErrorMessage(result.message)
        return
      }
    }

    navigate("/")
  };

  return (
    <div className="auth-overlay">
      <div className="auth-card">
        {/* الجزء الأيسر: الفورم */}
        <div className="auth-form-panel">
          {!isSignup && (
            <button
              className="auth-close"
              aria-label="إغلاق"
              onClick={() => navigate(-1)}
            >
              ×
            </button>
          )}

          <h1 className="auth-title">
            {isSignup ? "Create an account" : "Welcome Back"}
          </h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                className="auth-input"
                name="fullName"
                type="text"
                placeholder="Full Name"
                required
              />
            )}

            <input
              className="auth-input"
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="auth-password-wrap">
              <input
                className="auth-input"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="auth-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {!isSignup ? (
              <Link to="/forgot-password" className="auth-link auth-forgot">
                Forgot your password?
              </Link>
            ) : (
              <label className="auth-checkbox-row">
                <input type="checkbox" name="agree" required />
                <span>
                  I agree with the <Link to="/terms" className="auth-link">Terms</Link> and{" "}
                  <Link to="/privacy" className="auth-link">Privacy policy</Link>
                </span>
              </label>
            )}

            {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

            <button type="submit" className="auth-submit">
              {isSignup ? "Submit" : "Log in"}
            </button>
          </form>

          {!isSignup ? (
            <p className="auth-switch">
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          ) : (
            <>
              <p className="auth-switch">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Log in
                </Link>
              </p>
              <Link to="/login" className="auth-back">
                ‹ Back
              </Link>
            </>
          )}
        </div>

        <div className="auth-image-panel" aria-hidden="true" />
      </div>
    </div>
  );
}