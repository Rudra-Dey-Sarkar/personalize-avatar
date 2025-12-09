"use client";

import { useState, DragEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please upload a photo first");
      return;
    }

    setLoading(true);
    toast.info("Generating your personalized character...");

    const form = new FormData();
    form.append("photo", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      if (!data.image) {
        toast.error("Failed to generate image.");
        setLoading(false);
        return;
      }

      setResult(data.image);
      toast.success("Character created successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    }

    setLoading(false);
  };

  const downloadImage = async () => {
    if (!result) return;

    try {
      const response = await fetch(result);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "personalized-character.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 md:p-8 transition-all border border-gray-200">
      {/* Upload Section */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all"
        onClick={() => document.getElementById("uploader")?.click()}
      >
        {!preview ? (
          <p className="text-gray-500 text-center">
            Drag & drop an image here or <span className="text-blue-600 font-semibold">browse</span>
          </p>
        ) : (
          <Image
            src={preview}
            alt="preview"
            width={300}
            height={300}
            className="rounded-lg shadow-md object-cover"
          />
        )}

        <input
          id="uploader"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileSelect(file);
          }}
        />
      </div>

      {/* Generate button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 shadow-md"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            Creating...
          </span>
        ) : (
          "Create Personalized Cartoon Character"
        )}
      </button>

      {/* Result */}
      {result && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Your Personalized Character
          </h3>

          <Image
            src={result}
            alt="result"
            width={500}
            height={500}
            className="rounded-xl shadow-lg w-full object-cover"
          />

          <button
            onClick={downloadImage}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md transition"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
