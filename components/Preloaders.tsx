"use client";

export default function Preloader() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">

      {/* 🏋️ Dumbbell */}
      <div className="flex items-center gap-2 animate-bounce">

        {/* Left weight */}
        <div className="w-4 h-10 bg-black rounded"></div>
        <div className="w-2 h-6 bg-gray-700 rounded"></div>

        {/* Rod */}
        <div className="w-20 h-2 bg-black rounded"></div>

        {/* Right weight */}
        <div className="w-2 h-6 bg-gray-700 rounded"></div>
        <div className="w-4 h-10 bg-black rounded"></div>

      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold animate-pulse">
        Loading Gains... 💪
      </p>

    </div>
  );
}