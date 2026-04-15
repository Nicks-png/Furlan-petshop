"use client"

import { useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

/**
 * DemoBackground — animated background for Furlan Pet Shop
 *
 * Uses the site's colour palette:
 *   --brand   #e8920a  amber / ocre
 *   --brand-d #bf7209  dark amber
 *   --cream   #fdf9f4  warm off-white
 *   --dark    #1a0f05  deep brown-black
 *
 * Modes:
 *   "mesh"     → MeshGradient with cream/amber tones (hero background)
 *   "dots"     → DotOrbit with amber dots on cream (section background)
 *   "combined" → mesh gradient + dot orbit layered
 */
export default function DemoBackground({
  mode = "mesh",
  speed = 0.8,
}: {
  mode?: "mesh" | "dots" | "combined"
  speed?: number
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>

      {/* ── Mesh gradient — cream/amber warm tones ─────────────────────────── */}
      {mode === "mesh" && (
        <MeshGradient
          width="100%"
          height="100%"
          style={{ display: 'block' }}
          colors={["#fdf9f4", "#fef3da", "#e8920a", "#bf7209"]}
          speed={speed}
        />
      )}

      {/* ── Dot orbit — amber dots on cream ───────────────────────────────── */}
      {mode === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-[#fdf9f4]">
          <DotOrbit
            className="w-full h-full"
            colorBack="#fdf9f4"
            colors={["#e8920a", "#bf7209", "#fef3da"]}
            speed={speed}
            size={0.3}
            spreading={0.5}
          />
        </div>
      )}

      {/* ── Combined: mesh + dots overlay ─────────────────────────────────── */}
      {mode === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#fdf9f4", "#fef3da", "#e8920a", "#bf7209"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-40">
            <DotOrbit
              className="w-full h-full"
              colorBack="transparent"
              colors={["#e8920a", "#bf7209"]}
              speed={speed * 1.5}
              size={0.2}
              spreading={0.4}
            />
          </div>
        </>
      )}

      {/* ── Ambient glow blobs (brand amber) ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full blur-3xl animate-pulse"
          style={{ background: "rgba(232, 146, 10, 0.10)" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-28 h-28 rounded-full blur-2xl animate-pulse"
          style={{ background: "rgba(191, 114, 9, 0.07)", animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}

// ── Standalone full-screen preview ────────────────────────────────────────────
export function DemoPreview() {
  const [mode, setMode]   = useState<"mesh" | "dots" | "combined">("mesh")
  const [speed, setSpeed] = useState(0.8)

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <DemoBackground mode={mode} speed={speed} />

      {/* Controls */}
      <div className="absolute bottom-8 left-8 z-10 flex gap-2">
        {(["mesh", "dots", "combined"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={[
              "px-3 py-1.5 rounded-full text-xs font-bold border transition-all",
              mode === m
                ? "bg-[#e8920a] text-white border-[#e8920a]"
                : "bg-white/70 text-[#5c3d1e] border-[rgba(100,60,10,0.2)] hover:border-[#e8920a]",
            ].join(" ")}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Speed slider */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col gap-2 text-xs text-[#5c3d1e] font-bold">
        <label className="flex items-center gap-2">
          Speed
          <input
            type="range" min="0.2" max="3" step="0.1"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-24 accent-[#e8920a]"
          />
        </label>
      </div>
    </div>
  )
}
