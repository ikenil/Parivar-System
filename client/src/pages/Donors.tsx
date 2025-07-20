import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { mockDonors } from "@/data/mockData";
import { Search, Plus, Heart, Calendar, CreditCard, User } from "lucide-react";

export default function Donors() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    amount: "",
    purpose: "",
    donationDate: "",
    paymentMethod: "",
  });

  const filteredDonors = mockDonors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success",
      description: "Donor added successfully!",
    });
    setFormData({
      name: "",
      phone: "",
      email: "",
      amount: "",
      purpose: "",
      donationDate: "",
      paymentMethod: "",
    });
    setShowModal(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPaymentIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "upi":
        return "📱";
      case "bank transfer":
        return "🏦";
      case "cash":
        return "💵";
      default:
        return "💳";
    }
  };

  const totalDonations = filteredDonors.reduce((sum, donor) => sum + donor.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Donors</p>
                <p className="text-2xl font-semibold text-gray-900">{filteredDonors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-accent" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold text-gray-900">₹{totalDonations.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">₹50,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <h3 className="text-lg font-medium text-gray-900">Donors Management</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search donors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Donor</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Donor</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter donor name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Donation Amount (₹) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="purpose">Purpose *</Label>
                      <Select value={formData.purpose} onValueChange={(value) => handleInputChange("purpose", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="family-gathering">Family Gathering</SelectItem>
                          <SelectItem value="student-awards">Student Awards</SelectItem>
                          <SelectItem value="medical-fund">Medical Emergency Fund</SelectItem>
                          <SelectItem value="education-support">Education Support</SelectItem>
                          <SelectItem value="community-service">Community Service</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="donationDate">Donation Date *</Label>
                      <Input
                        id="donationDate"
                        type="date"
                        value={formData.donationDate}
                        onChange={(e) => handleInputChange("donationDate", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="paymentMethod">Payment Method *</Label>
                      <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UPI">UPI</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Cheque">Cheque</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Add Donor
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.map((donor) => (
                  <TableRow key={donor.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                          <div className="text-sm text-gray-500">{donor.email || "No email"}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {donor.phone}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-green-600">
                      ₹{donor.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {donor.purpose}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {new Date(donor.donationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <span>{getPaymentIcon(donor.paymentMethod)}</span>
                        <span>{donor.paymentMethod}</span>
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