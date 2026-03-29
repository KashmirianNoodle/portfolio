import { useVisitorTracking } from "../hooks/useVisitorTracking";

export default function LiveVisitors() {
  const { visitors } = useVisitorTracking();

  return (
    <div className="p-4 rounded-2xl shadow bg-black text-white">
      <h3 className="text-lg font-semibold mb-2">
        👀 Live Visitors: {visitors.length}
      </h3>

      <ul className="text-sm space-y-1">
        {visitors.map((v) => (
          <li key={v.visitor_id}>
            🌍 {v.country} • {v.visitor_id.slice(0, 6)}
          </li>
        ))}
      </ul>
    </div>
  );
}