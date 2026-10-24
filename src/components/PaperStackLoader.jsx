import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function PaperStackLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 2600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F8F5EF] transition-all duration-600 ${
        exiting
          ? "pointer-events-none opacity-0"
          : "opacity-100"
      }`}
    >
      {/* Decorative background */}
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#E8DCC5]/30 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#D8C29A]/20 blur-3xl" />

      {/* Main content */}
      <div
        className={`relative flex flex-col items-center px-6 ${
          exiting ? "loader-exit" : ""
        }`}
      >
        {/* Paper stack */}
        <div className="paper-stack relative mb-12 h-48 w-64 sm:h-56 sm:w-80">
          {/* Back sheet */}
          <div className="paper-sheet paper-back absolute inset-0 rounded-sm border border-[#E5DED2] bg-[#EAE4D9] shadow-sm" />

          {/* Second sheet */}
          <div className="paper-sheet paper-middle absolute inset-0 rounded-sm border border-[#E5DED2] bg-white shadow-md" />

          {/* Third sheet */}
          <div className="paper-sheet paper-front absolute inset-0 rounded-sm border border-[#E5DED2] bg-[#FFFEFC] shadow-lg">
            <div className="flex h-full flex-col items-center justify-center px-5">
              {/* Logo */}
              <img
                src={logo}
                alt="Printora Studio"
                className="loader-logo mb-3 h-16 w-16 object-contain sm:h-20 sm:w-20"
              />

              {/* Brand */}
              <h1 className="text-center text-xl font-extrabold tracking-tight text-[#252525] sm:text-2xl">
                Printora Studio
              </h1>

              {/* Gold decorative line */}
              <div className="mt-3 h-[3px] w-12 rounded-full bg-[#C49A45]" />

              <p className="mt-3 text-center text-[8px] font-semibold uppercase tracking-[0.22em] text-[#77716A] sm:text-[9px]">
                Print · Create · Customize
              </p>
            </div>
          </div>

          {/* Small paper corner detail */}
          <div className="paper-corner absolute right-0 top-0 h-8 w-8 bg-[#F1E8D8]">
            <div className="absolute right-0 top-0 h-0 w-0 border-b-[32px] border-l-[32px] border-b-[#E3D5BD] border-l-transparent" />
          </div>
        </div>

        {/* Loading message */}
        <div className="text-center">
          <p className="text-sm font-medium tracking-wide text-[#39352F] sm:text-base">
            Every great idea starts on paper.
          </p>

          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#9A8B71]">
            Preparing your experience
          </p>
        </div>

        {/* Animated progress line */}
        <div className="mt-7 h-[3px] w-40 overflow-hidden rounded-full bg-[#E7DFD2] sm:w-48">
          <div className="loading-progress h-full rounded-full bg-[#C49A45]" />
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-7 text-[9px] font-medium uppercase tracking-[0.2em] text-[#A69A85]">
        Designed to make an impression
      </div>

      <style>{`
        .paper-sheet {
          transform-origin: center center;
          opacity: 0;
          will-change: transform, opacity;
        }

        .paper-back {
          animation: paperBack 0.7s ease-out 0.1s forwards;
        }

        .paper-middle {
          animation: paperMiddle 0.7s ease-out 0.35s forwards;
        }

        .paper-front {
          animation: paperFront 0.8s ease-out 0.6s forwards;
        }

        .loader-logo {
          opacity: 0;
          animation: logoReveal 0.6s ease-out 1.05s forwards;
        }

        .paper-corner {
          opacity: 0;
          animation: cornerReveal 0.5s ease-out 1.15s forwards;
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }

        .loading-progress {
          width: 0;
          animation: progressFill 1.5s ease-in-out 0.6s forwards;
        }

        .loader-exit {
          animation: loaderExit 0.55s ease-in forwards;
        }

        @keyframes paperBack {
          0% {
            opacity: 0;
            transform: translate(-55px, -30px) rotate(-12deg) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translate(-15px, -12px) rotate(-7deg);
          }
        }

        @keyframes paperMiddle {
          0% {
            opacity: 0;
            transform: translate(45px, -20px) rotate(10deg) scale(0.94);
          }
          100% {
            opacity: 1;
            transform: translate(9px, -5px) rotate(4deg);
          }
        }

        @keyframes paperFront {
          0% {
            opacity: 0;
            transform: translateY(35px) rotate(-4deg) scale(0.92);
          }
          70% {
            opacity: 1;
            transform: translateY(-3px) rotate(1deg) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes logoReveal {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cornerReveal {
          from {
            opacity: 0;
            transform: translate(5px, -5px);
          }
          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        @keyframes progressFill {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes loaderExit {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-12px) scale(0.97);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .paper-back,
          .paper-middle,
          .paper-front,
          .loader-logo,
          .paper-corner,
          .loading-progress,
          .loader-exit {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}