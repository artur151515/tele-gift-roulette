import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Coins, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rarity: "common" | "rare" | "legendary";
  className?: string;
  onOpen: () => void;
}

const rarityLabel: Record<CaseCardProps["rarity"], string> = {
  common: "Обычный",
  rare: "Редкий",
  legendary: "Ультраредкий",
};

const caseConfig = {
  common: {
    variant: "telegram" as const,
    badgeClassName: "bg-rarity-common text-white",
    cardClassName: "border-rarity-common/25 hover:border-rarity-common/50",
  },
  rare: {
    variant: "telegram" as const,
    badgeClassName: "bg-rarity-rare text-white",
    cardClassName: "border-rarity-rare/25 hover:border-rarity-rare/50",
  },
  legendary: {
    variant: "gold" as const,
    badgeClassName: "bg-rarity-legendary text-white",
    cardClassName:
      "border-rarity-legendary/30 hover:border-rarity-legendary/60 shadow-[0_12px_40px_rgba(0,0,0,.35)]",
  },
};

export function CaseCard({
  id,
  name,
  price,
  image,
  rarity,
  className,
  onOpen,
}: CaseCardProps) {
  const cfg = caseConfig[rarity];

  return (
    <Card
      className={cn(
        // рамка и общий «свет»
        "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
        "bg-gradient-to-b from-white/5 to-transparent backdrop-blur",
        "hover:scale-[1.02] active:scale-[0.99]",
        cfg.cardClassName,
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold tracking-tight line-clamp-1">
            {name}
          </CardTitle>

          <Badge
            className={cn(
              "px-2 py-0.5 text-[11px] leading-none",
              "rounded-full shadow-sm",
              cfg.badgeClassName
            )}
          >
            {rarityLabel[rarity]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Превью кейса */}
        <div className="relative overflow-hidden rounded-xl bg-muted/20">
          <img
            src={image}
            alt={name}
            className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-[1.06] sm:h-36"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <Gift
            className="absolute left-3 top-3 h-5 w-5 text-white drop-shadow"
            aria-hidden="true"
          />
        </div>

        {/* Цена и CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{price}</span>
          </div>

          <Button
            aria-label={`Открыть кейс ${name}`}
            variant={cfg.variant}
            size="sm"
            onClick={onOpen}
            className="px-6"
          >
            Открыть
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
