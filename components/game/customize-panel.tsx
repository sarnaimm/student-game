"use client"

import { useGame } from '@/lib/game-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { characterColors, characterExpressions } from '@/lib/game-store'
import { Palette } from 'lucide-react'
import { Character } from './character'

export function CustomizePanel() {
  const { state, updateAvatar } = useGame()
  const avatar = state.profile?.avatar

  if (!avatar) return null

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Customize
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Character Preview */}
        <div className="flex justify-center">
          <Character size="lg" />
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <Label className="text-sm">Color</Label>
          <div className="flex justify-center gap-2">
            {characterColors.map((color) => (
              <button
                key={color.id}
                className={`w-8 h-8 rounded-full border-3 transition-all ${
                  avatar.bodyColor === color.id 
                    ? 'border-primary scale-110 ring-2 ring-primary ring-offset-2' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => updateAvatar({ ...avatar, bodyColor: color.id })}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Expression Selection */}
        <div className="space-y-2">
          <Label className="text-sm">Mood</Label>
          <div className="flex justify-center gap-1">
            {characterExpressions.map((exp) => (
              <Button
                key={exp.id}
                variant={avatar.expression === exp.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateAvatar({ ...avatar, expression: exp.id })}
                className="text-base px-3"
                title={exp.name}
              >
                {exp.emoji}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
