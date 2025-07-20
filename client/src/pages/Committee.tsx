import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { mockCommitteeMembers, mockMembers } from "@/data/mockData";
import { Search, Plus, Edit, Eye, Trash2, Users } from "lucide-react";

export default function Committee() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCommitteeMembers = mockCommitteeMembers.filter(cm => {
    const member = mockMembers.find(m => m.id === cm.memberId);
    if (!member) return false;
    return member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           cm.position.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getMemberName = (memberId: number) => {
    const member = mockMembers.find(m => m.id === memberId);
    return member ? `${member.firstName} ${member.lastName}` : "Unknown Member";
  };

  const getStatusColor = (isActive: boolean | null) => {
    return isActive ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDepartmentColor = (department: string) => {
    switch (department.toLowerCase()) {
      case "executive":
        return "bg-primary/10 text-primary";
      case "finance":
        return "bg-accent/10 text-accent";
      case "events":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Committee Members Management</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search committee members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Committee Member</span>
              </Button>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommitteeMembers.map((committeeMember) => (
                  <TableRow key={committeeMember.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {getMemberName(committeeMember.memberId!)}
                          </div>
                          <div className="text-sm text-gray-500">
                            {committeeMember.responsibilities}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-900">
                      {committeeMember.position}
                    </TableCell>
                    <TableCell>
                      <Badge className={getDepartmentColor(committeeMember.department)}>
                        {committeeMember.department}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {committeeMember.startDate} - {committeeMember.endDate || "Present"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(committeeMember.isActive)}>
                        {committeeMember.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}