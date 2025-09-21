// src/components/Card.tsx
import React, { forwardRef, type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", style, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`min-h-screen flex items-center justify-center bg-gray-100 ${className}`}
      >
        <div
          className="rounded-2xl shadow-md transition-all duration-300 
                     hover:shadow-lg hover:-translate-y-1 
                     flex flex-col items-center m-auto"
          style={{
            background: "rgba(255, 255, 255, 0.08)", // frosted transparent white
            backdropFilter: "blur(12px)", // glassmorphism effect
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "1.6rem",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
            color: "#ffffff",
            height: "50%",
            width: "25%",
            maxWidth:'50%',
            padding: "2rem",
            boxSizing: "border-box",
          }}
          {...rest}
        >
          {children}
        </div>
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
