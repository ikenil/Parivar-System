import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from "@/hooks/useTranslation";
import { mockMembers } from "@/data/mockData";
import { Search, Plus, Trash2, Globe, User, MapPin } from "lucide-react";

export default function Abroad() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");

  const abroadMembers = mockMembers.filter(member => member.isAbroad);
  
  const filteredMembers = abroadMembers.filter(member =>
    member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.abroadCountry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCountryFlag = (country: string | null) => {
    switch (country?.toLowerCase()) {
      case "usa":
        return "🇺🇸";
      case "canada":
        return "🇨🇦";
      case "uk":
        return "🇬🇧";
      case "australia":
        return "🇦🇺";
      case "germany":
        return "🇩🇪";
      default:
        return "🌍";
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-purple-100 text-purple-600",
      "bg-green-100 text-green-600",
      "bg-blue-100 text-blue-600",
      "bg-pink-100 text-pink-600",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Abroad</p>
                <p className="text-2xl font-semibold text-gray-900">{abroadMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Countries</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {new Set(abroadMembers.map(m => m.abroadCountry)).size}
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
                  <User className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Status</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {abroadMembers.filter(m => m.status === "active").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Abroad Members Management</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search abroad members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Abroad Member</span>
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
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Occupation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member, index) => (
                  <TableRow key={member.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(index)}`}>
                          <span className="font-medium">{getInitials(member.firstName, member.lastName)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.firstName} {member.lastName}</div>
                          <div className="text-sm text-gray-500">Bhikadiya Family - {member.familyBranch}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getCountryFlag(member.abroadCountry)}</span>
                        <span className="text-sm font-medium text-gray-900">{member.abroadCountry}</span>
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
                    <TableCell>
                      <Badge className={member.status === "active" ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-gray-100 text-gray-800 border-gray-200"}>
                        {member.status === "active" ? "Active" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredMembers.length === 0 && (
            <div className="text-center py-8">
              <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No abroad members found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}