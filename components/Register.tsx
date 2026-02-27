import React, { useState } from "react";

interface RegisterProps {
  onRegisterSuccess: () => void;
  goToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({
  onRegisterSuccess,
  goToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { email, password };
    localStorage.setItem("user", JSON.stringify(userData));

    onRegisterSuccess(); // ✅ direct dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1610832958506-aa56368176cf')",
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleRegister}
        className="relative z-10 w-[350px] bg-black/80 p-8 rounded-3xl text-white text-center"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="w-full bg-yellow-400 text-black py-3 rounded-xl mb-5">
          Register
        </button>

        <p
          onClick={goToLogin}
          className="text-sm cursor-pointer hover:text-yellow-400"
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};