"use client"

import { useState } from 'react'
import { useGame } from '@/lib/game-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Coins, 
  ShoppingBag, 
  Sofa, 
  Wallpaper, 
  Shirt, 
  Sparkles,
  Check,
  Lock
} from 'lucide-react'

const typeIcons = {
  furniture: Sofa,
  wallpaper: Wallpaper,
  clothing: Shirt,
  accessory: Sparkles,
}

const itemEmojis: Record<string, string> = {
  // Furniture
  bookshelf: '📚',
  campfire: '🔥',
  bed: '🛏️',
  desk: '🖥️',
  plant: '🌱',
  rug: '🟥',
  lights: '✨',
  beanbag: '🫘',
  // Wallpapers
  forest: '🌲',
  ocean: '🌊',
  mountain: '⛰️',
  city: '🏙️',
  stars: '⭐',
  // Clothing
  scarf: '🧣',
  hat: '🎩',
  glasses: '👓',
  bowtie: '🎀',
  crown: '👑',
  // Accessories
  backpack: '🎒',
  coffee: '☕',
  book: '📖',
  headphones: '🎧',
}

export function ShopPanel() {
  const { state, buyItem, equipItem } = useGame()
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null)

  const handleBuy = (itemId: string, itemName: string, price: number) => {
    if (state.coins < price) {
      setPurchaseMessage(`Not enough coins for ${itemName}!`)
      setTimeout(() => setPurchaseMessage(null), 2000)
      return
    }
    
    const success = buyItem(itemId)
    if (success) {
      setPurchaseMessage(`Bought ${itemName}!`)
      setTimeout(() => setPurchaseMessage(null), 2000)
    }
  }

  const renderItems = (type: string) => {
    const items = state.shopItems.filter(i => i.type === type)
    
    return (
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-lg border-2 transition-all ${
              item.equipped 
                ? 'border-primary bg-primary/10' 
                : item.owned 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="text-3xl text-center mb-2">
              {itemEmojis[item.image] || '📦'}
            </div>
            
            <h4 className="font-medium text-sm text-center truncate">
              {item.name}
            </h4>
            
            <div className="flex justify-center mt-2">
              {item.owned ? (
                <Button
                  size="sm"
                  variant={item.equipped ? 'default' : 'outline'}
                  onClick={() => equipItem(item.id)}
                  className="w-full gap-1"
                >
                  {item.equipped ? (
                    <>
                      <Check className="h-3 w-3" />
                      Equipped
                    </>
                  ) : (
                    'Equip'
                  )}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleBuy(item.id, item.name, item.price)}
                  disabled={state.coins < item.price}
                  className="w-full gap-1"
                >
                  {state.coins < item.price ? (
                    <Lock className="h-3 w-3" />
                  ) : (
                    <Coins className="h-3 w-3 text-amber-500" />
                  )}
                  {item.price}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="h-full border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shop
          </CardTitle>
          <Badge variant="secondary" className="text-base px-3 py-1 flex items-center gap-1">
            <Coins className="h-4 w-4 text-amber-500" />
            {state.coins}
          </Badge>
        </div>
        
        {purchaseMessage && (
          <div className="mt-2 p-2 bg-primary/10 rounded-lg text-center text-sm font-medium animate-pulse">
            {purchaseMessage}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="furniture" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="furniture" className="text-xs gap-1">
              <Sofa className="h-3 w-3" />
              <span className="hidden sm:inline">Furniture</span>
            </TabsTrigger>
            <TabsTrigger value="wallpaper" className="text-xs gap-1">
              <Wallpaper className="h-3 w-3" />
              <span className="hidden sm:inline">Walls</span>
            </TabsTrigger>
            <TabsTrigger value="clothing" className="text-xs gap-1">
              <Shirt className="h-3 w-3" />
              <span className="hidden sm:inline">Clothes</span>
            </TabsTrigger>
            <TabsTrigger value="accessory" className="text-xs gap-1">
              <Sparkles className="h-3 w-3" />
              <span className="hidden sm:inline">Items</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4 max-h-[350px] overflow-y-auto">
            <TabsContent value="furniture" className="mt-0">
              {renderItems('furniture')}
            </TabsContent>
            <TabsContent value="wallpaper" className="mt-0">
              {renderItems('wallpaper')}
            </TabsContent>
            <TabsContent value="clothing" className="mt-0">
              {renderItems('clothing')}
            </TabsContent>
            <TabsContent value="accessory" className="mt-0">
              {renderItems('accessory')}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
