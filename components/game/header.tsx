"use client"

import { useGame } from '@/lib/game-context'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Coins, User, MapPin, GraduationCap, Heart, Settings, Sparkles } from 'lucide-react'
import { Character } from './character'

export function Header() {
  const { state } = useGame()
  const profile = state.profile

  const completedTasks = state.tasks.filter(t => t.completed).length

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">CozyConnect</h1>
            <p className="text-xs text-muted-foreground">Connect & Grow</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4">
          {/* Coins */}
          <Badge variant="secondary" className="text-base px-4 py-1.5 flex items-center gap-2 bg-amber-100 text-amber-800 border-amber-200">
            <Coins className="h-4 w-4" />
            <span className="font-bold">{state.coins.toLocaleString()}</span>
          </Badge>

          {/* Tasks Progress */}
          <Badge variant="secondary" className="text-base px-4 py-1.5 flex items-center gap-2 bg-primary/10 text-primary border-primary/20">
            <Heart className="h-4 w-4" />
            <span className="font-bold">{completedTasks}/{state.tasks.length}</span>
          </Badge>

          {/* Profile Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden">
                <div className="w-full h-full">
                  <Character size="sm" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-base font-medium leading-none">{profile?.name || 'Student'}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {profile?.country || 'Unknown'}
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <GraduationCap className="h-4 w-4" />
                <span>{profile?.university || 'University'}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" />
                <span>{profile?.yearOfStudy || 'Student'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">Interests</DropdownMenuLabel>
              <div className="px-2 py-1.5 flex flex-wrap gap-1">
                {profile?.interests?.slice(0, 5).map((interest) => (
                  <Badge key={interest} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 text-destructive cursor-pointer"
                onClick={() => {
                  localStorage.removeItem('cozyconnect-game-state')
                  window.location.reload()
                }}
              >
                <Settings className="h-4 w-4" />
                <span>Reset Game</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
