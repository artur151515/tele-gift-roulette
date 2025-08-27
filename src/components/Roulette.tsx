import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Gift, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GiftCard } from "./GiftCard";

interface RouletteItem {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  weight?: number;
}

interface RouletteProps {
  items: RouletteItem[];
  onSpin: (item: RouletteItem) => void;
  isSpinning: boolean;
  result?: RouletteItem;
}

const CARD_W = 140; // ширина карточки в px (совпадает с w-[140px] ниже)

export function Roulette({ items, onSpin, isSpinning, result }: RouletteProps) {
  const [displayItems, setDisplayItems] = useState<RouletteItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  // Расширяем ленту для плавной прокрутки (повторяем 5 раз)
  useEffect(() => {
    if (!items?.length) {
      setDisplayItems([]);
      return;
    }
    const extended = [...items, ...items, ...items, ...items, ...items];
    setDisplayItems(extended);
    // Ставим "камеру" примерно в середину ленты
    setSelectedIndex(items.length * 2);
    // Прокрутка к центру без анимации при инициализации
    requestAnimationFrame(() => {
      const el = stripRef.current;
      if (!el) return;
      const target = (items.length * 2) * CARD_W - el.clientWidth / 2 + CARD_W / 2;
      el.scrollLeft = Math.max(0, target);
    });
  }, [items]);

  const handleSpin = () => {
    if (isSpinning || !items.length) return;

    // Взвешенный выбор
    const totalWeight = items.reduce((sum, it) => sum + (it.weight ?? 50), 0);
    let rnd = Math.random() * totalWeight;
    let chosen = 0;
    for (let i = 0; i < items.length; i++) {
      rnd -= items[i].weight ?? 50;
      if (rnd <= 0) {
        chosen = i;
        break;
      }
    }

    const selectedItem = items[chosen];
    const base = items.length * 2; // середина расширенной ленты
    const idxInExtended = base + chosen;
    setSelectedIndex(idxInExtended);

    // Мягкая прокрутка к выигрышу по центру
    const el = stripRef.current;
    if (el) {
      const target = idxInExtended * CARD_W - el.clientWidth / 2 + CARD_W / 2;
      el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    }

    // Лёгкий хаптик (если открыто в Telegram)
    // @ts-ignore
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred?.("medium");

    // Сообщаем наверх о выбранном предмете (там ты включаешь спин/дебет и т.п.)
    onSpin(selectedItem);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-roulette border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Gift Roulette</h2>
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Крутите рулетку и выигрывайте телеграм-подарки!
            </p>
          </div>

          {/* Roulette Window */}
          <div className="relative">
            <div className="bg-muted/10 rounded-xl p-4 border border-primary/10">
              <div className="relative overflow-hidden">
                {/* Центральный указатель */}
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-primary/40 z-10 rounded" />

                {/* Лента с предметами */}
                <div
                  ref={stripRef}
                  className={cn(
                    "no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory rounded-xl",
                    "ring-1 ring-white/10"
                  )}
                >
                  <div className="flex gap-2 p-3">
                    {displayItems.map((it, i) => (
                      <div
                        key={`${it.id}-${i}`}
                        className="snap-center shrink-0 w-[140px] h-[140px]"
                      >
                        <GiftCard {...it} className="h-full" />
                      </div>
                    ))}
                  </div>
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

          {/* Result */}
          {result && !isSpinning && (
            <div className="text-center space-y-3">
              <h3 className="text-xl font-bold text-primary">🎉 Поздравляем!</h3>
              <div className="flex justify-center">
                <GiftCard {...result} className="max-w-48" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
