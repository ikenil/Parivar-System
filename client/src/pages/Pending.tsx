import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { mockMembers } from "@/data/mockData";
import { Search, Check, X, Eye, Clock, User } from "lucide-react";

export default function Pending() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const pendingMembers = mockMembers.filter(member => member.status === "pending");
  
  const filteredMembers = pendingMembers.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (memberId: number, memberName: string) => {
    toast({
      title: "Member Approved",
      description: `${memberName} has been approved successfully!`,
    });
  };

  const handleReject = (memberId: number, memberName: string) => {
    toast({
      title: "Member Rejected",
      description: `${memberName}'s application has been rejected.`,
      variant: "destructive",
    });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-yellow-100 text-yellow-600",
      "bg-orange-100 text-orange-600",
      "bg-amber-100 text-amber-600",
      "bg-red-100 text-red-600",
      "bg-pink-100 text-pink-600",
    ];
    return colors[index % colors.length];
  };

  const getDaysAgo = (createdAt: Date | null) => {
    if (!createdAt) return "Unknown";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} month(s) ago`;
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-semibold text-gray-900">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Urgent (&gt;7 days)</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {pendingMembers.filter(m => {
                    if (!m.createdAt) return false;
                    const diffDays = Math.ceil(Math.abs(new Date().getTime() - m.createdAt.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays > 7;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Processed Today</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Pending Member Requests</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search pending members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member, index) => {
                  const daysAgo = member.createdAt ? Math.ceil(Math.abs(new Date().getTime() - member.createdAt.getTime()) / (1000 * 60 * 60 * 24)) : 0;
                  const isUrgent = daysAgo > 7;
                  
                  return (
                    <TableRow key={member.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(index)}`}>
                            <span className="font-medium">{getInitials(member.firstName, member.lastName)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div>
                            <div className="text-sm text-gray-500">
                              {member.fatherName} • {member.familyBranch}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          <div>{member.email}</div>
                          <div className="text-gray-500">{member.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-900">
                          <div className="font-medium">{member.occupation}</div>
                          <div className="text-gray-500">{member.companyName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {getDaysAgo(member.createdAt)}
                      </TableCell>
                      <TableCell>
                        <Badge className={isUrgent ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}>
                          {isUrgent ? "Urgent" : "Normal"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleApprove(member.id, `${member.firstName} ${member.lastName}`)}
                          >
                            <Check className="h-4 w-4 text-green-600" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleReject(member.id, `${member.firstName} ${member.lastName}`)}
                          >
                            <X className="h-4 w-4 text-red-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending member requests</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}