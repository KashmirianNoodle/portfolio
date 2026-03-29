export const getVisitorMeta = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    clearTimeout(timeout);
    const data = await res.json();
    return {
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      ip: data.ip || "Unknown",
      org: data.org || "Unknown",
      timezone: data.timezone || "Unknown",
    };
  } catch {
    return { country: "Unknown", city: "Unknown", region: "Unknown", ip: "Unknown", org: "Unknown", timezone: "Unknown" };
  }
};