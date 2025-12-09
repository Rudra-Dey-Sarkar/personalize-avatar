import UploadBox from "@/components/upload-box/upload-box";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create Personalized Cartoon Character
      </h1>

      <UploadBox />
    </main>
  );
}
