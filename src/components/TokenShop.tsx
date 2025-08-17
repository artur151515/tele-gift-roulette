import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/enhanced-button"
import { Badge } from "@/components/ui/badge"
import { Star, Coins, Zap } from "lucide-react"

interface TokenPackage {
  id: string
  name: string
  tokens: number
  stars: number
  bonus?: number
  popular?: boolean
}

const packages: TokenPackage[] = [
  {
    id: "starter",
    name: "Стартовый",
    tokens: 100,
    stars: 50
  },
  {
    id: "popular", 
    name: "Популярный",
    tokens: 250,
    stars: 100,
    bonus: 50,
    popular: true
  },
  {
    id: "premium",
    name: "Премиум",
    tokens: 600,
    stars: 200,
    bonus: 150
  },
  {
    id: "mega",
    name: "Мега",
    tokens: 1500,
    stars: 450,
    bonus: 500
  }
]

interface TokenShopProps {
  onPurchase: (packageId: string) => void
}

export function TokenShop({ onPurchase }: TokenShopProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          Магазин жетонов
        </h2>
        <p className="text-muted-foreground">
          Покупайте жетоны за Telegram Stars и открывайте кейсы
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
              pkg.popular ? 'border-primary shadow-glow' : 'border-muted'
            }`}
          >
            {pkg.popular && (
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                Популярный
              </Badge>
            )}
            
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                {pkg.name}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {pkg.tokens.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">жетонов</span>
                </div>
                
                {pkg.bonus && (
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <Zap className="h-4 w-4" />
                    +{pkg.bonus} бонусных жетонов
                  </div>
                )}
              </div>
              
              <Button 
                variant={pkg.popular ? "gold" : "telegram"}
                className="w-full"
                onClick={() => onPurchase(pkg.id)}
              >
                <Star className="h-4 w-4" />
                {pkg.stars} Stars
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Безопасная оплата через Telegram Stars</p>
        <p>Жетоны зачисляются мгновенно</p>
      </div>
    </div>
  )
}