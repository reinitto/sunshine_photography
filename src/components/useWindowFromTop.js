import { useState, useEffect } from "react";
export function useWindowFromTop() {
  const [fromTop, setFromTop] = useState(0);
  useEffect(() => {
    function updateSize() {
      setFromTop(window.pageYOffset);
    }
    window.addEventListener("scroll", updateSize);
    updateSize();
    return () => window.removeEventListener("scroll", updateSize);
  }, []);
  return fromTop;
}
