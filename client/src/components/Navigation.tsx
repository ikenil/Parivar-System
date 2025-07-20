import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  BarChart3, 
  Users, 
  Images, 
  GraduationCap, 
  Bell, 
  UserPlus 
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
      { id: "gallery", label: "Gallery", icon: Images, path: "/gallery" },
      { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
      { id: "notifications", label: "Notifications", icon: Bell, path: "/notifications" },
    ],
    "admin": [
      { id: "dashboard", label: "Dashboard", icon: BarChart3, path: "/" },
      { id: "members", label: "Members", icon: Users, path: "/members" },
      { id: "gallery", label: "Gallery", icon: Images, path: "/gallery" },
      { id: "students", label: "Students", icon: GraduationCap, path: "/students" },
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
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            
            return (
              <Link key={item.id} href={item.path}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:border-primary/40 hover:text-primary/60"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t(item.label)}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
