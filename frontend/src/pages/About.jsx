export default function About() {
  return (
    <div className="space-y-6">
      <section className="panel">
        <h1 className="text-2xl font-bold">Project Overview</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300">FitPredict AI combines React, Express, MySQL, Flask, and scikit-learn to estimate fat loss outcomes from lifestyle inputs and preserve a user-specific prediction history.</p>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        <Info title="Technologies Used" text="React, Tailwind CSS, Recharts, Node.js, Express, Sequelize, MySQL, Flask, Pandas, NumPy, scikit-learn, Joblib." />
        <Info title="ML Workflow" text="Synthetic dataset generation, cleaning, outlier treatment, preprocessing, model comparison, Random Forest serving, reports, and visual analysis." />
        <Info title="Architecture" text="React frontend calls Express APIs. Express validates input, stores MySQL records, and requests predictions from the Python Flask ML service." />
        <Info title="Future Improvements" text="JWT sessions, wearable imports, nutrition plans, model monitoring, deployment, richer explainability, and doctor-reviewed recommendations." />
      </section>
    </div>
  );
}

function Info({ title, text }) {
  return <div className="panel"><h2 className="text-lg font-bold">{title}</h2><p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{text}</p></div>;
}

