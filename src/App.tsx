import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// ❗️Добавь этот импорт (создавали раньше)
import WalletChip from "@/components/WalletChip";

// Если у тебя есть Zustand-стор, можно читать баланс отсюда.
// Подстрой импорт под твой экспорт: default или именованный.
import { useGameStore } from "@/store/gameStore"; // если иначе — поменяй импорт

const queryClient = new QueryClient();

function Layout() {
  // Достаём баланс из стора; подстрахуемся на случай других названий поля
  let balance = 0;
  try {
    // @ts-ignore — на старте хватит, позже типизируешь стор
    balance = useGameStore((s: any) => s.balance ?? s.tokens ?? s.coins ?? 0);
  } catch {
    balance = 0;
  }

  const onBuy = () => {
    // TODO: открой модал/таб «магазин», либо создай инвойс Stars
    // временно бросим событие — перехвати его в нужном месте
    window.dispatchEvent(new CustomEvent("open-token-shop"));
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Шапка */}
      <div className="sticky top-0 z-50 bg-[#0b1020]/60 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-5xl px-3 py-2 flex items-center justify-between">
          <div className="text-base font-semibold tracking-tight">Gift Roulette</div>
          <WalletChip balance={balance} onBuy={onBuy} />
        </div>
      </div>

      {/* Контент страниц */}
      <main className="mx-auto max-w-5xl px-3 py-4">
        <Outlet />
      </main>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Layout с шапкой поверх всех страниц */}
          <Route element={<Layout />}>
            <Route index element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
