import { Activity, AlertCircle, CheckCircle, Flame } from "lucide-react";
import { motion } from "framer-motion";

function cleanClassName(name = "") {
  return name
    .replace("Tomato___", "")
    .replaceAll("_", " ")
    .replace("Two spotted spider mite", "Two-spotted Spider Mite");
}

function ResultCard({ result, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-3xl border border-green-100 bg-white p-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold">Prediction Result</h2>
      <p className="mt-2 text-sm text-slate-500">
        AI model output and Grad-CAM explanation will appear here.
      </p>

      {!result && !loading && (
        <div className="mt-10 flex min-h-72 flex-col items-center justify-center rounded-2xl bg-slate-50 text-center">
          <Activity className="mb-4 text-slate-400" size={54} />
          <p className="font-semibold text-slate-600">
            No prediction yet
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Upload a tomato leaf image and click predict.
          </p>
        </div>
      )}

      {loading && (
        <div className="mt-10 flex min-h-72 flex-col items-center justify-center rounded-2xl bg-green-50 text-center">
          <div className="mb-4 h-14 w-14 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="font-semibold text-green-700">
            Model is analyzing the leaf...
          </p>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-5">
          <div className="rounded-2xl bg-green-50 p-5">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle size={22} />
              <span className="font-semibold">Detected Disease</span>
            </div>

            <h3 className="mt-3 text-2xl font-bold">
              {cleanClassName(result.predicted_class)}
            </h3>

            <p className="mt-2 text-slate-600">
              Confidence:{" "}
              <span className="font-bold text-green-700">
                {Number(result.confidence).toFixed(2)}%
              </span>
            </p>
          </div>

          {result.gradcam_image && (
            <div>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Flame className="text-orange-500" size={20} />
                Grad-CAM Explanation
              </div>

              <img
                src={`data:image/png;base64,${result.gradcam_image}`}
                alt="Grad-CAM"
                className="w-full rounded-2xl border object-contain"
              />
            </div>
          )}

          {result.treatment && (
            <div className="rounded-2xl bg-amber-50 p-5">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertCircle size={20} />
                <span className="font-semibold">Treatment Suggestion</span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {result.treatment}
              </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default ResultCard;