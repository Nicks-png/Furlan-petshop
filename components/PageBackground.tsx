'use client'

import { useState, useEffect } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

export default function PageBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#2c1a0a',
      }}
    >
      {mounted && (
        <MeshGradient
          style={{ width: '100%', height: '100%', display: 'block' }}
          colors={['#e8920a', '#c47a15', '#8b5209', '#4a2c0a', '#2c1a0a']}
          speed={1.2}
          distortion={0.5}
          swirl={0.3}
        />
      )}
    </div>
  )
}
