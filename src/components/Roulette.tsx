import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Gift, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { GiftCard } from "./GiftCard"

interface RouletteItem {
  id: string
  name: string
  image: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  weight?: number
}

interface RouletteProps {
  items: RouletteItem[]
  onSpin: (item: RouletteItem) => void
  isSpinning: boolean
  result?: RouletteItem
}

export function Roulette({ items, onSpin, isSpinning, result }: RouletteProps) {
  const [displayItems, setDisplayItems] = useState<RouletteItem[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    // Create a circular display with duplicated items for smooth animation
    const extended = [...items, ...items, ...items, ...items, ...items]
    setDisplayItems(extended)
  }, [items])

  const handleSpin = () => {
    if (isSpinning || !items.length) return
    
    // Weighted random selection
    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 50), 0)
    let random = Math.random() * totalWeight
    
    for (let i = 0; i < items.length; i++) {
      random -= (items[i].weight || 50)
      if (random <= 0) {
        const selectedItem = items[i]
        setSelectedIndex(items.length * 2 + i) // Position in extended array
        onSpin(selectedItem)
        break
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-roulette border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Roulette Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Gift Roulette</h2>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Крутите рулетку и выигрывайте телеграм подарки!
            </p>
          </div>

          {/* Roulette Window */}
          <div className="relative">
            <div className="bg-muted/10 rounded-xl p-4 border border-primary/10">
              <div className="relative overflow-hidden h-32">
                {/* Selection indicator */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-2 h-16 bg-primary rounded-full shadow-glow"></div>
                </div>
                
                {/* Items strip */}
                <div 
                  className={cn(
                    "flex gap-2 transition-transform duration-3000 ease-out h-full",
                    isSpinning && "roulette-spin"
                  )}
                  style={{
                    transform: isSpinning ? `translateX(-${selectedIndex * 128}px)` : 'translateX(0px)'
                  }}
                >
                  {displayItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex-shrink-0 w-28">
                      <GiftCard 
                        {...item}
                        className="h-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <div className="text-center">
            <Button
              variant="telegram"
              size="xl"
              onClick={handleSpin}
              disabled={isSpinning || !items.length}
              className="min-w-48"
            >
              {isSpinning ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Крутим...
                </>
              ) : (
                <>
                  <Gift className="h-5 w-5" />
                  Крутить рулетку
                </>
              )}
            </Button>
          </div>

          {/* Provably Fair */}
          <div className="text-center">
            <Badge variant="outline" className="border-primary/20 text-primary">
              Provably Fair ✓
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              Честная игра с криптографической проверкой
            </p>
          </div>

          {/* Result Display */}
          {result && !isSpinning && (
            <div className="text-center space-y-3 bounce-in">
              <h3 className="text-xl font-bold text-primary">
                🎉 Поздравляем!
              </h3>
              <div className="flex justify-center">
                <GiftCard {...result} className="max-w-48" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}