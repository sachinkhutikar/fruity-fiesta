import React, { useState } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Prediction } from "./components/Prediction";
import { About } from "./components/About";
import { ViewState } from "./types";

type AuthPage = "login" | "register";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [authPage, setAuthPage] = useState<AuthPage>("login");
  const [currentView, setCurrentView] = useState<ViewState>("home");

  const handleLogout = () => {
    console.log("Logout clicked");
    setIsLoggedIn(false);
    setAuthPage("login");
    setCurrentView("home");
  };

  if (!isLoggedIn) {
    return authPage === "login" ? (
      <Login
        onLoginSuccess={() => setIsLoggedIn(true)}
        goToRegister={() => setAuthPage("register")}
      />
    ) : (
      <Register
        onRegisterSuccess={() => setIsLoggedIn(true)}
        goToLogin={() => setAuthPage("login")}
      />
    );
  }

  const renderPage = () => {
    switch (currentView) {
      case "home":
        return <Home onStart={setCurrentView} />;
      case "prediction":
        return <Prediction />;
      case "about":
        return <About />;
      default:
        return <Home onStart={setCurrentView} />;
    }
  };

  return (
    <>
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
      />
      {renderPage()}
    </>
  );
};

export default App;