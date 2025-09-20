"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = (q = "") => {
    let data = JSON.parse(localStorage.getItem("submissions")) || [];
    if (q) {
      const lower = q.toLowerCase();
      data = data.filter((s) =>
        `${s["student-id"]} ${s["student-name"]} ${s["student-email"]}`
          .toLowerCase()
          .includes(lower)
      );
    }
    setSubmissions(data.reverse());
  };

  const approve = (index) => {
    let data = JSON.parse(localStorage.getItem("submissions")) || [];
    data[index].approved = true;
    data[index].revoked = false;
    localStorage.setItem("submissions", JSON.stringify(data));
    loadSubmissions(query);
  };

  const revoke = (index) => {
    let data = JSON.parse(localStorage.getItem("submissions")) || [];
    data[index].approved = false;
    data[index].revoked = true;
    localStorage.setItem("submissions", JSON.stringify(data));
    loadSubmissions(query);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] p-8">
      <h2 className="text-[#4dabf7] text-2xl font-bold mb-6">
        Admin Dashboard
      </h2>
      <input
        type="text"
        placeholder="Search by ID, Name, or Email..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          loadSubmissions(e.target.value);
        }}
        className="w-full p-2 mb-6 rounded border border-[#444] bg-[#1e1e1e] text-[#f5f5f5]"
      />

      {submissions.length === 0 && <p>No submissions yet.</p>}

      {submissions.map((s, i) => (
        <div key={i} className="bg-[#1e1e1e] p-4 mb-4 rounded shadow-md">
          <p>
            <strong>ID:</strong> {s["student-id"]}
          </p>
          <p>
            <strong>Name:</strong> {s["student-name"]}
          </p>
          <p>
            <strong>Email:</strong> {s["student-email"]}
          </p>
          <p>
            Status:{" "}
            {s.revoked ? (
              <span className="text-[#ff9800] font-bold">❌ Revoked</span>
            ) : s.approved ? (
              <span className="text-[#4caf50] font-bold">✅ Approved</span>
            ) : (
              <span className="text-[#f44336] font-bold">❌ Pending</span>
            )}
          </p>
          {!s.revoked && !s.approved && (
            <button
              onClick={() => approve(i)}
              className="mt-2 px-4 py-1 rounded bg-[#4dabf7] hover:bg-[#339af0]"
            >
              Approve
            </button>
          )}
          {s.approved && (
            <button
              onClick={() => revoke(i)}
              className="mt-2 ml-2 px-4 py-1 rounded bg-[#f44336] hover:bg-[#d32f2f]"
            >
              Revoke
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
