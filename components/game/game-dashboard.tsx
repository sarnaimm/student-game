"use client"

import { useState } from 'react'
import { Header } from './header'
import { Room } from './room'
import { TasksPanel } from './tasks-panel'
import { ShopPanel } from './shop-panel'
import { CustomizePanel } from './customize-panel'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckSquare, 
  ShoppingBag, 
  Home, 
  Palette,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export function GameDashboard() {
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Mobile Tabs */}
        <div className="lg:hidden mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="room" className="gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Room</span>
              </TabsTrigger>
              <TabsTrigger value="tasks" className="gap-1">
                <CheckSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Tasks</span>
              </TabsTrigger>
              <TabsTrigger value="shop" className="gap-1">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Shop</span>
              </TabsTrigger>
              <TabsTrigger value="customize" className="gap-1">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Style</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="room" className="mt-4">
              <Room />
            </TabsContent>
            <TabsContent value="tasks" className="mt-4">
              <TasksPanel />
            </TabsContent>
            <TabsContent value="shop" className="mt-4">
              <ShopPanel />
            </TabsContent>
            <TabsContent value="customize" className="mt-4">
              <CustomizePanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Tasks */}
          <div className={`transition-all duration-300 ${showSidebar ? 'col-span-3' : 'col-span-0 hidden'}`}>
            <TasksPanel />
          </div>

          {/* Center - Room */}
          <div className={`transition-all duration-300 ${showSidebar ? 'col-span-6' : 'col-span-8'} relative`}>
            {/* Toggle sidebar button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>

            <div className="bg-card rounded-xl border-2 border-primary/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Your Cozy Space
                </h2>
              </div>
              <Room />
            </div>
          </div>

          {/* Right Sidebar - Shop & Customize */}
          <div className={`transition-all duration-300 ${showSidebar ? 'col-span-3' : 'col-span-4'} space-y-6`}>
            <ShopPanel />
            <CustomizePanel />
          </div>
        </div>

        {/* Encouraging message */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Remember: Every small step counts! Complete tasks to earn coins and make your space feel like home. 
            You&apos;re doing great! 🌟
          </p>
        </div>
      </main>
    </div>
  )
}
