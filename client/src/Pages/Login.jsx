import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "User";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [mode, setMode] = useState("login");

  useEffect(() => {
    setMode("login");
  }, [role]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitting ${role} ${mode}:`, form);
    // TODO: API call + auth handling
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4 py-8 sm:px-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-xl p-8 sm:p-10 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
          <span>{role}</span> {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <div className="space-y-5">
          {mode === "register" && (
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-gray-700 font-medium">
                Name
              </label>
              <input
                name="name"
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={`${role.toLowerCase()}@example.com`}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
        </div>

        <p className="text-sm text-center text-gray-600 mt-5">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-indigo-500 hover:underline font-medium"
          >
            {mode === "login" ? "Sign up here" : "Login here"}
          </button>
        </p>

        <button
          type="submit"
          className="mt-5 bg-indigo-600 hover:bg-indigo-700 w-full text-white font-medium py-2 rounded-md shadow-sm transition duration-200"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
