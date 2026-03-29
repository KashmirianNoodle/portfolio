export const getVisitorId = async () => {
  let storedId = localStorage.getItem("visitor_id");
  if (storedId) return storedId;

  try {
    const { default: FingerprintJS } = await import("@fingerprintjs/fingerprintjs");
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    storedId = result.visitorId;
  } catch {
    storedId = crypto.randomUUID();
  }

  localStorage.setItem("visitor_id", storedId);
  return storedId;
};