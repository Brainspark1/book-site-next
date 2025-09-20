"use client";
import { useState } from "react";

export default function SignUpPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];
    submissions.push({ ...data, approved: false, revoked: false });
    localStorage.setItem("submissions", JSON.stringify(submissions));

    setStatus("Submitted successfully!");
    e.target.reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1e1e1e] text-[#e0e0e0]">
      <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-center text-[#0078d4] text-2xl font-bold mb-6">
          Village Robotics 9289 Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="student-id"
              className="block text-sm mb-1 text-[#b0b0b0]"
            >
              Student ID *
            </label>
            <input
              type="text"
              name="student-id"
              required
              className="w-full p-2 rounded bg-[#1e1e1e] border border-[#444] text-[#e0e0e0] focus:outline-none focus:border-[#0078d4]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="student-name"
              className="block text-sm mb-1 text-[#b0b0b0]"
            >
              Name *
            </label>
            <input
              type="text"
              name="student-name"
              required
              className="w-full p-2 rounded bg-[#1e1e1e] border border-[#444] text-[#e0e0e0] focus:outline-none focus:border-[#0078d4]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="student-email"
              className="block text-sm mb-1 text-[#b0b0b0]"
            >
              Email *
            </label>
            <input
              type="email"
              name="student-email"
              required
              className="w-full p-2 rounded bg-[#1e1e1e] border border-[#444] text-[#e0e0e0] focus:outline-none focus:border-[#0078d4]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded bg-[#0078d4] hover:bg-[#005fa3] font-bold"
          >
            Sign Up
          </button>
          {status && (
            <p className="text-center mt-3 text-[#80caff]">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
}
