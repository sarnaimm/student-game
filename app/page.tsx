"use client"

import { GameProvider, useGame } from '@/lib/game-context'
import { ProfileSetup } from '@/components/game/profile-setup'
import { GameDashboard } from '@/components/game/game-dashboard'

function GameContent() {
  const { state } = useGame()

  if (!state.profile) {
    return <ProfileSetup />
  }

  return <GameDashboard />
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}
