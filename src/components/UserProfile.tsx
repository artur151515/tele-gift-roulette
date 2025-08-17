import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Trophy, Clock } from "lucide-react"

interface UserStats {
  balance: number
  totalSpins: number
  giftsWon: number
  lastWin?: {
    name: string
    time: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
  }
}

interface UserProfileProps {
  user: {
    firstName: string
    username?: string
    avatar?: string
  }
  stats: UserStats
}

const rarityColors = {
  common: "text-rarity-common",
  rare: "text-rarity-rare", 
  epic: "text-rarity-epic",
  legendary: "text-rarity-legendary"
}

export function UserProfile({ user, stats }: UserProfileProps) {
  return (
    <Card className="bg-gradient-roulette border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.firstName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-primary">
                {user.firstName.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <CardTitle className="text-lg">{user.firstName}</CardTitle>
            {user.username && (
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Balance */}
        <div className="bg-muted/10 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="font-medium">Баланс</span>
            </div>
            <Badge variant="outline" className="text-lg px-3 border-primary/20">
              {stats.balance.toLocaleString()}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/10 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Trophy className="h-4 w-4 text-primary" />
            </div>
            <p className="text-lg font-bold">{stats.totalSpins}</p>
            <p className="text-xs text-muted-foreground">Вращений</p>
          </div>
          
          <div className="bg-muted/10 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Gift className="h-4 w-4 text-primary" />
            </div>
            <p className="text-lg font-bold">{stats.giftsWon}</p>
            <p className="text-xs text-muted-foreground">Подарков</p>
          </div>
        </div>

        {/* Last Win */}
        {stats.lastWin && (
          <div className="bg-muted/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Последний выигрыш</span>
            </div>
            <div className="space-y-1">
              <p className={`font-medium ${rarityColors[stats.lastWin.rarity]}`}>
                {stats.lastWin.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {stats.lastWin.time}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}