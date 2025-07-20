import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  BarChart3, 
  Users, 
  Images, 
  GraduationCap, 
  Bell, 
  UserPlus,
  Settings,
  Heart,
  Trophy,
  Globe,
  Clock,
  Shield
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  path: string;
}

export function Navigation() {
  const { userRole } = useAppContext();
  const { t } = useTranslation();
  const [location] = useLocation();

  const roleNavigations = {
    "super-admin": [
      { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/" },
      { id: "members", label: "Members", icon: Users, path: "/members" },
      { id: "committee", label: "Committee", icon: Settings, path: "/committee" },
      { id: "gallery", label: "Gallery", icon: Images, path: "/gallery" },
      { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
      { id: "donors", label: "Donors", icon: Heart, path: "/donors" },
      { id: "awards", label: "Awards", icon: Trophy, path: "/awards" },
      { id: "abroad", label: "Abroad", icon: Globe, path: "/abroad" },
      { id: "pending", label: "Pending", icon: Clock, path: "/pending" },
      { id: "admins", label: "Admins", icon: Shield, path: "/admins" },
      { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" },
    ],
    "admin": [
      { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/" },
      { id: "members", label: "Members", icon: Users, path: "/members" },
      { id: "gallery", label: "Gallery", icon: Images, path: "/gallery" },
      { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
      { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" },
    ],
    "member": [
      { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/" },
      { id: "registration", label: "Registration", icon: UserPlus, path: "/registration" },
      { id: "gallery", label: "Gallery", icon: Images, path: "/gallery" },
      { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
      { id: "notifications", label: "Notices", icon: Bell, path: "/notifications" },
    ],
  };

  const navigationItems = roleNavigations[userRole] || [];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-gradient-to-r from-primary/10 to-purple-600/10 text-primary border-2 border-primary/20 shadow-md"
                      : "text-gray-600 hover:text-primary hover:bg-gray-100 border-2 border-transparent"
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"}`} />
                  <span className="font-semibold">{t(item.label)}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
