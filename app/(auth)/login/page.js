"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/AuthLayout";

import { apiRequest } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { saveAuthSession } from "@/lib/auth";


export default function LoginPage() {

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [language, setLanguage] = useState("bn");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // =====================================
  // HANDLE LOGIN
  // =====================================

  async function handleLogin(event) {

    event.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);


    try {

      // Swagger requires URL-encoded form data
      const formData = new URLSearchParams();

      formData.append("username", phone);

      formData.append("password", password);


      // Send login request
      const response = await apiRequest(
        API_ENDPOINTS.auth.login,
        {
          method: "POST",
          body: formData,
          language,
        }
      );


      // Save backend authentication response
      saveAuthSession(response);


      setSuccess(
        `Login successful. Role: ${response.role}`
      );


      // Existing dashboard routes
      const role = String(response.role).toLowerCase();

      if (role === "super_admin" || role === "superadmin") {

        window.location.assign("/super-admin/dashboard");

      } else if (role === "admin") {

        window.location.assign("/admin/dashboard");

      }

      // Provider and seeker dashboards will be connected
      // when their respective dashboard screens are built.


    } catch (err) {

      setError(
        err.message || "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }

  }


  return (

    <AuthLayout
      title="Welcome Back"
      subtitle="Login to access your Nirbhor account."
    >

      <form
        onSubmit={handleLogin}
        className="space-y-5"
      >

        {/* PHONE NUMBER */}

        <div>

          <label className="label">
            <span className="label-text font-medium">
              Phone Number / ফোন নম্বর
            </span>
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(event) =>
              setPhone(event.target.value)
            }
            placeholder="e.g. 01712345678"
            className="input input-bordered w-full"
            required
          />

        </div>


        {/* PASSWORD */}

        <div>

          <label className="label">
            <span className="label-text font-medium">
              Password / পাসওয়ার্ড
            </span>
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              className="input input-bordered w-full pr-16"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-teal-700"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>


        {/* LANGUAGE */}

        <div>

          <label className="label">
            <span className="label-text font-medium">
              Preferred Language / পছন্দের ভাষা
            </span>
          </label>

          <select
            value={language}
            onChange={(event) =>
              setLanguage(event.target.value)
            }
            className="select select-bordered w-full"
          >
            <option value="bn">
              বাংলা
            </option>

            <option value="en">
              English
            </option>

          </select>

        </div>


        {/* ERROR */}

        {error && (

          <div className="alert alert-error text-sm">
            {error}
          </div>

        )}


        {/* SUCCESS */}

        {success && (

          <div className="alert alert-success text-sm">
            {success}
          </div>

        )}


        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-none bg-[#00695C] text-white hover:bg-[#00574C]"
        >

          {loading
            ? "Please wait..."
            : "Login / লগইন করুন →"
          }

        </button>


        {/* REGISTER LINK */}

        <p className="text-center text-sm text-slate-500">

          Don't have an account?

          {" "}

          <Link
            href="/register"
            className="font-semibold text-teal-700 hover:underline"
          >
            Register Now
          </Link>

        </p>

      </form>

    </AuthLayout>

  );

}