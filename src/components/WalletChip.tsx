import { Star } from "lucide-react";

export default function WalletChip({balance,onBuy}:{balance:number;onBuy:()=>void}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 backdrop-blur">
      <Star className="h-4 w-4" />
      <span className="font-medium tracking-tight">{balance}</span>
      <button
        onClick={onBuy}
        className="ml-2 rounded-full px-3 py-1 text-sm font-semibold
                   bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500
                   hover:brightness-110 active:scale-95 transition">
        Купить
      </button>
    </div>
  );
}
