import { useEffect, useState } from "react";

export default function VisitorBadge() {
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited_before");

    if (visited) {
      setIsReturning(true);
    } else {
      localStorage.setItem("visited_before", "true");
    }
  }, []);

  return (
    <div className="text-sm">
      {isReturning ? "🔁 Returning Visitor" : "🆕 New Visitor"}
    </div>
  );
}