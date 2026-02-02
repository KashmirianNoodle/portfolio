export default function GlassCard({ children }) {
  return (
    <div
      className="
        bg-white/[0.03]
        backdrop-blur-xl
        border border-primary/10
        rounded-2xl
        p-6
        hover:border-primary/30
        hover:shadow-[0_0_35px_rgba(0,255,198,0.15)]
        transition-all duration-300
      "
    >
      {children}
    </div>
  );
}
