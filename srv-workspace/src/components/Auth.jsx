import { useState } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { M, INP, GBtn, DBtn, Card } from "./ui/Shared";

export default function Auth() {
  // Modes: 'login', 'signup', 'forgot', 'phone'
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearMessages = () => {
    setError("");
    setMessage("");
  };

  // --- EMAIL & PASSWORD AUTH ---
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // --- FORGOT PASSWORD ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // --- PHONE AUTH ---
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    setupRecaptcha();
    
    // Ensure phone number has country code (e.g., +91 for India)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
    
    try {
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setMessage("OTP sent via SMS.");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      // User is now logged in! App.jsx will automatically detect this.
    } catch (err) {
      console.error("Authentication failed:", err);
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  // UI Helpers
  const isEmailMode = mode === "login" || mode === "signup";

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#010409" }}>
      <Card style={{ width: 360, display: "flex", flexDirection: "column", gap: 16 }}>
        
        <div style={{ ...M, fontSize: 20, color: "#c9d1d9", textAlign: "center", fontWeight: 700 }}>
          {mode === "login" && "Welcome Back"}
          {mode === "signup" && "Create Account"}
          {mode === "forgot" && "Reset Password"}
          {mode === "phone" && "Phone Login"}
        </div>

        {/* --- EMAIL/PASSWORD OR SIGNUP FORM --- */}
        {isEmailMode && (
          <form onSubmit={handleEmailAuth} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={INP} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={INP} required />
            <GBtn s={{ width: "100%", padding: "10px" }} disabled={loading}>
              {loading ? "Authenticating..." : (mode === "login" ? "Log In" : "Sign Up")}
            </GBtn>
          </form>
        )}

        {/* --- FORGOT PASSWORD FORM --- */}
        {mode === "forgot" && (
          <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="email" placeholder="Enter your registered email" value={email} onChange={e => setEmail(e.target.value)} style={INP} required />
            <GBtn s={{ width: "100%", padding: "10px" }} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </GBtn>
          </form>
        )}

        {/* --- PHONE AUTH FORM --- */}
        {mode === "phone" && !confirmationResult && (
          <form onSubmit={handleSendOtp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="tel" placeholder="Phone Number (e.g., +91...)" value={phone} onChange={e => setPhone(e.target.value)} style={INP} required />
            <GBtn s={{ width: "100%", padding: "10px" }} disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </GBtn>
          </form>
        )}

        {/* --- VERIFY OTP FORM --- */}
        {mode === "phone" && confirmationResult && (
          <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} style={INP} required />
            <GBtn s={{ width: "100%", padding: "10px" }} disabled={loading}>
              {loading ? "Verifying..." : "Verify & Log In"}
            </GBtn>
          </form>
        )}

        {/* Status Messages */}
        {error && <div style={{ ...M, fontSize: 11, color: "#fca5a5", textAlign: "center" }}>{error}</div>}
        {message && <div style={{ ...M, fontSize: 11, color: "#6ee7b7", textAlign: "center" }}>{message}</div>}

        {/* Invisible Recaptcha Container */}
        <div id="recaptcha-container"></div>

        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          {isEmailMode ? (
            <>
              <DBtn onClick={() => { setMode(mode === "login" ? "signup" : "login"); clearMessages(); }}>
                {mode === "login" ? "Need an account? Sign Up" : "Already have an account? Log In"}
              </DBtn>
              <DBtn onClick={() => { setMode("forgot"); clearMessages(); }}>Forgot Password?</DBtn>
              <DBtn onClick={() => { setMode("phone"); clearMessages(); }}>Login with Phone Instead</DBtn>
            </>
          ) : (
            <DBtn onClick={() => { setMode("login"); setConfirmationResult(null); clearMessages(); }}>
              ← Back to Email Login
            </DBtn>
          )}
        </div>

      </Card>
    </div>
  );
}