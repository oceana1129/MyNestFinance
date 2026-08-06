export default function DashboardSection({ title, children }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

      {children}
    </section>
  );
}
