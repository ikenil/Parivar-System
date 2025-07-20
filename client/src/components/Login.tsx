import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { mockUsers } from "@/data/mockData";
import { Loader2, Phone, Lock, Eye, EyeOff, UserPlus, Users, LogIn } from "lucide-react";

export function Login() {
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const [registrationData, setRegistrationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    familyBranch: "",
    address: "",
    city: "",
    state: "",
    occupation: "",
    businessCategory: "",
    companyName: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in mock data
      const user = mockUsers.find(
        u => u.phone === loginData.phone && u.password === loginData.password && u.isActive
      );

      if (user) {
        setUser(user);
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.firstName}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid phone number or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration Submitted",
        description: "Your registration has been submitted successfully. We'll review and get back to you soon.",
      });
      
      // Reset form
      setRegistrationData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        fatherName: "",
        familyBranch: "",
        address: "",
        city: "",
        state: "",
        occupation: "",
        businessCategory: "",
        companyName: "",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistrationInputChange = (field: string, value: string) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const demoCredentials = [
    { role: "Super Admin", phone: "+91 98765 43210", password: "123456" },
    { role: "Admin", phone: "+91 98765 43211", password: "123456" },
    { role: "Member", phone: "+91 98765 43212", password: "123456" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo/Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Users className="h-12 w-12 text-primary" />
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Bhikadiya Parivar
              </h1>
              <p className="text-lg text-gray-600 font-medium">Family Management System</p>
            </div>
          </div>
        </div>

        {/* Main Card with Tabs */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center space-x-2">
                  <UserPlus className="h-4 w-4" />
                  <span>Member Registration</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0">
                <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                  Welcome Back
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">Sign in to your account</p>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <CardTitle className="text-center text-2xl font-semibold text-gray-800">
                  Join Our Family
                </CardTitle>
                <p className="text-center text-gray-600 mt-2">Register as a new member</p>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <Label htmlFor="login-phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="login-phone"
                        type="tel"
                        value={loginData.phone}
                        onChange={(e) => handleLoginInputChange("phone", e.target.value)}
                        placeholder="Enter your phone number"
                        className="pl-12 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => handleLoginInputChange("password", e.target.value)}
                        placeholder="Enter your password"
                        className="pl-12 pr-12 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-5 w-5" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Registration Form */}
              <TabsContent value="register">
                <form onSubmit={handleRegistration} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</Label>
                      <Input
                        id="firstName"
                        value={registrationData.firstName}
                        onChange={(e) => handleRegistrationInputChange("firstName", e.target.value)}
                        placeholder="First Name"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</Label>
                      <Input
                        id="lastName"
                        value={registrationData.lastName}
                        onChange={(e) => handleRegistrationInputChange("lastName", e.target.value)}
                        placeholder="Last Name"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={registrationData.email}
                        onChange={(e) => handleRegistrationInputChange("email", e.target.value)}
                        placeholder="Email Address"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="reg-phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                      <Input
                        id="reg-phone"
                        type="tel"
                        value={registrationData.phone}
                        onChange={(e) => handleRegistrationInputChange("phone", e.target.value)}
                        placeholder="Phone Number"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={registrationData.dateOfBirth}
                        onChange={(e) => handleRegistrationInputChange("dateOfBirth", e.target.value)}
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</Label>
                      <Select value={registrationData.gender} onValueChange={(value) => handleRegistrationInputChange("gender", value)}>
                        <SelectTrigger className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">Father's Name</Label>
                    <Input
                      id="fatherName"
                      value={registrationData.fatherName}
                      onChange={(e) => handleRegistrationInputChange("fatherName", e.target.value)}
                      placeholder="Father's Full Name"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="familyBranch" className="text-sm font-medium text-gray-700">Family Branch</Label>
                    <Input
                      id="familyBranch"
                      value={registrationData.familyBranch}
                      onChange={(e) => handleRegistrationInputChange("familyBranch", e.target.value)}
                      placeholder="Family Branch/Group"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
                    <Input
                      id="address"
                      value={registrationData.address}
                      onChange={(e) => handleRegistrationInputChange("address", e.target.value)}
                      placeholder="Complete Address"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">City</Label>
                      <Input
                        id="city"
                        value={registrationData.city}
                        onChange={(e) => handleRegistrationInputChange("city", e.target.value)}
                        placeholder="City"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
                      <Input
                        id="state"
                        value={registrationData.state}
                        onChange={(e) => handleRegistrationInputChange("state", e.target.value)}
                        placeholder="State"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">Occupation</Label>
                    <Input
                      id="occupation"
                      value={registrationData.occupation}
                      onChange={(e) => handleRegistrationInputChange("occupation", e.target.value)}
                      placeholder="Current Occupation"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessCategory" className="text-sm font-medium text-gray-700">Business Category (Optional)</Label>
                      <Input
                        id="businessCategory"
                        value={registrationData.businessCategory}
                        onChange={(e) => handleRegistrationInputChange("businessCategory", e.target.value)}
                        placeholder="e.g., Technology, Healthcare"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        value={registrationData.companyName}
                        onChange={(e) => handleRegistrationInputChange("companyName", e.target.value)}
                        placeholder="Company/Organization Name"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Demo Credentials - Only show on login tab */}
        {activeTab === "login" && (
          <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-gray-800">Demo Credentials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="p-4 bg-white/80 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{cred.role}</p>
                      <p className="text-sm text-gray-600">{cred.phone}</p>
                      <p className="text-sm text-gray-600">Password: {cred.password}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                      onClick={() => {
                        setLoginData({ phone: cred.phone, password: cred.password });
                      }}
                    >
                      Use
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}