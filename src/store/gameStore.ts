import { create } from 'zustand'
import { User, UserStats, Case, Gift, SpinResult } from '@/types/game'

interface GameState {
  user: User | null
  stats: UserStats
  cases: Case[]
  selectedCase: Case | null
  isSpinning: boolean
  lastSpinResult: SpinResult | null
  
  // Actions
  setUser: (user: User) => void
  updateBalance: (amount: number) => void
  selectCase: (case_: Case) => void
  startSpin: () => void
  completeSpin: (result: SpinResult) => void
  purchaseTokens: (packageId: string) => void
}

// Mock data
const mockGifts: Gift[] = [
  {
    id: 'gift1',
    name: 'Стандартный подарок',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&h=300&fit=crop',
    rarity: 'common',
    type: 'gift'
  },
  {
    id: 'gift2', 
    name: 'Редкий подарок',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop',
    rarity: 'rare',
    type: 'gift'
  },
  {
    id: 'gift3',
    name: 'Эпический подарок',
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=300&fit=crop',
    rarity: 'epic',
    type: 'gift'
  },
  {
    id: 'gift4',
    name: 'Кепка Дурова',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&h=300&fit=crop',
    rarity: 'legendary',
    type: 'gift'
  }
]

const mockCases: Case[] = [
  {
    id: 'case1',
    name: 'Обычный кейс',
    price: 50,
    image: 'https://images.unsplash.com/photo-1607083206325-cbb2c482a5ba?w=400&h=300&fit=crop',
    rarity: 'common',
    gifts: mockGifts.filter(g => ['common', 'rare'].includes(g.rarity))
  },
  {
    id: 'case2',
    name: 'Редкий кейс', 
    price: 150,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop',
    rarity: 'rare',
    gifts: mockGifts.filter(g => ['rare', 'epic'].includes(g.rarity))
  },
  {
    id: 'case3',
    name: 'Легендарный кейс',
    price: 500,
    image: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&h=300&fit=crop',
    rarity: 'legendary', 
    gifts: mockGifts
  }
]

export const useGameStore = create<GameState>((set, get) => ({
  user: {
    id: 'user1',
    firstName: 'Павел',
    username: 'durov',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  stats: {
    balance: 250,
    totalSpins: 12,
    giftsWon: 7,
    lastWin: {
      name: 'Редкий подарок',
      time: '2 часа назад',
      rarity: 'rare'
    }
  },
  cases: mockCases,
  selectedCase: null,
  isSpinning: false,
  lastSpinResult: null,

  setUser: (user) => set({ user }),
  
  updateBalance: (amount) => set((state) => ({
    stats: { ...state.stats, balance: state.stats.balance + amount }
  })),

  selectCase: (case_) => set({ selectedCase: case_ }),

  startSpin: () => {
    const { selectedCase, stats } = get()
    if (!selectedCase || stats.balance < selectedCase.price) return
    
    set({ isSpinning: true })
    set((state) => ({
      stats: { ...state.stats, balance: state.stats.balance - selectedCase.price }
    }))

    // Simulate spin
    setTimeout(() => {
      const gifts = selectedCase.gifts
      const weights = gifts.map(g => {
        switch(g.rarity) {
          case 'legendary': return 1
          case 'epic': return 5
          case 'rare': return 20
          case 'common': return 74
          default: return 50
        }
      })
      
      const totalWeight = weights.reduce((a, b) => a + b, 0)
      let random = Math.random() * totalWeight
      
      let selectedGift = gifts[0]
      for (let i = 0; i < gifts.length; i++) {
        random -= weights[i]
        if (random <= 0) {
          selectedGift = gifts[i]
          break
        }
      }

      const result: SpinResult = {
        gift: selectedGift,
        serverSeed: Math.random().toString(36),
        clientSeed: Math.random().toString(36),
        nonce: Date.now()
      }

      set((state) => ({
        isSpinning: false,
        lastSpinResult: result,
        stats: {
          ...state.stats,
          totalSpins: state.stats.totalSpins + 1,
          giftsWon: state.stats.giftsWon + 1,
          lastWin: {
            name: selectedGift.name,
            time: 'Только что',
            rarity: selectedGift.rarity
          }
        }
      }))
    }, 3000)
  },

  completeSpin: (result) => set({ lastSpinResult: result, isSpinning: false }),

  purchaseTokens: (packageId) => {
    const packages = {
      starter: 100,
      popular: 300, // 250 + 50 bonus
      premium: 750, // 600 + 150 bonus
      mega: 2000 // 1500 + 500 bonus
    }
    
    const tokens = packages[packageId as keyof typeof packages] || 0
    set((state) => ({
      stats: { ...state.stats, balance: state.stats.balance + tokens }
    }))
  }
}))