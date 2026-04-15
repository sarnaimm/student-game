"use client"

import { useState } from 'react'
import { useGame } from '@/lib/game-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, Circle, Coins, RefreshCw, Users, Heart, BookOpen, Globe, X, Send } from 'lucide-react'

const categoryIcons = {
  social: Users,
  wellness: Heart,
  academic: BookOpen,
  cultural: Globe,
}

const categoryColors = {
  social: 'bg-blue-100 text-blue-700',
  wellness: 'bg-pink-100 text-pink-700',
  academic: 'bg-amber-100 text-amber-700',
  cultural: 'bg-green-100 text-green-700',
}

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-orange-100 text-orange-700',
  hard: 'bg-red-100 text-red-700',
}

export function TasksPanel() {
  const { state, completeTask, resetTasks } = useGame()
  const [filter, setFilter] = useState<string>('all')
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [reflection, setReflection] = useState('')
  
  const completedCount = state.tasks.filter(t => t.completed).length
  const totalCoinsEarned = state.tasks
    .filter(t => t.completed)
    .reduce((sum, t) => sum + t.coins, 0)
  
  const filteredTasks = filter === 'all' 
    ? state.tasks 
    : state.tasks.filter(t => t.category === filter)

  const selectedTaskData = state.tasks.find(t => t.id === selectedTask)

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId)
    setReflection('')
  }

  const handleSubmitReflection = () => {
    if (selectedTask && reflection.trim().length >= 10) {
      completeTask(selectedTask)
      setSelectedTask(null)
      setReflection('')
    }
  }

  const handleCancel = () => {
    setSelectedTask(null)
    setReflection('')
  }

  return (
    <Card className="h-full border-2 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            Daily Tasks
            <Badge variant="secondary" className="ml-2">
              {completedCount}/{state.tasks.length}
            </Badge>
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={resetTasks}
            className="gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset
          </Button>
        </div>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {['all', 'social', 'wellness', 'academic', 'cultural'].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(cat)}
              className="capitalize"
            >
              {cat}
            </Button>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium flex items-center gap-1">
              <Coins className="h-4 w-4 text-amber-500" />
              {totalCoinsEarned} earned
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${(completedCount / state.tasks.length) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 overflow-y-auto">
        {filteredTasks.map((task) => {
          const CategoryIcon = categoryIcons[task.category]
          
          return (
            <div
              key={task.id}
              className={`p-3 rounded-lg border transition-all ${
                task.completed 
                  ? 'bg-muted/50 border-muted' 
                  : 'bg-card border-border hover:border-primary/50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => !task.completed && handleTaskClick(task.id)}
                  disabled={task.completed}
                  className="mt-0.5"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </h4>
                    <Badge variant="outline" className={`${categoryColors[task.category]} border-0 text-xs`}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {task.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={`${difficultyColors[task.difficulty]} border-0 text-xs`}>
                      {task.difficulty}
                    </Badge>
                    <Badge variant="secondary" className="text-xs flex items-center gap-1">
                      <Coins className="h-3 w-3 text-amber-500" />
                      +{task.coins}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>

      {/* Reflection Modal */}
      {selectedTask && selectedTaskData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-xl max-w-md w-full p-6 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Complete Task</h3>
              <button 
                onClick={handleCancel}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground">{selectedTaskData.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{selectedTaskData.description}</p>
              <Badge variant="secondary" className="mt-2 text-xs flex items-center gap-1 w-fit">
                <Coins className="h-3 w-3 text-amber-500" />
                +{selectedTaskData.coins} coins
              </Badge>
            </div>
            
            <div className="space-y-3">
              <label className="block">
                <span className="text-sm font-medium text-foreground">
                  How did you complete this task? How did it make you feel?
                </span>
                <Textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Example: I said hi to someone in my class today. It felt a bit nervous..."
                  className="mt-2 resize-none"
                />
              </label>
              
              <p className="text-xs text-muted-foreground">
                Write at least 10 characters to share your experience
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim().length < 10}
                  className="flex-1 gap-2"
                >
                  <Send className="h-4 w-4" />
                  Complete Task
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
