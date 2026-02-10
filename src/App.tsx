import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AlternativeA from "./pages/AlternativeA";
import AlternativeB from "./pages/AlternativeB";
import AlternativeC from "./pages/AlternativeC";
import VariantB1 from "./pages/VariantB1";
import VariantB2 from "./pages/VariantB2";
import VariantB3 from "./pages/VariantB3";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/a" element={<AlternativeA />} />
          <Route path="/b" element={<AlternativeB />} />
          <Route path="/c" element={<AlternativeC />} />
          <Route path="/b1" element={<VariantB1 />} />
          <Route path="/b2" element={<VariantB2 />} />
          <Route path="/b3" element={<VariantB3 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
