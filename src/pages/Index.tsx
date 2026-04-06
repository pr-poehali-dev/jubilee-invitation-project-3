import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const CONFETTI_COLORS = [
  "#FFD700", "#FF4E8B", "#7C3AED", "#00D4FF",
  "#FF6B35", "#00E676", "#F7DC6F", "#FF1493",
];

const FLOWER_IMG = "https://cdn.poehali.dev/projects/ec31f59a-dc5b-4212-8ae6-e4fcad7bd625/files/598f96bb-7d43-4d78-963c-e979f2ea48a2.jpg";

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
      shape: "line" | "circle" | "rect";
    }[] = [];

    for (let i = 0; i < 180; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 10 + 4,
        d: Math.random() * 80 + 10,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0,
        shape: (["line", "circle", "rect"] as const)[Math.floor(Math.random() * 3)],
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
        p.y += (Math.cos(angle + p.d) + 1.8) * 0.9;
        p.x += Math.sin(angle) * 1.0;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.save();
        ctx.globalAlpha = 0.85;

        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else if (p.shape === "rect") {
          ctx.translate(p.x, p.y);
          ctx.rotate(p.tiltAngle);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2);
        } else {
          ctx.beginPath();
          ctx.lineWidth = p.r / 2;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
          ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
          ctx.stroke();
        }

        ctx.restore();

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
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#0d0520" }}>
      {/* Яркий градиентный фон */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(120,40,180,0.7) 0%, rgba(60,10,120,0.5) 40%, transparent 70%), radial-gradient(ellipse at 0% 100%, rgba(200,30,80,0.4) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(30,100,200,0.4) 0%, transparent 50%), #0d0520",
        }}
      />

      {/* Фоновый паттерн звёзд */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0.4,
      }} />

      {/* Конфетти */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />

      {/* Декоративные полосы */}
      <div className="absolute top-0 left-0 right-0 h-3" style={{ background: "linear-gradient(90deg, #7C3AED, #FF4E8B, #FFD700, #FF4E8B, #7C3AED)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-3" style={{ background: "linear-gradient(90deg, #7C3AED, #FF4E8B, #FFD700, #FF4E8B, #7C3AED)" }} />

      {/* ЦВЕТЫ СЛЕВА */}
      <div
        className="absolute left-0 top-0 bottom-0 hidden lg:block pointer-events-none"
        style={{ width: "220px", zIndex: 3 }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-60px",
            width: "300px",
            height: "500px",
            backgroundImage: `url(${FLOWER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scaleX(-1) rotate(-10deg)",
            filter: "drop-shadow(0 0 30px rgba(255,100,180,0.6)) saturate(1.4) brightness(1.1)",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-40px",
            width: "260px",
            height: "420px",
            backgroundImage: `url(${FLOWER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            transform: "scaleX(-1) rotate(8deg)",
            filter: "drop-shadow(0 0 25px rgba(255,180,50,0.5)) saturate(1.3) brightness(1.05)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* ЦВЕТЫ СПРАВА */}
      <div
        className="absolute right-0 top-0 bottom-0 hidden lg:block pointer-events-none"
        style={{ width: "220px", zIndex: 3 }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-60px",
            width: "300px",
            height: "500px",
            backgroundImage: `url(${FLOWER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "rotate(10deg)",
            filter: "drop-shadow(0 0 30px rgba(255,100,180,0.6)) saturate(1.4) brightness(1.1)",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-40px",
            width: "260px",
            height: "420px",
            backgroundImage: `url(${FLOWER_IMG})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            transform: "rotate(-8deg)",
            filter: "drop-shadow(0 0 25px rgba(255,180,50,0.5)) saturate(1.3) brightness(1.05)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Контент */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 lg:px-56">

        {/* ===== РАЗДЕЛ 1: ПРИВЕТСТВИЕ ===== */}
        <section className="text-center mb-14" style={{ animation: "fadeUp 0.9s ease-out both" }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, #FF4E8B)" }} />
            <span style={{ color: "#FFD700", fontSize: "1.6rem" }}>✦</span>
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, #FF4E8B, transparent)" }} />
          </div>

          <p
            className="uppercase tracking-[0.35em] text-sm mb-5"
            style={{ fontFamily: "'Montserrat', sans-serif", color: "#FF9ECD", fontWeight: 400 }}
          >
            с радостью приглашаем вас
          </p>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl leading-none mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              background: "linear-gradient(135deg, #FFD700 0%, #FF9ECD 40%, #FFD700 70%, #FFFDE7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 30px rgba(255,180,50,0.5))",
            }}
          >
            Юбилей!
          </h1>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, transparent, #FF4E8B)" }} />
            <span style={{ background: "linear-gradient(90deg,#FFD700,#FF4E8B,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "1.3rem" }}>★ ★ ★</span>
            <div className="h-px w-16" style={{ background: "linear-gradient(90deg, #FF4E8B, transparent)" }} />
          </div>

          <p
            className="text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "rgba(255, 240, 255, 0.92)",
              fontWeight: 300,
              fontStyle: "italic",
              textShadow: "0 2px 20px rgba(200,100,255,0.4)",
            }}
          >
            Дорогой друг, мы искренне рады пригласить тебя
            разделить с нами этот особенный и радостный праздник.
            Твоё присутствие наполнит этот вечер особым светом!
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, #FF4E8B)" }} />
            <span style={{ color: "#FFD700", fontSize: "1.6rem" }}>✦</span>
            <div className="h-px w-20" style={{ background: "linear-gradient(90deg, #FF4E8B, transparent)" }} />
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
              background: "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(255,78,139,0.15) 50%, rgba(255,215,0,0.1) 100%)",
              border: "1px solid rgba(255, 78, 139, 0.5)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 60px rgba(180,50,255,0.25), 0 0 120px rgba(255,78,139,0.1), inset 0 1px 0 rgba(255,215,0,0.3)",
            }}
          >
            {/* Угловые декорации */}
            <div className="absolute top-3 left-3 w-7 h-7" style={{ borderTop: "2px solid #FF4E8B", borderLeft: "2px solid #FF4E8B" }} />
            <div className="absolute top-3 right-3 w-7 h-7" style={{ borderTop: "2px solid #FF4E8B", borderRight: "2px solid #FF4E8B" }} />
            <div className="absolute bottom-3 left-3 w-7 h-7" style={{ borderBottom: "2px solid #FF4E8B", borderLeft: "2px solid #FF4E8B" }} />
            <div className="absolute bottom-3 right-3 w-7 h-7" style={{ borderBottom: "2px solid #FF4E8B", borderRight: "2px solid #FF4E8B" }} />

            <p
              className="text-center uppercase tracking-[0.3em] text-xs mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif", color: "#FF9ECD", fontWeight: 500 }}
            >
              детали праздника
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Дата */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,78,139,0.25), rgba(124,58,237,0.25))",
                    border: "1px solid rgba(255,78,139,0.6)",
                    boxShadow: "0 0 20px rgba(255,78,139,0.3)",
                  }}
                >
                  <Icon name="CalendarDays" size={26} style={{ color: "#FF9ECD" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#FF9ECD", fontWeight: 400 }}
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
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,240,255,0.6)", fontWeight: 300 }}
                  >
                    2026 года
                  </p>
                </div>
              </div>

              {/* Время */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,78,139,0.2))",
                    border: "1px solid rgba(255,215,0,0.6)",
                    boxShadow: "0 0 20px rgba(255,215,0,0.3)",
                  }}
                >
                  <Icon name="Clock" size={26} style={{ color: "#FFD700" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#FFD700", fontWeight: 400 }}
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
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,240,255,0.6)", fontWeight: 300 }}
                  >
                    сбор с 16:30
                  </p>
                </div>
              </div>

              {/* Место */}
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,212,255,0.2))",
                    border: "1px solid rgba(124,58,237,0.6)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.35)",
                  }}
                >
                  <Icon name="MapPin" size={26} style={{ color: "#A78BFA" }} />
                </div>
                <div>
                  <p
                    className="uppercase tracking-widest text-xs mb-1"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "#A78BFA", fontWeight: 400 }}
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
                    style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,240,255,0.6)", fontWeight: 300 }}
                  >
                    Белый зал
                  </p>
                </div>
              </div>
            </div>

            {/* Нижний текст */}
            <div className="mt-10 pt-8 text-center" style={{ borderTop: "1px solid rgba(255,78,139,0.25)" }}>
              <p
                className="text-base md:text-lg"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,240,255,0.8)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Ждём вас с нетерпением и надеемся провести этот вечер вместе!
              </p>
              <div className="flex justify-center mt-4 gap-2" style={{ fontSize: "1.4rem" }}>
                <span>🥂</span>
                <span>🌸</span>
                <span>🎉</span>
                <span>🌸</span>
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
