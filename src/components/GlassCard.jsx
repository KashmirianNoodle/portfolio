export default function GlassCard({ children }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-glow hover:scale-[1.02] transition duration-300">
      {children}
    </div>
  );
}
