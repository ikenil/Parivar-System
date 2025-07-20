import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { dashboardStats, recentActivities } from "@/data/mockData";
import { 
  Users, 
  Calendar, 
  GraduationCap, 
  Heart, 
  UserPlus, 
  CalendarPlus, 
  Bell, 
  Upload,
  Images,
  Trophy
} from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user-plus":
        return UserPlus;
      case "images":
        return Images;
      case "trophy":
        return Trophy;
      default:
        return Bell;
    }
  };

  const getActivityColor = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-primary/10 text-primary";
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{t("Total Members")}</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalMembers.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{t("Upcoming Events")}</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{t("Students")}</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{t("Total Donations")}</p>
                <p className="text-2xl font-semibold text-gray-900">₹{dashboardStats.totalDonations}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{t("Recent Activity")}</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.color)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{t("Quick Actions")}</h3>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:border-primary/30 hover:bg-primary/5"
              >
                <UserPlus className="h-6 w-6 text-primary mb-2" />
                <span className="text-sm font-medium text-gray-700">{t("Add Member")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:border-secondary/30 hover:bg-secondary/5"
              >
                <CalendarPlus className="h-6 w-6 text-secondary mb-2" />
                <span className="text-sm font-medium text-gray-700">{t("Create Event")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:border-accent/30 hover:bg-accent/5"
              >
                <Bell className="h-6 w-6 text-accent mb-2" />
                <span className="text-sm font-medium text-gray-700">{t("Send Notice")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:border-purple-300 hover:bg-purple-50"
              >
                <Upload className="h-6 w-6 text-purple-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">{t("Upload Photos")}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
