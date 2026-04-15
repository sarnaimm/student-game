"use client"

import { useGame } from '@/lib/game-context'
import { characterColors } from '@/lib/game-store'

export function Character({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { state } = useGame()
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }
  
  const bodyColor = state.profile?.avatar?.bodyColor || 'blue'
  const expression = state.profile?.avatar?.expression || 'happy'
  const colorInfo = characterColors.find(c => c.id === bodyColor)
  const color = colorInfo?.color || '#5DADE2'
  
  // Get equipped items
  const equippedClothing = state.shopItems.filter(i => 
    (i.type === 'clothing' || i.type === 'accessory') && i.equipped
  )
  
  const hasHat = equippedClothing.some(i => i.image === 'hat')
  const hasGlasses = equippedClothing.some(i => i.image === 'glasses')
  const hasScarf = equippedClothing.some(i => i.image === 'scarf')
  const hasBowTie = equippedClothing.some(i => i.image === 'bowtie')
  const hasCrown = equippedClothing.some(i => i.image === 'crown')

  const getEyes = () => {
    switch (expression) {
      case 'excited':
        return (
          <>
            <circle cx="35" cy="40" r="4" fill="#333" />
            <circle cx="65" cy="40" r="4" fill="#333" />
            <circle cx="36" cy="38" r="1.5" fill="white" />
            <circle cx="66" cy="38" r="1.5" fill="white" />
          </>
        )
      case 'sleepy':
        return (
          <>
            <path d="M30 40 Q35 42 40 40" stroke="#333" strokeWidth="2" fill="none" />
            <path d="M60 40 Q65 42 70 40" stroke="#333" strokeWidth="2" fill="none" />
          </>
        )
      case 'cool':
        return (
          <>
            <ellipse cx="35" cy="40" rx="3" ry="2" fill="#333" />
            <ellipse cx="65" cy="40" rx="3" ry="2" fill="#333" />
          </>
        )
      case 'calm':
        return (
          <>
            <circle cx="35" cy="40" r="3" fill="#333" />
            <circle cx="65" cy="40" r="3" fill="#333" />
            <circle cx="36" cy="39" r="1" fill="white" />
            <circle cx="66" cy="39" r="1" fill="white" />
          </>
        )
      default: // happy
        return (
          <>
            <circle cx="35" cy="40" r="4" fill="#333" />
            <circle cx="65" cy="40" r="4" fill="#333" />
            <circle cx="36" cy="38" r="1.5" fill="white" />
            <circle cx="66" cy="38" r="1.5" fill="white" />
          </>
        )
    }
  }

  const getMouth = () => {
    switch (expression) {
      case 'excited':
        return <ellipse cx="50" cy="60" rx="10" ry="8" fill="#333" />
      case 'sleepy':
        return <ellipse cx="50" cy="58" rx="6" ry="4" fill="#333" />
      case 'cool':
        return <path d="M40 58 Q50 62 60 58" stroke="#333" strokeWidth="2" fill="none" />
      case 'calm':
        return <path d="M42 58 Q50 62 58 58" stroke="#333" strokeWidth="2" fill="none" />
      default: // happy
        return <path d="M38 55 Q50 70 62 55" stroke="#333" strokeWidth="2" fill="none" />
    }
  }

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        {/* Blob body */}
        <ellipse
          cx="50"
          cy="55"
          rx="40"
          ry="38"
          fill={color}
          filter="url(#glow)"
        />
        
        {/* Highlight */}
        <ellipse
          cx="35"
          cy="30"
          rx="15"
          ry="10"
          fill="white"
          opacity="0.3"
        />
        
        {/* Blush */}
        <ellipse cx="25" cy="50" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
        <ellipse cx="75" cy="50" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
        
        {/* Eyes */}
        {getEyes()}
        
        {/* Mouth */}
        {getMouth()}
        
        {/* Accessories */}
        {hasScarf && (
          <path
            d="M25 75 Q50 85 75 75"
            stroke="#E74C3C"
            strokeWidth="6"
            fill="none"
          />
        )}
        
        {hasBowTie && (
          <>
            <polygon points="45,70 50,75 55,70 50,65" fill="#E74C3C" />
            <circle cx="50" cy="70" r="2" fill="#fff" />
          </>
        )}
        
        {hasGlasses && (
          <>
            <circle cx="35" cy="40" r="10" stroke="#333" strokeWidth="2" fill="none" />
            <circle cx="65" cy="40" r="10" stroke="#333" strokeWidth="2" fill="none" />
            <line x1="45" y1="40" x2="55" y2="40" stroke="#333" strokeWidth="2" />
          </>
        )}
        
        {hasHat && (
          <>
            <ellipse cx="50" cy="15" rx="25" ry="10" fill="#8B4513" />
            <rect x="35" y="5" width="30" height="12" rx="3" fill="#A0522D" />
            <rect x="38" y="12" width="24" height="3" fill="#CD853F" />
          </>
        )}
        
        {hasCrown && (
          <path
            d="M30 12 L35 20 L40 8 L50 18 L60 8 L65 20 L70 12 L68 25 L32 25 Z"
            fill="#FFD700"
            stroke="#DAA520"
            strokeWidth="1"
          />
        )}
        
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  )
}
