import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const ACTIVE_WINDOW = 5 * 60 * 1000;

export default function Dashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [allVisitors, setAllVisitors] = useState([]);
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const password = prompt("Enter dashboard key");
    setAuthorized(password === import.meta.env.VITE_DASHBOARD_KEY);
  }, []);

  const fetchVisitors = async () => {
    const { data } = await supabase
      .from("visitors")
      .select("*")
      .order("last_seen", { ascending: false });
    if (!data) return;
    const now = Date.now();
    setAllVisitors(data);
    setVisitors(data.filter((v) => now - new Date(v.last_seen).getTime() < ACTIVE_WINDOW));
  };

  useEffect(() => {
    if (!authorized) return;
    fetchVisitors();

    const channel = supabase
      .channel("dashboard-visitors")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitors" }, fetchVisitors)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [authorized]);

  if (!authorized) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        ❌ Unauthorized
      </div>
    );
  }

  const countBy = (arr, key) =>
    arr.reduce((acc, v) => {
      const val = v[key] || "Unknown";
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

  const topEntries = (obj, n = 5) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n);

  const countryStats = countBy(allVisitors, "country");
  const browserStats = countBy(allVisitors, "browser");
  const deviceStats = countBy(allVisitors, "device");
  const osStats = countBy(allVisitors, "os");
  const pageStats = countBy(allVisitors, "page");

  const StatBar = ({ label, count, max }) => (
    <div className="mb-1">
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-400">{count}</span>
      </div>
      <div className="h-1.5 bg-gray-800 rounded">
        <div className="h-1.5 bg-green-500 rounded" style={{ width: `${(count / max) * 100}%` }} />
      </div>
    </div>
  );

  const MetricCard = ({ title, entries }) => {
    const max = entries[0]?.[1] || 1;
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">{title}</h3>
        {entries.map(([label, count]) => (
          <StatBar key={label} label={label} count={count} max={max} />
        ))}
      </div>
    );
  };

  const tableData = activeTab === "active" ? visitors : allVisitors;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-mono">
      <h1 className="text-2xl font-bold mb-6">📊 Visitor Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "🟢 Active Now", value: visitors.length },
          { label: "👥 Total Visitors", value: allVisitors.length },
          { label: "🌍 Countries", value: Object.keys(countryStats).length },
          { label: "📄 Pages Tracked", value: Object.keys(pageStats).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <MetricCard title="Top Countries" entries={topEntries(countryStats)} />
        <MetricCard title="Top Pages" entries={topEntries(pageStats)} />
        <MetricCard title="Browsers" entries={topEntries(browserStats)} />
        <MetricCard title="Devices" entries={topEntries(deviceStats)} />
        <MetricCard title="OS" entries={topEntries(osStats)} />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex gap-4 mb-4">
          {["active", "all"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm px-3 py-1 rounded-full border ${activeTab === tab ? "bg-green-500 border-green-500 text-black font-bold" : "border-gray-700 text-gray-400"}`}
            >
              {tab === "active" ? `🟢 Active (${visitors.length})` : `📋 All (${allVisitors.length})`}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                {["ID", "IP", "Country", "City", "ISP", "Browser", "OS", "Device", "Screen", "Page", "Referrer", "Last Seen"].map(h => (
                  <th key={h} className="text-left p-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((v) => (
                <tr key={v.visitor_id} className="border-b border-gray-900 hover:bg-gray-800">
                  <td className="p-2 text-green-400">{v.visitor_id?.slice(0, 8)}</td>
                  <td className="p-2">{v.ip}</td>
                  <td className="p-2">{v.country}</td>
                  <td className="p-2">{v.city}</td>
                  <td className="p-2 max-w-[120px] truncate" title={v.org}>{v.org}</td>
                  <td className="p-2">{v.browser}</td>
                  <td className="p-2">{v.os}</td>
                  <td className="p-2">{v.device}</td>
                  <td className="p-2">{v.screen}</td>
                  <td className="p-2">{v.page}</td>
                  <td className="p-2 max-w-[100px] truncate" title={v.referrer}>{v.referrer}</td>
                  <td className="p-2 whitespace-nowrap">{new Date(v.last_seen).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}