import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CONFETTI_COLORS = [
  "#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1",
  "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE",
];

function useConfetti(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces: {
      x: number; y: number; r: number; d: number;
      color: string; tilt: number; tiltAngleIncrement: number; tiltAngle: number;
    }[] = [];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 8 + 4,
        d: Math.random() * 80 + 10,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
      });
    }

    let angle = 0;
    let animId: number;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.01;

      pieces.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(angle + p.d) + 1.5) * 0.8;
        p.x += Math.sin(angle) * 0.8;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
        ctx.stroke();

        if (p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = -10;
        }
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
}

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useConfetti(canvasRef);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#0a081e" }}>
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.poehali.dev/projects/ec31f59a-dc5b-4212-8ae6-e4fcad7bd625/files/fc9d533f-ad75-4a08-ac11-42f566353ea5.jpg)`,
          opacity: 0.35,
        }}
      />

      {/* Оверлей */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(10,8,30,0.92) 0%, rgba(20,10,50,0.85) 50%, rgba(10,5,25,0.95) 100%)" }}
      />

      {/* Конфетти */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Декоративные полосы */}
      <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #8B6914, #FFD700, #D4A017, #FFD700, #8B6914)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #8B6914, #FFD700, #D4A017, #FFD700, #8B6914)" }} />

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">

        {/* ===== РАЗДЕЛ 1: ПРИВЕТСТВИЕ ===== */}
        <section className="text-center mb-16" style={{ animation: "fadeUp 0.9s ease-out both" }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, #FFD700)" }} />
            <span style={{ color: "#FFD700", fontSize: "1.4rem" }}>✦</span>
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
          </div>

          <p
            className="uppercase tracking-[0.35em] text-sm mb-4"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#FFD700", fontWeight: 300 }}
          >
            с радостью приглашаем вас
          </p>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#FFFDE7",
              fontWeight: 700,
              textShadow: "0 0 60px rgba(255, 215, 0, 0.4), 0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Юбилей!
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, transparent, #FFD700)" }} />
            <span style={{ color: "#FFD700", fontSize: "1.2rem" }}>★ ★ ★</span>
            <div className="h-px w-12" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
          </div>

          <p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255, 253, 231, 0.9)",
              fontWeight: 300,
              fontStyle: "italic",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            }}
          >
            Дорогой друг, мы искренне рады пригласить тебя
            разделить с нами этот особенный и радостный праздник.
            Твоё присутствие наполнит этот вечер особым светом!
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, #FFD700)" }} />
            <span style={{ color: "#FFD700", fontSize: "1.4rem" }}>✦</span>
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, #FFD700, transparent)" }} />
          </div>
        </section>

        {/* ===== РАЗДЕЛ 2: ДЕТАЛИ СОБЫТИЯ ===== */}
        <section
          className="w-full max-w-3xl"
          style={{ animation: "fadeUp 0.9s ease-out 0.35s both" }}
        >
          <div
            className="relative rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(255,215,0,0.08) 0%, rgba(139,105,20,0.12) 100%)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 60px rgba(255,215,0,0.1), inset 0 1px 0 rgba(255,215,0,0.2)",
            }}
          >
            {/* Угловые декорации */}
            <div className="absolute top-3 left-3 w-6 h-6" style={{ borderTop: "2px solid #FFD700", borderLeft: "2px solid #FFD700" }} />
            <div className="absolute top-3 right-3 w-6 h-6" style={{ borderTop: "2px solid #FFD700", borderRight: "2px solid #FFD700" }} />
            <div className="absolute bottom-3 left-3 w-6 h-6" style={{ borderBottom: "2px solid #FFD700", borderLeft: "2px solid #FFD700" }} />
            <div className="absolute bottom-3 right-3 w-6 h-6" style={{ borderBottom: "2px solid #FFD700", borderRight: "2px solid #FFD700" }} />

            <p
              className="text-center uppercase tracking-[0.3em] text-xs mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#FFD700", fontWeight: 500 }}
            >
              детали праздника
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Дата */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}
                >
                  <Icon name="CalendarDays" size={24} style={{ color: "#FFD700" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,215,0,0.7)", fontWeight: 400 }}
                  >
                    Дата
                  </p>
                  <p
                    className="text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FFFDE7", fontWeight: 600 }}
                  >
                    23 мая
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,253,231,0.6)", fontWeight: 300 }}
                  >
                    2026 года
                  </p>
                </div>
              </div>

              {/* Время */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}
                >
                  <Icon name="Clock" size={24} style={{ color: "#FFD700" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,215,0,0.7)", fontWeight: 400 }}
                  >
                    Время
                  </p>
                  <p
                    className="text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FFFDE7", fontWeight: 600 }}
                  >
                    17:00
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,253,231,0.6)", fontWeight: 300 }}
                  >
                    сбор с 16:30
                  </p>
                </div>
              </div>

              {/* Место */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)" }}
                >
                  <Icon name="MapPin" size={24} style={{ color: "#FFD700" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,215,0,0.7)", fontWeight: 400 }}
                  >
                    Место
                  </p>
                  <p
                    className="text-2xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FFFDE7", fontWeight: 600 }}
                  >
                    Столовая №10
                  </p>
                  <p
                    className="text-sm mt-0.5"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,253,231,0.6)", fontWeight: 300 }}
                  >
                    Белый зал
                  </p>
                </div>
              </div>
            </div>

            {/* Нижний текст */}
            <div className="mt-10 pt-8 text-center" style={{ borderTop: "1px solid rgba(255,215,0,0.2)" }}>
              <p
                className="text-base md:text-lg"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,253,231,0.75)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Ждём вас с нетерпением и надеемся провести этот вечер вместе!
              </p>
              <div className="flex justify-center mt-4 gap-2" style={{ fontSize: "1.3rem" }}>
                <span>🥂</span>
                <span>✨</span>
                <span>🎉</span>
                <span>✨</span>
                <span>🥂</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}