"use client";

import { useState } from "react";
import Image from "next/image";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Please upload an image first.");

    setLoading(true);
    setResult(null);

    const form = new FormData();
    form.append("photo", file);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data.image);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg p-6 text-gray-500 bg-white rounded-xl shadow-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload a Child’s Photo
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Personalized Cartoon Character"}
      </button>

      {/* Show result */}
      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Your Personalized Character</h3>
          <Image
            src={result}
            alt="result"
            width={400}
            height={400}
            className="rounded-lg shadow w-full"
          />
        </div>
      )}
    </div>
  );
}
