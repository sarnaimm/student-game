"use client"

import { useGame } from '@/lib/game-context'
import { Character } from './character'

const wallpaperGradients: Record<string, { wall1: string; wall2: string; floor: string }> = {
  forest: {
    wall1: 'linear-gradient(180deg, #2D5016 0%, #1B3A09 100%)',
    wall2: 'linear-gradient(180deg, #3A6B1E 0%, #234A0F 100%)',
    floor: '#8B6F47'
  },
  ocean: {
    wall1: 'linear-gradient(180deg, #1E6091 0%, #154360 100%)',
    wall2: 'linear-gradient(180deg, #2874A6 0%, #1B5583 100%)',
    floor: '#D4C4A8'
  },
  mountain: {
    wall1: 'linear-gradient(180deg, #5D6D7E 0%, #34495E 100%)',
    wall2: 'linear-gradient(180deg, #85929E 0%, #566573 100%)',
    floor: '#A9A9A9'
  },
  city: {
    wall1: 'linear-gradient(180deg, #1C2833 0%, #17202A 100%)',
    wall2: 'linear-gradient(180deg, #2C3E50 0%, #1C2833 100%)',
    floor: '#566573'
  },
  stars: {
    wall1: 'linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)',
    wall2: 'linear-gradient(180deg, #0F3460 0%, #16213E 100%)',
    floor: '#2C2C54'
  }
}

