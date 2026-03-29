export const getVisitorMeta = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return {
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      ip: data.ip || "Unknown",
      org: data.org || "Unknown",        // ISP / company name
      timezone: data.timezone || "Unknown",
    };
  } catch {
    return { country: "Unknown", city: "Unknown", region: "Unknown", ip: "Unknown", org: "Unknown", timezone: "Unknown" };
  }
};