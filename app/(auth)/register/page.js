"use client";

import { useState } from "react";
import Link from "next/link";

import AuthLayout from "@/components/AuthLayout";

import { apiRequest } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/endpoints";
import { saveAuthSession } from "@/lib/auth";


export default function RegisterPage() {

  const [role, setRole] = useState("seeker");

  const [form, setForm] = useState({

    name_en: "",
    name_bn: "",
    phone: "",
    password: "",
    preferred_lang: "bn",

    home_latitude: "",
    home_longitude: "",
    home_address: "",

    skill_ids: "",
    latitude: "",
    longitude: "",
    working_radius_km: "",
    has_smartphone: true,
    base_address: "",

  });


  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");


  // =====================================
  // HANDLE INPUT CHANGES
  // =====================================

  function handleChange(event) {

    const { name, value, type, checked } =
      event.target;

    setForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  }


  // =====================================
  // HANDLE REGISTRATION
  // =====================================

  async function handleRegister(event) {

    event.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);


    try {

      let endpoint;

      let payload;


      // =================================
      // SEEKER REGISTRATION
      // =================================

      if (role === "seeker") {

        endpoint =
          API_ENDPOINTS.auth.registerSeeker;


        payload = {

          name_en: form.name_en,

          name_bn: form.name_bn,

          phone: form.phone,

          password: form.password,

          preferred_lang: form.preferred_lang,

          home_latitude: Number(form.home_latitude),

          home_longitude: Number(form.home_longitude),

          home_address: form.home_address,

        };

      }


      // =================================
      // PROVIDER REGISTRATION
      // =================================

      else {

        endpoint =
          API_ENDPOINTS.auth.registerProvider;


        const skillIds = form.skill_ids
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id !== "")
          .map(Number);


        if (
          skillIds.length === 0 ||
          skillIds.some((id) => !Number.isInteger(id) || id <= 0)
        ) {

          throw new Error(
            "Please enter valid skill IDs."
          );

        }


        payload = {

          name_en: form.name_en,

          name_bn: form.name_bn,

          phone: form.phone,

          password: form.password,

          preferred_lang: form.preferred_lang,

          skill_ids: skillIds,

          latitude: Number(form.latitude),

          longitude: Number(form.longitude),

          working_radius_km:
            Number(form.working_radius_km),

          has_smartphone: form.has_smartphone,

          base_address: form.base_address,

        };

      }


      // =================================
      // SEND REGISTRATION REQUEST
      // =================================

      const response = await apiRequest(
        endpoint,
        {
          method: "POST",
          body: payload,
          language: form.preferred_lang,
        }
      );


      // =================================
      // SAVE AUTHENTICATION RESPONSE
      // =================================

      if (
        response?.access_token &&
        response?.refresh_token
      ) {

        saveAuthSession(response);

        setSuccess(
          "Registration successful. Your account has been created."
        );

      } else {

        setSuccess(
          "Registration successful."
        );

      }


    } catch (err) {

      setError(
        err.message ||
        "Registration failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  }


  // =====================================
  // REUSABLE INPUT FIELD
  // =====================================

  function FormField({
    label,
    name,
    placeholder,
    type = "text",
    required = true,
    step,
  }) {

    return (

      <div>

        <label className="label">
          <span className="label-text font-medium text-slate-700">
            {label}
          </span>
        </label>

        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          step={step}
          className="input input-bordered w-full bg-white"
        />

      </div>

    );

  }


  return (

    <AuthLayout
      title="Create Account"
      subtitle="Fill in your details to get started with the verification process."
    >

      <form
        onSubmit={handleRegister}
        className="space-y-4"
      >


        {/* ROLE SELECTION */}

        <div>

          <label className="label">
            <span className="label-text font-medium">
              Account Type / অ্যাকাউন্টের ধরন
            </span>
          </label>

          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() => setRole("seeker")}
              className={`btn ${
                role === "seeker"
                  ? "border-[#00695C] bg-[#00695C] text-white"
                  : "btn-outline"
              }`}
            >
              Seeker
            </button>


            <button
              type="button"
              onClick={() => setRole("provider")}
              className={`btn ${
                role === "provider"
                  ? "border-[#00695C] bg-[#00695C] text-white"
                  : "btn-outline"
              }`}
            >
              Provider
            </button>

          </div>

        </div>


        {/* PERSONAL INFORMATION */}

        <div className="divider text-xs text-slate-400">
          Personal Information / ব্যক্তিগত তথ্য
        </div>


        <FormField
          label="Full Name (English) / পূর্ণ নাম"
          name="name_en"
          placeholder="e.g. Rahul Hasan"
        />


        <FormField
          label="Full Name (Bangla) / বাংলা নাম"
          name="name_bn"
          placeholder="যেমন: রাহুল হাসান"
        />


        <FormField
          label="Phone Number / ফোন নম্বর"
          name="phone"
          placeholder="01712345678"
          type="tel"
        />


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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="input input-bordered w-full pr-16"
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
            name="preferred_lang"
            value={form.preferred_lang}
            onChange={handleChange}
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


        {/* SEEKER FIELDS */}

        {role === "seeker" && (

          <>

            <div className="divider text-xs text-slate-400">
              Home Location / বাসার অবস্থান
            </div>


            <div className="grid grid-cols-2 gap-3">

              <FormField
                label="Home Latitude"
                name="home_latitude"
                placeholder="23.7510"
                type="number"
                step="any"
              />


              <FormField
                label="Home Longitude"
                name="home_longitude"
                placeholder="90.3930"
                type="number"
                step="any"
              />

            </div>


            <FormField
              label="Home Address / বাসার ঠিকানা"
              name="home_address"
              placeholder="House, Road, Area, District"
            />

          </>

        )}


        {/* PROVIDER FIELDS */}

        {role === "provider" && (

          <>

            <div className="divider text-xs text-slate-400">
              Service Information / সেবার তথ্য
            </div>


            <FormField
              label="Skill IDs (comma separated)"
              name="skill_ids"
              placeholder="e.g. 1, 2, 3"
            />


            <div className="grid grid-cols-2 gap-3">

              <FormField
                label="Latitude"
                name="latitude"
                placeholder="23.7510"
                type="number"
                step="any"
              />


              <FormField
                label="Longitude"
                name="longitude"
                placeholder="90.3930"
                type="number"
                step="any"
              />

            </div>


            <FormField
              label="Working Radius (KM)"
              name="working_radius_km"
              placeholder="5"
              type="number"
              step="any"
            />


            <FormField
              label="Base Address / ঠিকানা"
              name="base_address"
              placeholder="House, Road, Area, District"
            />


            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-base-300 p-3">

              <input
                type="checkbox"
                name="has_smartphone"
                checked={form.has_smartphone}
                onChange={handleChange}
                className="checkbox checkbox-success"
              />

              <span className="text-sm text-slate-700">
                I have a smartphone
              </span>

            </label>

          </>

        )}


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


        {/* REGISTER BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full border-none bg-[#00695C] text-white hover:bg-[#00574C]"
        >

          {loading
            ? "Creating Account..."
            : "Register / নিবন্ধন করুন →"
          }

        </button>


        {/* LOGIN LINK */}

        <p className="pt-2 text-center text-sm text-slate-500">

          Already have an account?

          {" "}

          <Link
            href="/login"
            className="font-semibold text-teal-700 hover:underline"
          >
            Log in
          </Link>

        </p>

      </form>

    </AuthLayout>

  );

}