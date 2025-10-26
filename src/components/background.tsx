"use client";

export default function NetworkBackground() {

  return (
<div className="absolute inset-0 -z-10 bg-white">
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          // backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(29, 170, 97, 0.4))'
        }}
      />
      
      {/* Grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
}
