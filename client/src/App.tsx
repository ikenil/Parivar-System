import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import { Layout } from "@/components/Layout";
import { Login } from "@/components/Login";
import Dashboard from "@/pages/Dashboard";
import Members from "@/pages/Members";
import Gallery from "@/pages/Gallery";
import Students from "@/pages/Students";
import Registration from "@/pages/Registration";
import Notifications from "@/pages/Notifications";
import Committee from "@/pages/Committee";
import Donors from "@/pages/Donors";
import Awards from "@/pages/Awards";
import Abroad from "@/pages/Abroad";
import Pending from "@/pages/Pending";
import Admins from "@/pages/Admins";
import NotFound from "@/pages/not-found";

function AuthenticatedApp() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/members" component={Members} />
        <Route path="/committee" component={Committee} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/students" component={Students} />
        <Route path="/donors" component={Donors} />
        <Route path="/awards" component={Awards} />
        <Route path="/abroad" component={Abroad} />
        <Route path="/pending" component={Pending} />
        <Route path="/admins" component={Admins} />
        <Route path="/registration" component={Registration} />
        <Route path="/notifications" component={Notifications} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  const { user } = useAppContext();
  
  if (!user) {
    return <Login />;
  }
  
  return <AuthenticatedApp />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
