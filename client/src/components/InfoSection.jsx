import { Brain, Database, Eye, Leaf } from "lucide-react";

const items = [
  {
    icon: Database,
    title: "Dataset",
    text: "Trained on 10,000 tomato leaf images and validated on 1,000 images across 10 classes.",
  },
  {
    icon: Brain,
    title: "Model",
    text: "EfficientNet-B0 transfer learning achieved 95.1% validation accuracy.",
  },
  {
    icon: Eye,
    title: "Explainability",
    text: "Grad-CAM highlights image regions that influenced the model prediction.",
  },
  {
    icon: Leaf,
    title: "Application",
    text: "Useful for early tomato disease identification and smart agriculture support.",
  },
];

function InfoSection() {
  return (
    <section className="mt-12 grid gap-5 md:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Icon size={22} />
            </div>

            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {item.text}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default InfoSection;