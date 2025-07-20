import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { mockStudents } from "@/data/mockData";
import { Upload, ArrowRight, GraduationCap, Trophy, Medal, Star, Award, FileText } from "lucide-react";

export default function Students() {
  const { t } = useTranslation();
  const [selectedStandard, setSelectedStandard] = useState("all");

  const filteredStudents = mockStudents.filter(student => 
    selectedStandard === "all" || student.standard === selectedStandard
  );

  const getStudentIcon = (index: number) => {
    const icons = [GraduationCap, Trophy, Medal, Star, Award, FileText];
    return icons[index % icons.length];
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      "from-primary-50 to-primary-100 border-primary-200",
      "from-secondary-50 to-secondary-100 border-secondary-200",
      "from-accent-50 to-accent-100 border-accent-200",
      "from-purple-50 to-purple-100 border-purple-200",
      "from-green-50 to-green-100 border-green-200",
      "from-pink-50 to-pink-100 border-pink-200",
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index: number) => {
    const colors = [
      "bg-primary text-primary-foreground",
      "bg-secondary text-secondary-foreground", 
      "bg-accent text-accent-foreground",
      "bg-purple-600 text-white",
      "bg-green-600 text-white",
      "bg-pink-600 text-white",
    ];
    return colors[index % colors.length];
  };

  const getPercentageColor = (index: number) => {
    const colors = [
      "text-primary",
      "text-secondary",
      "text-accent",
      "text-purple-600",
      "text-green-600", 
      "text-pink-600",
    ];
    return colors[index % colors.length];
  };

  const uniqueStandards = Array.from(new Set(mockStudents.map(student => student.standard)));

  return (
    <div className="space-y-6">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">{t("Student Achievements")}</h3>
            <div className="flex items-center space-x-3">
              <Select value={selectedStandard} onValueChange={setSelectedStandard}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t("All Standards")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("All Standards")}</SelectItem>
                  {uniqueStandards.map(standard => (
                    <SelectItem key={standard} value={standard}>{standard}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>{t("Upload Marksheet")}</span>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => {
              const Icon = getStudentIcon(index);
              return (
                <div key={student.id} className={`bg-gradient-to-br ${getGradientColor(index)} rounded-lg p-6 border`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${getIconColor(index)} rounded-full flex items-center justify-center`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className={`${getIconColor(index)} text-xs font-medium`}>
                      {student.standard}
                    </Badge>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{student.name}</h4>
                  <p className={`text-3xl font-bold ${getPercentageColor(index)} mb-1`}>
                    {student.percentage}{student.standard.includes("PhD") ? "" : "%"}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {student.stream} • {student.year}
                  </p>
                  <p className="text-sm text-gray-700 mb-4">
                    {student.achievement}
                  </p>
                  <Button variant="ghost" className={`p-0 h-auto ${getPercentageColor(index)} hover:opacity-70`}>
                    {t("View Details")} <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
