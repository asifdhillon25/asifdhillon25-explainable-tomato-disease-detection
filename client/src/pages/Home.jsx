import { motion } from "framer-motion";
import { Leaf, Brain, Activity } from "lucide-react";
import ImageUploader from "../components/ImageUploader";
import InfoSection from "../components/InfoSection";
import Footer from "../components/Footer";

function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg">
            <Leaf size={34} />
          </div>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Tomato Leaf Disease Detection
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Upload a tomato leaf image and get disease prediction, confidence
            score, Grad-CAM visual explanation, and treatment recommendation.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="badge">
              <Brain size={16} /> EfficientNet-B0
            </span>
            <span className="badge">
              <Activity size={16} /> Grad-CAM Explainability
            </span>
            <span className="badge">
              <Leaf size={16} /> 10 Tomato Classes
            </span>
          </div>
        </motion.div>

        <ImageUploader />

        <InfoSection />
      </section>

      <Footer />
    </main>
  );
}

export default Home;