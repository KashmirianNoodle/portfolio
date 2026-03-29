import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getVisitorMeta } from "../lib/geo.js";

const ACTIVE_WINDOW = 30 * 1000;

const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  const isMobile = /mobile/i.test(ua);
  const isTablet = /tablet|ipad/i.test(ua);
  const device = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";

  let browser = "Unknown";
  if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/edg/i.test(ua)) browser = "Edge";
  else if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua)) browser = "Safari";
  else if (/opera|opr/i.test(ua)) browser = "Opera";

  let os = "Unknown";
  if (/windows/i.test(ua)) os = "Windows";
  else if (/mac os/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";
  else if (/android/i.test(ua)) os = "Android";
  else if (/ios|iphone|ipad/i.test(ua)) os = "iOS";

  return { device, browser, os };
};

export const useVisitorTracking = () => {
  const [visitors, setVisitors] = useState([]);
  const [allVisitors, setAllVisitors] = useState([]);
  const [visitorInfo, setVisitorInfo] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { getVisitorId } = await import("../lib/visitorId.js");
      const visitor_id = await getVisitorId();
      const meta = await getVisitorMeta();
      const { device, browser, os } = getDeviceInfo();

      const info = {
        visitor_id,
        ...meta,
        device,
        browser,
        os,
        page: window.location.pathname,
        referrer: document.referrer || "Direct",
        screen: `${window.screen.width}x${window.screen.height}`,
        last_seen: new Date(),
        first_seen: new Date(),
      };

      setVisitorInfo(info);

      await supabase.from("visitors").upsert(
        info,
        { onConflict: "visitor_id", ignoreDuplicates: false }
      );
    };
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const visitor_id = localStorage.getItem("visitor_id");
      if (!visitor_id) return;
      await supabase.from("visitors").update({ last_seen: new Date(), page: window.location.pathname })
        .eq("visitor_id", visitor_id);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchVisitors = async () => {
    const { data } = await supabase.from("visitors").select("*").order("last_seen", { ascending: false });
    if (!data) return;
    const now = Date.now();
    setAllVisitors(data);
    setVisitors(data.filter((v) => now - new Date(v.last_seen).getTime() < ACTIVE_WINDOW));
  };

  useEffect(() => {
    fetchVisitors();
    const channel = supabase
      .channel("visitors")
      .on("postgres_changes", { event: "*", schema: "public", table: "visitors" }, fetchVisitors)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  return { visitors, allVisitors, visitorInfo };
};