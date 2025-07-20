import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { mockStudents, mockMembers } from "@/data/mockData";
import { Search, Edit, Trophy, Award, Medal, Star, GraduationCap } from "lucide-react";

export default function Awards() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAwardType, setSelectedAwardType] = useState("all");

  const awardEligibleStudents = mockStudents.filter(student => student.isAwardEligible);
  
  const filteredStudents = awardEligibleStudents.filter(student => {
    const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const awardMatch = selectedAwardType === "all" || student.awardType === selectedAwardType;
    return nameMatch && awardMatch;
  });

  const getMemberName = (memberId: number | null) => {
    if (!memberId) return "Unknown";
    const member = mockMembers.find(m => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
  };

  const getAwardIcon = (awardType: string | null) => {
    switch (awardType?.toLowerCase()) {
      case "academic excellence":
        return Trophy;
      case "professional achievement":
        return Award;
      case "research excellence":
        return Medal;
      default:
        return Star;
    }
  };

  const getAwardColor = (awardType: string | null) => {
    switch (awardType?.toLowerCase()) {
      case "academic excellence":
        return "bg-primary/10 text-primary border-primary/20";
      case "professional achievement":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "research excellence":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  const getPerformanceColor = (percentage: string) => {
    const score = parseFloat(percentage);
    if (score >= 95) return "text-green-600 font-semibold";
    if (score >= 90) return "text-blue-600 font-semibold";
    if (score >= 85) return "text-purple-600 font-semibold";
    return "text-gray-900 font-medium";
  };

  const uniqueAwardTypes = Array.from(new Set(awardEligibleStudents.map(s => s.awardType).filter(Boolean)));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Awards</p>
                <p className="text-2xl font-semibold text-gray-900">{awardEligibleStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Academic</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {awardEligibleStudents.filter(s => s.awardType === "Academic Excellence").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Professional</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {awardEligibleStudents.filter(s => s.awardType === "Professional Achievement").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Medal className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Research</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {awardEligibleStudents.filter(s => s.awardType === "Research Excellence").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Award Eligible Students</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedAwardType} onValueChange={setSelectedAwardType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Award Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Award Types</SelectItem>
                  {uniqueAwardTypes.map(type => (
                    <SelectItem key={type} value={type!}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Award Type</TableHead>
                  <TableHead>Achievement</TableHead>
                  <TableHead>Family Member</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const AwardIcon = getAwardIcon(student.awardType);
                  return (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <AwardIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">
                              {student.standard} • {student.stream} • {student.year}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={getPerformanceColor(student.percentage)}>
                          {student.percentage}{student.standard.includes("PhD") ? "" : "%"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getAwardColor(student.awardType)}>
                          {student.awardType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900 max-w-xs">
                        <p className="truncate">{student.achievement}</p>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {getMemberName(student.memberId)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No award eligible students found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}