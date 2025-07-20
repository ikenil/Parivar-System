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
    <div className="space-y-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Welcome Header */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to Dashboard</h1>
        <p className="text-gray-600">Overview of your family management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("Total Members")}</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">↗ +12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("Upcoming Events")}</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.upcomingEvents}</p>
                <p className="text-xs text-purple-600 mt-1">3 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("Students")}</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalStudents}</p>
                <p className="text-xs text-emerald-600 mt-1">85% active learners</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-rose-50 to-rose-100 hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-rose-600/20 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-rose-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t("Total Donations")}</p>
                <p className="text-3xl font-bold text-gray-900">₹{dashboardStats.totalDonations}</p>
                <p className="text-xs text-rose-600 mt-1">from 156 donors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
            <h3 className="text-xl font-semibold text-gray-900">{t("Recent Activity")}</h3>
          </div>
          <CardContent className="p-6">
            <div className="space-y-5">
              {recentActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.color)} shadow-sm`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-purple-50">
            <h3 className="text-xl font-semibold text-gray-900">{t("Quick Actions")}</h3>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <UserPlus className="h-8 w-8 text-primary mb-3" />
                <span className="text-sm font-semibold text-gray-700">{t("Add Member")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <CalendarPlus className="h-8 w-8 text-purple-600 mb-3" />
                <span className="text-sm font-semibold text-gray-700">{t("Create Event")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Bell className="h-8 w-8 text-emerald-600 mb-3" />
                <span className="text-sm font-semibold text-gray-700">{t("Send Notice")}</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-6 h-auto border-2 border-rose-200 hover:border-rose-500 hover:bg-rose-50 transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Upload className="h-8 w-8 text-rose-600 mb-3" />
                <span className="text-sm font-medium text-gray-700">{t("Upload Photos")}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