export function Room() {
  const { state } = useGame()
  
  const wallpaper = wallpaperGradients[state.equippedWallpaper] || wallpaperGradients.forest
  
  // Get equipped furniture
  const equippedFurniture = state.shopItems.filter(i => 
    i.type === 'furniture' && i.equipped
  )
  
  const hasBookshelf = equippedFurniture.some(i => i.image === 'bookshelf')
  const hasCampfire = equippedFurniture.some(i => i.image === 'campfire')
  const hasDesk = equippedFurniture.some(i => i.image === 'desk')
  const hasPlant = equippedFurniture.some(i => i.image === 'plant')
  const hasRug = equippedFurniture.some(i => i.image === 'rug')
  const hasLights = equippedFurniture.some(i => i.image === 'lights')
  const hasBeanbag = equippedFurniture.some(i => i.image === 'beanbag')

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <svg viewBox="0 0 400 350" className="w-full h-auto drop-shadow-2xl">
        <defs>
          {/* Forest pattern for walls */}
          <pattern id="forestPattern" patternUnits="userSpaceOnUse" width="40" height="60">
            <rect width="40" height="60" fill="transparent"/>
            <path d="M20 60 L10 40 L20 45 L15 25 L20 30 L20 10 L25 30 L25 25 L30 45 L20 40 Z" 
                  fill="rgba(0,0,0,0.15)"/>
          </pattern>
          
          {/* Wood pattern for floor */}
          <pattern id="woodPattern" patternUnits="userSpaceOnUse" width="30" height="30">
            <rect width="30" height="30" fill="transparent"/>
            <line x1="0" y1="15" x2="30" y2="15" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
          </pattern>
          
          {/* Glow filter */}
          <filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Back wall - fills the top gap */}
        <polygon 
          points="20,50 200,0 380,50 200,80" 
          fill="url(#backWall)"
        />
        <polygon 
          points="20,50 200,0 380,50 200,80" 
          fill="url(#forestPattern)"
        />
        
        {/* Left wall - extended to fully cover */}
        <polygon 
          points="20,50 200,80 200,200 20,200" 
          fill="url(#leftWall)"
        />
        <polygon 
          points="20,50 200,80 200,200 20,200" 
          fill="url(#forestPattern)"
        />
        
        {/* Right wall - extended to fully cover */}
        <polygon 
          points="380,50 200,80 200,200 380,200" 
          fill="url(#rightWall)"
        />
        <polygon 
          points="380,50 200,80 200,200 380,200" 
          fill="url(#forestPattern)"
        />
        
        {/* Floor */}
        <polygon 
          points="20,200 200,320 380,200 200,80" 
          fill={wallpaper.floor}
        />
        <polygon 
          points="20,200 200,320 380,200 200,80" 
          fill="url(#woodPattern)"
        />
        
        {/* Floor grid lines */}
        <line x1="60" y1="175" x2="260" y2="295" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        <line x1="100" y1="150" x2="300" y2="270" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        <line x1="140" y1="125" x2="340" y2="245" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        
        <line x1="340" y1="175" x2="140" y2="295" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        <line x1="300" y1="150" x2="100" y2="270" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        <line x1="260" y1="125" x2="60" y2="245" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
        
        {/* Rug */}
        {hasRug && (
          <ellipse cx="200" cy="200" rx="70" ry="35" fill="#C0392B" opacity="0.8"/>
        )}
        
        {/* Left Bookshelf */}
        {hasBookshelf && (
          <g transform="translate(40, 100)">
            <rect x="0" y="0" width="40" height="80" fill="#B8860B" rx="2"/>
            <rect x="3" y="5" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="7" width="8" height="10" fill="#E74C3C"/>
            <rect x="14" y="7" width="7" height="10" fill="#3498DB"/>
            <rect x="22" y="7" width="9" height="10" fill="#2ECC71"/>
            <rect x="3" y="24" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="26" width="10" height="10" fill="#9B59B6"/>
            <rect x="16" y="26" width="7" height="10" fill="#F39C12"/>
            <rect x="24" y="26" width="9" height="10" fill="#1ABC9C"/>
            <rect x="3" y="43" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="45" width="7" height="10" fill="#E91E63"/>
            <rect x="13" y="45" width="10" height="10" fill="#00BCD4"/>
            <rect x="24" y="45" width="8" height="10" fill="#FF5722"/>
            <rect x="3" y="62" width="34" height="14" fill="#8B4513"/>
          </g>
        )}
        
        {/* Right Bookshelf */}
        {hasBookshelf && (
          <g transform="translate(320, 100)">
            <rect x="0" y="0" width="40" height="80" fill="#B8860B" rx="2"/>
            <rect x="3" y="5" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="7" width="9" height="10" fill="#2ECC71"/>
            <rect x="15" y="7" width="7" height="10" fill="#E74C3C"/>
            <rect x="23" y="7" width="8" height="10" fill="#3498DB"/>
            <rect x="3" y="24" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="26" width="7" height="10" fill="#F39C12"/>
            <rect x="13" y="26" width="10" height="10" fill="#9B59B6"/>
            <rect x="24" y="26" width="8" height="10" fill="#1ABC9C"/>
            <rect x="3" y="43" width="34" height="14" fill="#8B4513"/>
            <rect x="5" y="45" width="8" height="10" fill="#FF5722"/>
            <rect x="14" y="45" width="9" height="10" fill="#E91E63"/>
            <rect x="24" y="45" width="8" height="10" fill="#00BCD4"/>
            <rect x="3" y="62" width="34" height="14" fill="#8B4513"/>
          </g>
        )}
        
        {/* Campfire */}
        {hasCampfire && (
          <g transform="translate(200, 145)" filter="url(#fireGlow)">
            {/* Logs */}
            <ellipse cx="-15" cy="15" rx="20" ry="5" fill="#8B4513" transform="rotate(-30)"/>
            <ellipse cx="15" cy="15" rx="20" ry="5" fill="#8B4513" transform="rotate(30)"/>
            {/* Fire */}
            <ellipse cx="0" cy="-5" rx="12" ry="20" fill="#FF6B00">
              <animate attributeName="ry" values="18;22;18" dur="0.5s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="0" cy="0" rx="8" ry="15" fill="#FFD700">
              <animate attributeName="ry" values="13;16;13" dur="0.4s" repeatCount="indefinite"/>
            </ellipse>
            <ellipse cx="0" cy="5" rx="4" ry="8" fill="#FFFF00">
              <animate attributeName="ry" values="6;9;6" dur="0.3s" repeatCount="indefinite"/>
            </ellipse>
          </g>
        )}
        
        {/* Desk */}
        {hasDesk && (
          <g transform="translate(290, 140)">
            <rect x="0" y="0" width="55" height="6" fill="#8B4513"/>
            <rect x="5" y="6" width="6" height="35" fill="#A0522D"/>
            <rect x="44" y="6" width="6" height="35" fill="#A0522D"/>
            {/* Laptop */}
            <rect x="15" y="-14" width="24" height="14" fill="#333" rx="1"/>
            <rect x="10" y="-2" width="34" height="2" fill="#555"/>
          </g>
        )}
        
        {/* Plant */}
        {hasPlant && (
          <g transform="translate(85, 165)">
            <rect x="-10" y="5" width="20" height="25" fill="#8B4513" rx="2"/>
            <ellipse cx="0" cy="5" rx="12" ry="5" fill="#654321"/>
            <ellipse cx="-6" cy="-12" rx="10" ry="15" fill="#228B22"/>
            <ellipse cx="6" cy="-10" rx="9" ry="12" fill="#32CD32"/>
            <ellipse cx="0" cy="-18" rx="8" ry="12" fill="#2E8B57"/>
          </g>
        )}
        
        {/* Bean bag */}
        {hasBeanbag && (
          <g transform="translate(120, 230)">
            <ellipse cx="0" cy="0" rx="28" ry="18" fill="#9B59B6"/>
            <ellipse cx="0" cy="-10" rx="22" ry="14" fill="#8E44AD"/>
          </g>
        )}
        
        {/* Fairy lights */}
        {hasLights && (
          <g>
            <path d="M30 60 Q115 40 200 60 Q285 40 370 60" stroke="#333" strokeWidth="1" fill="none"/>
            {[45, 90, 135, 180, 225, 270, 315, 355].map((x, i) => (
              <circle key={i} cx={x} cy={55 + (i % 2) * 6} r="5" fill={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'][i]}>
                <animate attributeName="opacity" values="0.6;1;0.6" dur={`${0.8 + i * 0.1}s`} repeatCount="indefinite"/>
              </circle>
            ))}
          </g>
        )}
        
        {/* Wall gradients */}
        <defs>
          <linearGradient id="backWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={state.equippedWallpaper === 'forest' ? '#243F0F' : 
                                         state.equippedWallpaper === 'ocean' ? '#174A6E' :
                                         state.equippedWallpaper === 'mountain' ? '#4A5568' :
                                         state.equippedWallpaper === 'city' ? '#151C24' : '#141428'}/>
            <stop offset="100%" stopColor={state.equippedWallpaper === 'forest' ? '#2D5016' :
                                           state.equippedWallpaper === 'ocean' ? '#1E6091' :
                                           state.equippedWallpaper === 'mountain' ? '#5D6D7E' :
                                           state.equippedWallpaper === 'city' ? '#1C2833' : '#1A1A2E'}/>
          </linearGradient>
          <linearGradient id="leftWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={state.equippedWallpaper === 'forest' ? '#2D5016' : 
                                         state.equippedWallpaper === 'ocean' ? '#1E6091' :
                                         state.equippedWallpaper === 'mountain' ? '#5D6D7E' :
                                         state.equippedWallpaper === 'city' ? '#1C2833' : '#1A1A2E'}/>
            <stop offset="100%" stopColor={state.equippedWallpaper === 'forest' ? '#1B3A09' :
                                           state.equippedWallpaper === 'ocean' ? '#154360' :
                                           state.equippedWallpaper === 'mountain' ? '#34495E' :
                                           state.equippedWallpaper === 'city' ? '#17202A' : '#16213E'}/>
          </linearGradient>
          <linearGradient id="rightWall" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={state.equippedWallpaper === 'forest' ? '#3A6B1E' :
                                         state.equippedWallpaper === 'ocean' ? '#2874A6' :
                                         state.equippedWallpaper === 'mountain' ? '#85929E' :
                                         state.equippedWallpaper === 'city' ? '#2C3E50' : '#0F3460'}/>
            <stop offset="100%" stopColor={state.equippedWallpaper === 'forest' ? '#234A0F' :
                                           state.equippedWallpaper === 'ocean' ? '#1B5583' :
                                           state.equippedWallpaper === 'mountain' ? '#566573' :
                                           state.equippedWallpaper === 'city' ? '#1C2833' : '#16213E'}/>
          </linearGradient>
        </defs>
      </svg>
      
      {/* Character positioned in the room */}
      <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2">
        <Character size="lg" />
      </div>
    </div>
  )
}
