'use client'

import dynamic from 'next/dynamic'

const DemoBackground = dynamic(() => import('@/components/ui/demo'), { ssr: false })

export default function ContentBackground({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      {/* Shader animado como fundo de todo o conteúdo */}
      <div className="absolute inset-0 z-0" style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <DemoBackground mode="mesh" speed={0.4} />
      </div>
      {children}
    </div>
  )
}
