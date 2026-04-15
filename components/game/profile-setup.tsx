"use client"

import { useState } from 'react'
import { useGame } from '@/lib/game-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { 
  PlayerProfile, 
  characterColors, 
  characterExpressions, 
  interestOptions 
} from '@/lib/game-store'
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'

export function ProfileSetup() {
  const { setProfile } = useGame()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    university: '',
    yearOfStudy: '',
    interests: [] as string[],
    bodyColor: 'blue',
    expression: 'happy',
  })

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : prev.interests.length < 5
          ? [...prev.interests, interest]
          : prev.interests
    }))
  }

  const handleSubmit = () => {
    const profile: PlayerProfile = {
      name: formData.name,
      country: formData.country,
      university: formData.university,
      yearOfStudy: formData.yearOfStudy,
      interests: formData.interests,
      avatar: {
        bodyColor: formData.bodyColor,
        expression: formData.expression,
        accessory: null,
        clothing: null,
      }
    }
    setProfile(profile)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.trim().length > 0
      case 2:
        return formData.country.trim().length > 0 && formData.university.trim().length > 0
      case 3:
        return formData.interests.length >= 2
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-2 border-primary/20 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to CozyConnect!</CardTitle>
          <CardDescription className="text-base">
            {step === 1 && "Let's get to know you! What should we call you?"}
            {step === 2 && "Tell us about your study abroad journey"}
            {step === 3 && "What are you interested in? (Pick 2-5)"}
            {step === 4 && "Customize your cute companion!"}
          </CardDescription>
          
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full transition-all ${
                  s === step 
                    ? 'bg-primary w-6' 
                    : s < step 
                      ? 'bg-primary/50' 
                      : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-lg"
                />
              </div>
            </div>
          )}

          {/* Step 2: Study Info */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="country">Home Country</Label>
                <Input
                  id="country"
                  placeholder="Where are you from?"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  placeholder="Where are you studying?"
                  value={formData.university}
                  onChange={(e) => setFormData(prev => ({ ...prev, university: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year of Study</Label>
                <div className="flex gap-2">
                  {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate'].map((year) => (
                    <Button
                      key={year}
                      variant={formData.yearOfStudy === year ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, yearOfStudy: year }))}
                      className="flex-1 text-xs"
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interests */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={formData.interests.includes(interest) ? 'default' : 'outline'}
                    className={`cursor-pointer transition-all text-sm py-1.5 px-3 ${
                      formData.interests.includes(interest) 
                        ? 'bg-primary hover:bg-primary/90' 
                        : 'hover:bg-primary/10'
                    }`}
                    onClick={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Selected: {formData.interests.length}/5
              </p>
            </div>
          )}

          {/* Step 4: Avatar */}
          {step === 4 && (
            <div className="space-y-6">
              {/* Character Preview */}
              <div className="flex justify-center">
                <div className="w-32 h-32 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <ellipse
                      cx="50"
                      cy="55"
                      rx="40"
                      ry="38"
                      fill={characterColors.find(c => c.id === formData.bodyColor)?.color || '#5DADE2'}
                    />
                    <ellipse cx="35" cy="30" rx="15" ry="10" fill="white" opacity="0.3"/>
                    <ellipse cx="25" cy="50" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
                    <ellipse cx="75" cy="50" rx="8" ry="5" fill="#FFB6C1" opacity="0.5" />
                    
                    {/* Eyes based on expression */}
                    {formData.expression === 'happy' && (
                      <>
                        <circle cx="35" cy="40" r="4" fill="#333" />
                        <circle cx="65" cy="40" r="4" fill="#333" />
                        <circle cx="36" cy="38" r="1.5" fill="white" />
                        <circle cx="66" cy="38" r="1.5" fill="white" />
                      </>
                    )}
                    {formData.expression === 'excited' && (
                      <>
                        <circle cx="35" cy="40" r="5" fill="#333" />
                        <circle cx="65" cy="40" r="5" fill="#333" />
                        <circle cx="37" cy="38" r="2" fill="white" />
                        <circle cx="67" cy="38" r="2" fill="white" />
                      </>
                    )}
                    {formData.expression === 'sleepy' && (
                      <>
                        <path d="M30 40 Q35 42 40 40" stroke="#333" strokeWidth="2" fill="none" />
                        <path d="M60 40 Q65 42 70 40" stroke="#333" strokeWidth="2" fill="none" />
                      </>
                    )}
                    {formData.expression === 'calm' && (
                      <>
                        <circle cx="35" cy="40" r="3" fill="#333" />
                        <circle cx="65" cy="40" r="3" fill="#333" />
                      </>
                    )}
                    {formData.expression === 'cool' && (
                      <>
                        <ellipse cx="35" cy="40" rx="3" ry="2" fill="#333" />
                        <ellipse cx="65" cy="40" rx="3" ry="2" fill="#333" />
                      </>
                    )}
                    
                    {/* Mouth based on expression */}
                    {formData.expression === 'happy' && (
                      <path d="M38 55 Q50 70 62 55" stroke="#333" strokeWidth="2" fill="none" />
                    )}
                    {formData.expression === 'excited' && (
                      <ellipse cx="50" cy="60" rx="10" ry="8" fill="#333" />
                    )}
                    {formData.expression === 'sleepy' && (
                      <ellipse cx="50" cy="58" rx="6" ry="4" fill="#333" />
                    )}
                    {formData.expression === 'calm' && (
                      <path d="M42 58 Q50 62 58 58" stroke="#333" strokeWidth="2" fill="none" />
                    )}
                    {formData.expression === 'cool' && (
                      <path d="M40 58 Q50 62 60 58" stroke="#333" strokeWidth="2" fill="none" />
                    )}
                  </svg>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label>Choose Your Color</Label>
                <div className="flex justify-center gap-3">
                  {characterColors.map((color) => (
                    <button
                      key={color.id}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        formData.bodyColor === color.id 
                          ? 'border-primary scale-110' 
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.color }}
                      onClick={() => setFormData(prev => ({ ...prev, bodyColor: color.id }))}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Expression Selection */}
              <div className="space-y-2">
                <Label>Choose Your Expression</Label>
                <div className="flex justify-center gap-2">
                  {characterExpressions.map((exp) => (
                    <Button
                      key={exp.id}
                      variant={formData.expression === exp.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, expression: exp.id }))}
                      className="text-lg"
                    >
                      {exp.emoji}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(s => s - 1)}
              disabled={step === 1}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="gap-1"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="gap-1 bg-primary"
              >
                Start Your Journey!
                <Sparkles className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
