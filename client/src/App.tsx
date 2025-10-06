import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import AgencyDashboard from "@/pages/AgencyDashboard";
import FacilityDashboard from "@/pages/FacilityDashboard";
import FacilityOnboarding from "@/pages/FacilityOnboarding";
import PatientPortal from "@/pages/PatientPortal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/agency" component={AgencyDashboard} />
      <Route path="/facility" component={FacilityDashboard} />
      <Route path="/facility/onboarding" component={FacilityOnboarding} />
      <Route path="/patient" component={PatientPortal} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
