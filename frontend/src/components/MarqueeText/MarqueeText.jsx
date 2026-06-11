import React, { useRef, useEffect, useState } from "react";
import "./MarqueeText.css";

const MarqueeText = ({ text, className }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (container && textEl) {
      setIsOverflowing(textEl.scrollWidth > container.clientWidth);
    }
  }, [text]);

  return (
    <div ref={containerRef} className={`marquee-container ${className || ""}`}>
      <span
        ref={textRef}
        className={isOverflowing ? "marquee-track animate" : "marquee-track"}>
        <span>{text}</span>
        {isOverflowing && <span>{text}</span>}
      </span>
    </div>
  );
};

export default MarqueeText;
