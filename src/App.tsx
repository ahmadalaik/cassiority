import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes/router";
import { Toaster } from "sonner";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton position="top-right" />
        <Router />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
