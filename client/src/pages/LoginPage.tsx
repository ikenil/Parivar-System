import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { mockUsers } from "@/data/mockData";
import { useLocation } from "wouter";
import { Loader2, Phone, Lock, Eye, EyeOff, Users, LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const [, setLocation] = useLocation();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Demo credentials for testing
  const demoCredentials = [
    { role: "Super Admin", phone: "+91 98765 43210", password: "123456" },
    { role: "Admin", phone: "+91 98765 43211", password: "123456" },
    { role: "Member", phone: "+91 98765 43212", password: "123456" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logo/Title */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Users className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Bhikadiya Parivar</h1>
              <p className="text-lg text-gray-600 font-medium">Family Management System</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border border-gray-200 bg-white max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold text-gray-800">
              Welcome Back
            </CardTitle>
            <p className="text-center text-gray-600 mt-2">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="phone"
                    type="tel"
                    value={loginData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="pl-10 h-12 border-gray-200 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter password"
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-primary focus:ring-primary"
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
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white" 
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
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="shadow-md border border-gray-200 bg-white max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">Demo Credentials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{cred.role}</p>
                    <p className="text-sm text-gray-600">{cred.phone}</p>
                    <p className="text-sm text-gray-600">Password: {cred.password}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
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

        {/* Link to Registration */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Don't have an account?</p>
          <Button 
            variant="outline" 
            onClick={() => setLocation("/register")}
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Register as New Member
          </Button>
        </div>
      </div>
    </div>
  );
}