"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { 
  GameState, 
  PlayerProfile, 
  Task, 
  ShopItem, 
  defaultTasks, 
  defaultShopItems 
} from './game-store'

interface GameContextType {
  state: GameState
  setProfile: (profile: PlayerProfile) => void
  completeTask: (taskId: string) => void
  buyItem: (itemId: string) => boolean
  equipItem: (itemId: string) => void
  addCoins: (amount: number) => void
  resetTasks: () => void
  updateAvatar: (avatar: PlayerProfile['avatar']) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const STORAGE_KEY = 'cozyconnect-game-state'

const defaultState: GameState = {
  profile: null,
  coins: 500,
  tasks: defaultTasks,
  shopItems: defaultShopItems,
  roomItems: [],
  equippedWallpaper: 'forest',
  dailyStreak: 0,
  lastLoginDate: null,
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(defaultState)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setState({ ...defaultState, ...parsed })
      } catch {
        setState(defaultState)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state, isLoaded])

  const setProfile = (profile: PlayerProfile) => {
    setState(prev => ({ ...prev, profile }))
  }

  const completeTask = (taskId: string) => {
    setState(prev => {
      const task = prev.tasks.find(t => t.id === taskId)
      if (!task || task.completed) return prev

      return {
        ...prev,
        coins: prev.coins + task.coins,
        tasks: prev.tasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        ),
      }
    })
  }

  const buyItem = (itemId: string): boolean => {
    const item = state.shopItems.find(i => i.id === itemId)
    if (!item || item.owned || state.coins < item.price) {
      return false
    }

    setState(prev => ({
      ...prev,
      coins: prev.coins - item.price,
      shopItems: prev.shopItems.map(i =>
        i.id === itemId ? { ...i, owned: true } : i
      ),
    }))
    return true
  }

  const equipItem = (itemId: string) => {
    const item = state.shopItems.find(i => i.id === itemId)
    if (!item || !item.owned) return

    setState(prev => {
      if (item.type === 'wallpaper') {
        return {
          ...prev,
          equippedWallpaper: item.image,
          shopItems: prev.shopItems.map(i =>
            i.type === 'wallpaper'
              ? { ...i, equipped: i.id === itemId }
              : i
          ),
        }
      }

      // For other items, toggle equipped state
      return {
        ...prev,
        shopItems: prev.shopItems.map(i =>
          i.id === itemId ? { ...i, equipped: !i.equipped } : i
        ),
      }
    })
  }

  const addCoins = (amount: number) => {
    setState(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }))
  }

  const resetTasks = () => {
    setState(prev => ({
      ...prev,
      tasks: defaultTasks,
    }))
  }

  const updateAvatar = (avatar: PlayerProfile['avatar']) => {
    if (!state.profile) return
    setState(prev => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, avatar } : null,
    }))
  }

  if (!isLoaded) {
    return null
  }

  return (
    <GameContext.Provider
      value={{
        state,
        setProfile,
        completeTask,
        buyItem,
        equipItem,
        addCoins,
        resetTasks,
        updateAvatar,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
