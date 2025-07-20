import { Button } from "@/components/ui/button";
import { Bell, Users, User, Globe, LogOut } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useTranslation } from "@/hooks/useTranslation";

export function Header() {
  const { user, userRole, language, setLanguage, logout } = useAppContext();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "gu" : "en");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super-admin":
        return "bg-red-100 text-red-800";
      case "admin":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "super-admin":
        return "Super Admin";
      case "admin":
        return "Admin";
      default:
        return "Member";
    }
  };

  return (
    <>
      {/* User Info & Language Toggle */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">Welcome, {user?.firstName} {user?.lastName}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(userRole)}`}>
                  {getRoleDisplayName(userRole)}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="h-8 px-3 text-sm"
                >
                  {language === "en" ? "EN | ગુ" : "ગુ | EN"}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="h-8 px-3 text-sm flex items-center space-x-1"
              >
                <LogOut className="h-3 w-3" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{t("Bhikadiya Parivar")}</h1>
                <p className="text-sm text-gray-500">{t("Family Management System")}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5 text-gray-400" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">{t("Admin User")}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
