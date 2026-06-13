import { motion } from "framer-motion";
import {
  Leaf,
  Brain,
  Activity,
  Download,
  BookOpen,
} from "lucide-react";

import ImageUploader from "../components/ImageUploader";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

import reportPDF from "../assets/report.pdf";

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-10">
        
        {/* Research Paper Button */}
        <div className="mb-8 flex justify-start">
          <a
            href={reportPDF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:bg-green-700 hover:shadow-xl"
          >
            <BookOpen size={18} />
            View Research Paper
          </a>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-600 text-white shadow-xl">
            <Leaf size={40} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Tomato Leaf Disease Detection
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            An AI-powered tomato leaf disease classification system using
            <span className="font-semibold text-green-700">
              {" "}
              EfficientNet-B0
            </span>{" "}
            and
            <span className="font-semibold text-green-700">
              {" "}
              Grad-CAM Explainable AI
            </span>
            . Upload a tomato leaf image to receive disease predictions,
            confidence scores, visual explanations, and treatment suggestions.
          </p>

          {/* Technology Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="badge">
              <Brain size={16} />
              EfficientNet-B0
            </span>

            <span className="badge">
              <Activity size={16} />
              Grad-CAM Explainability
            </span>

            <span className="badge">
              <Leaf size={16} />
              10 Tomato Classes
            </span>
          </div>

          {/* Quick Stats */}
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">95.1%</h3>
              <p className="mt-1 text-sm text-slate-600">
                Validation Accuracy
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">10</h3>
              <p className="mt-1 text-sm text-slate-600">
                Disease Categories
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">11K</h3>
              <p className="mt-1 text-sm text-slate-600">
                Total Images
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h3 className="text-3xl font-bold text-green-600">XAI</h3>
              <p className="mt-1 text-sm text-slate-600">
                Explainable AI
              </p>
            </div>
          </div>
        </motion.div>

        {/* Upload + Prediction Section */}
        <ImageUploader />

        {/* Project Information */}
        <InfoSection />
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default Home;