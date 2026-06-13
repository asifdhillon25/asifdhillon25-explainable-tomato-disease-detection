import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, ImagePlus, Loader2, X } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { predictDisease } from "../services/api";
import ResultCard from "./ResultCard";

function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selected = acceptedFiles[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".webp"],
    },
  });

  const handlePredict = async () => {
    if (!file) {
      toast.error("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);
      const data = await predictDisease(file);
      setResult(data);
      toast.success("Prediction completed!");
    } catch (error) {
      console.error(error);
      toast.error("Prediction failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview("");
    setResult(null);
  };

  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        className="rounded-3xl border border-green-100 bg-white p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold">Upload Leaf Image</h2>
        <p className="mt-2 text-sm text-slate-500">
          Supported formats: JPG, JPEG, PNG, WEBP
        </p>

        <div
          {...getRootProps()}
          className={`mt-6 flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition ${
            isDragActive
              ? "border-green-600 bg-green-50"
              : "border-slate-300 bg-slate-50 hover:border-green-500"
          }`}
        >
          <input {...getInputProps()} />

          {preview ? (
            <div className="relative w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute right-3 top-3 rounded-full bg-white p-2 shadow"
              >
                <X size={18} />
              </button>

              <img
                src={preview}
                alt="Uploaded leaf"
                className="mx-auto max-h-72 rounded-xl object-contain"
              />
            </div>
          ) : (
            <>
              <ImagePlus className="mb-4 text-green-600" size={56} />
              <p className="font-semibold">
                {isDragActive
                  ? "Drop the image here"
                  : "Drag & drop leaf image here"}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                or click to browse from your device
              </p>
            </>
          )}
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing Leaf...
            </>
          ) : (
            <>
              <UploadCloud size={20} />
              Predict Disease
            </>
          )}
        </button>
      </motion.div>

      <ResultCard result={result} loading={loading} />
    </section>
  );
}

export default ImageUploader;