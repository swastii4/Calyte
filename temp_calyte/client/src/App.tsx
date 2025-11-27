import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Profile from "@/pages/profile";
import Assessment from "@/pages/assessment";
import Meditation from "@/pages/meditation";
import Goals from "@/pages/goals";
import Chat from "@/pages/chat";
import Sessions from "@/pages/sessions";
import Circles from "@/pages/circles";
import Streaks from "@/pages/streaks";
import Playlist from "@/pages/playlist";
import Games from "@/pages/games";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/meditation" component={Meditation} />
      <Route path="/goals" component={Goals} />
      <Route path="/chat" component={Chat} />
      <Route path="/sessions" component={Sessions} />
      <Route path="/circles" component={Circles} />
      <Route path="/streaks" component={Streaks} />
      <Route path="/playlist" component={Playlist} />
      <Route path="/games" component={Games} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Router />
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
