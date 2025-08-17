import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift } from "lucide-react"
import { cn } from "@/lib/utils"

interface CaseCardProps {
  id: string
  name: string
  price: number
  image: string
  rarity: 'common' | 'rare' | 'legendary'
  className?: string
  onOpen: () => void
}

const caseConfig = {
  common: {
    variant: "telegram" as const,
    badgeClassName: "bg-rarity-common text-white",
    cardClassName: "border-rarity-common/20 hover:border-rarity-common/40"
  },
  rare: {
    variant: "telegram" as const,
    badgeClassName: "bg-rarity-rare text-white", 
    cardClassName: "border-rarity-rare/20 hover:border-rarity-rare/40"
  },
  legendary: {
    variant: "gold" as const,
    badgeClassName: "bg-rarity-legendary text-white",
    cardClassName: "border-rarity-legendary/30 hover:border-rarity-legendary/50 shadow-gold/20"
  }
}

export function CaseCard({ id, name, price, image, rarity, className, onOpen }: CaseCardProps) {
  const config = caseConfig[rarity]
  
  return (
    <Card className={cn(
      "group overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl",
      config.cardClassName,
      className
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className={config.badgeClassName}>
            {rarity === 'legendary' ? 'Ультраредкий' : rarity === 'rare' ? 'Редкий' : 'Обычный'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="aspect-video relative rounded-lg overflow-hidden bg-muted/20">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <Gift className="absolute top-3 left-3 h-6 w-6 text-white drop-shadow-lg" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{price}</span>
          </div>
          
          <Button 
            variant={config.variant}
            size="sm"
            onClick={onOpen}
            className="px-6"
          >
            Открыть
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}