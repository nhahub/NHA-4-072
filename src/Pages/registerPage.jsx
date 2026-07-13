import React from "react";
import LoginPage from "./loginPage";

export default function RegisterPage({ onSubmit }) {
  return <LoginPage mode="signup" onSubmit={onSubmit} />;
}
