import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppContext } from "@/contexts/AppContext";
import { RoleBasedWrapper } from "@/components/RoleBasedWrapper";
import { CreateNotificationModal } from "@/components/modals/CreateNotificationModal";
import { mockNotifications } from "@/data/mockData";
import { Plus, Megaphone, GraduationCap, Heart, Globe, Calendar, Users, Info } from "lucide-react";

export default function Notifications() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "event":
        return Megaphone;
      case "achievement":
        return GraduationCap;
      case "donation":
        return Heart;
      case "update":
        return Globe;
      default:
        return Info;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "event":
        return "bg-primary/10 text-primary";
      case "achievement":
        return "bg-secondary/10 text-secondary";
      case "donation":
        return "bg-accent/10 text-accent";
      case "update":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "event":
        return "bg-primary/10 text-primary border-primary/20";
      case "achievement":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "donation":
        return "bg-accent/10 text-accent border-accent/20";
      case "update":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 21) return "2 weeks ago";
    return "3 weeks ago";
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">{t("Notifications & Notices")}</h3>
            <RoleBasedWrapper allowedRoles={["super-admin"]}>
              <Button onClick={() => setShowModal(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{t("Create Notice")}</span>
              </Button>
            </RoleBasedWrapper>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {mockNotifications.map((notification) => {
              const Icon = getCategoryIcon(notification.category);
              return (
                <div key={notification.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${getCategoryColor(notification.category)} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium text-gray-900">{notification.title}</h4>
                        <span className="text-sm text-gray-500">{formatDate(notification.createdAt!)}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{notification.description}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <Badge className={getBadgeColor(notification.category)}>
                          {notification.category}
                        </Badge>
                        {notification.targetDate && (
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(notification.targetDate).toLocaleDateString()}
                          </span>
                        )}
                        <span className="text-sm text-gray-500 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          All Members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <CreateNotificationModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
}
