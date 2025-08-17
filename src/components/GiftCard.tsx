import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GiftCardProps {
  id: string
  name: string
  image: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  className?: string
}

const rarityConfig = {
  common: {
    label: "Обычный",
    className: "border-rarity-common/30 bg-rarity-common/5",
    badgeClassName: "bg-rarity-common text-white"
  },
  rare: {
    label: "Редкий", 
    className: "border-rarity-rare/30 bg-rarity-rare/5",
    badgeClassName: "bg-rarity-rare text-white"
  },
  epic: {
    label: "Эпический",
    className: "border-rarity-epic/30 bg-rarity-epic/5",
    badgeClassName: "bg-rarity-epic text-white"
  },
  legendary: {
    label: "Легендарный",
    className: "border-rarity-legendary/30 bg-rarity-legendary/5 shadow-gold",
    badgeClassName: "bg-rarity-legendary text-white"
  }
}

export function GiftCard({ id, name, image, rarity, className }: GiftCardProps) {
  const config = rarityConfig[rarity]
  
  return (
    <Card className={cn(
      "group overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg gift-float",
      config.className,
      className
    )}>
      <CardContent className="p-4">
        <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-muted/20">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge 
            className={cn("absolute top-2 right-2", config.badgeClassName)}
          >
            {config.label}
          </Badge>
        </div>
        <h3 className="font-semibold text-sm text-center truncate">
          {name}
        </h3>
      </CardContent>
    </Card>
  )
}