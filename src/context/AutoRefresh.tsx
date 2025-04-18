"use client";
import { useEffect } from "react";

function AutoRefresh({ interval = 570000 }) {
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return null;
}

export default AutoRefresh;
