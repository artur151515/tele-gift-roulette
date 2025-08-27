import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Star, Coins, Sparkles, Trophy } from "lucide-react"
import { useGameStore } from "@/store/gameStore"
import { CaseCard } from "@/components/CaseCard"
import { Roulette } from "@/components/Roulette"
import { TokenShop } from "@/components/TokenShop"
import { UserProfile } from "@/components/UserProfile"
import { useToast } from "@/hooks/use-toast"

const Index = () => {
  const [activeTab, setActiveTab] = useState("cases")
  const { 
    user, 
    stats, 
    cases, 
    selectedCase, 
    isSpinning, 
    lastSpinResult,
    selectCase, 
    startSpin, 
    purchaseTokens 
  } = useGameStore()
  const { toast } = useToast()

  const handleCaseOpen = (caseToOpen: any) => {
    if (stats.balance < caseToOpen.price) {
      toast({
        title: "Недостаточно жетонов",
        description: `Для открытия ${caseToOpen.name} нужно ${caseToOpen.price} жетонов`,
        variant: "destructive"
      })
      return
    }
    
    selectCase(caseToOpen)
    setActiveTab("roulette")
  }

  const handleTokenPurchase = (packageId: string) => {
    purchaseTokens(packageId)
    toast({
      title: "Успешная покупка!",
      description: "Жетоны зачислены на ваш баланс",
    })
  }

  const rouletteItems = selectedCase?.gifts.map(gift => ({
    ...gift,
    weight: gift.rarity === 'legendary' ? 1 : 
            gift.rarity === 'epic' ? 5 :
            gift.rarity === 'rare' ? 20 : 74
  })) || []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Gift Roulette</h1>
                <p className="text-sm text-muted-foreground">Telegram Mini App</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-muted/20 rounded-full px-3 py-1">
                <Coins className="h-4 w-4 text-primary" />
                <span className="font-medium">{stats.balance}</span>
              </div>
              <Button 
                variant="telegram" 
                size="sm"
                onClick={() => setActiveTab("shop")}
              >
                <Star className="h-4 w-4" />
                Купить
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/20">
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger value="roulette" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Рулетка
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Магазин
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Выберите кейс</h2>
              <p className="text-muted-foreground">
                Открывайте кейсы и получайте эксклюзивные телеграм подарки
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cases.map((case_) => (
                <CaseCard
                  key={case_.id}
                  {...case_}
                  onOpen={() => handleCaseOpen(case_)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roulette" className="space-y-6">
            {selectedCase ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{selectedCase.name}</h2>
                  <p className="text-muted-foreground">
                    Стоимость: {selectedCase.price} жетонов
                  </p>
                </div>
                
                <Roulette
                  items={rouletteItems}
                  onSpin={startSpin}
                  isSpinning={isSpinning}
                  result={lastSpinResult?.gift}
                />
                
                {lastSpinResult && (
                  <div className="text-center">
                    <Button 
                      variant="telegram"
                      onClick={() => setActiveTab("cases")}
                    >
                      Открыть еще кейс
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Выберите кейс</h3>
                  <p className="text-muted-foreground mb-4">
                    Перейдите во вкладку "Кейсы" и выберите кейс для открытия
                  </p>
                  <Button 
                    variant="telegram"
                    onClick={() => setActiveTab("cases")}
                  >
                    Выбрать кейс
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="shop">
            <TokenShop onPurchase={handleTokenPurchase} />
          </TabsContent>

          <TabsContent value="profile">
            {user && (
              <div className="max-w-md mx-auto">
                <UserProfile user={user} stats={stats} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
