export interface User {
  id: string
  firstName: string
  username?: string
  avatar?: string
}

export interface Gift {
  id: string
  name: string
  image: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  type: 'gift'
}

export interface Case {
  id: string
  name: string
  price: number
  image: string
  rarity: 'common' | 'rare' | 'legendary'
  gifts: Gift[]
}

export interface UserStats {
  balance: number
  totalSpins: number
  giftsWon: number
  lastWin?: {
    name: string
    time: string
    rarity: 'common' | 'rare' | 'epic' | 'legendary'
  }
}

export interface SpinResult {
  gift: Gift
  serverSeed: string
  clientSeed: string
  nonce: number
}