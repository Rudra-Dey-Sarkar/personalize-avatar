import UploadBox from "@/components/upload-box/upload-box";

export default function page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-8 bg-gradient-to-b from-[#f8fafc] to-[#eef2ff]">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 text-center drop-shadow-sm">
        Create Personalized Cartoon Character
      </h1>

      <p className="text-gray-600 text-center max-w-xl mb-8">
        Upload a photo and watch AI transform it into a beautifully illustrated children’s character.
      </p>

      <UploadBox />
    </main>
  );
}
