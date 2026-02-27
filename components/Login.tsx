import React, { useState } from "react";

interface LoginProps {
  onLoginSuccess: () => void;
  goToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLoginSuccess,
  goToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("No user found. Please register first.");
      return;
    }

    const parsedUser = JSON.parse(savedUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      onLoginSuccess();
    } else {
      alert("Invalid credentials");
    }
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
        onSubmit={handleLogin}
        className="relative z-10 w-[350px] bg-black/80 p-8 rounded-3xl text-white text-center"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">
          Welcome Back
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
          className="w-full mb-6 px-4 py-3 rounded-xl bg-white/20"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-yellow-400 text-black py-3 rounded-xl mb-5">
          Login
        </button>

        <p
          onClick={goToRegister}
          className="text-sm cursor-pointer hover:text-yellow-400"
        >
          Create an account
        </p>
      </form>
    </div>
  );
};