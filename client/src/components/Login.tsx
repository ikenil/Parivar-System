import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { mockUsers } from "@/data/mockData";
import { Loader2, Phone, Lock, Eye, EyeOff, UserPlus, Users, LogIn, ChevronLeft, ChevronRight, User, Camera, Building, Plus, Trash2, CheckCircle } from "lucide-react";

export function Login() {
  const { toast } = useToast();
  const { setUser } = useAppContext();
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  });
  const [registrationData, setRegistrationData] = useState({
    // Personal Details (Step 1)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    maritalStatus: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    familyBranch: "",
    
    // Family Members (Step 2)
    familyMembers: [],
    
    // Business Details (Step 3)
    occupation: "",
    employmentType: "", // business_owner, employee
    companyName: "",
    designation: "",
    businessCategory: "",
    businessDescription: "",
    businessPhoto: null,
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
  });

  const [registrationStep, setRegistrationStep] = useState(1);
  const [familyMemberForm, setFamilyMemberForm] = useState({
    name: "",
    relation: "",
    age: "",
    occupation: "",
    phone: "",
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
        motherName: "",
        spouseName: "",
        maritalStatus: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        familyBranch: "",
        familyMembers: [],
        occupation: "",
        employmentType: "",
        companyName: "",
        designation: "",
        businessCategory: "",
        businessDescription: "",
        businessPhoto: null,
        businessAddress: "",
        businessCity: "",
        businessState: "",
        businessPincode: "",
      });
      setRegistrationStep(1);
      
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

  const handleFileUpload = (field: string, file: File | null) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleFamilyMemberInputChange = (field: string, value: string) => {
    setFamilyMemberForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFamilyMember = () => {
    if (familyMemberForm.name && familyMemberForm.relation) {
      setRegistrationData(prev => ({
        ...prev,
        familyMembers: [...prev.familyMembers, { ...familyMemberForm, id: Date.now() }]
      }));
      setFamilyMemberForm({
        name: "",
        relation: "",
        age: "",
        occupation: "",
        phone: "",
      });
    }
  };

  const removeFamilyMember = (id: number) => {
    setRegistrationData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(member => member.id !== id)
    }));
  };

  const nextStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1);
    }
  };

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1);
    }
  };

  const isStep1Valid = () => {
    return registrationData.firstName && 
           registrationData.lastName && 
           registrationData.email && 
           registrationData.phone && 
           registrationData.dateOfBirth &&
           registrationData.gender &&
           registrationData.fatherName &&
           registrationData.address &&
           registrationData.city &&
           registrationData.state;
  };

  const getProgressPercentage = () => {
    return ((registrationStep - 1) / 2) * 100;
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

              {/* Registration Form with 3 Steps */}
              <TabsContent value="register">
                <div className="space-y-6">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span>Step {registrationStep} of 3</span>
                      <span>{Math.round(getProgressPercentage())}% Complete</span>
                    </div>
                    <Progress value={getProgressPercentage()} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span className={registrationStep === 1 ? "text-primary font-medium" : ""}>Personal Details</span>
                      <span className={registrationStep === 2 ? "text-primary font-medium" : ""}>Family Members</span>
                      <span className={registrationStep === 3 ? "text-primary font-medium" : ""}>Business Details</span>
                    </div>
                  </div>

                  <form onSubmit={handleRegistration}>
                    {/* Step 1: Personal Details */}
                    {registrationStep === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <User className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
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
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
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
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email *</Label>
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
                            <Label htmlFor="reg-phone" className="text-sm font-medium text-gray-700">Phone Number *</Label>
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
                            <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">Date of Birth *</Label>
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
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender *</Label>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="fatherName" className="text-sm font-medium text-gray-700">Father's Name *</Label>
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
                            <Label htmlFor="motherName" className="text-sm font-medium text-gray-700">Mother's Name</Label>
                            <Input
                              id="motherName"
                              value={registrationData.motherName}
                              onChange={(e) => handleRegistrationInputChange("motherName", e.target.value)}
                              placeholder="Mother's Full Name"
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">Marital Status</Label>
                            <Select value={registrationData.maritalStatus} onValueChange={(value) => handleRegistrationInputChange("maritalStatus", value)}>
                              <SelectTrigger className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary">
                                <SelectValue placeholder="Select Marital Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="single">Single</SelectItem>
                                <SelectItem value="married">Married</SelectItem>
                                <SelectItem value="divorced">Divorced</SelectItem>
                                <SelectItem value="widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="spouseName" className="text-sm font-medium text-gray-700">Spouse Name</Label>
                            <Input
                              id="spouseName"
                              value={registrationData.spouseName}
                              onChange={(e) => handleRegistrationInputChange("spouseName", e.target.value)}
                              placeholder="Spouse Full Name"
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="familyBranch" className="text-sm font-medium text-gray-700">Family Branch *</Label>
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
                          <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
                          <Textarea
                            id="address"
                            value={registrationData.address}
                            onChange={(e) => handleRegistrationInputChange("address", e.target.value)}
                            placeholder="Complete Address"
                            className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
                            rows={3}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
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
                            <Label htmlFor="state" className="text-sm font-medium text-gray-700">State *</Label>
                            <Input
                              id="state"
                              value={registrationData.state}
                              onChange={(e) => handleRegistrationInputChange("state", e.target.value)}
                              placeholder="State"
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</Label>
                            <Input
                              id="pincode"
                              value={registrationData.pincode}
                              onChange={(e) => handleRegistrationInputChange("pincode", e.target.value)}
                              placeholder="Pincode"
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-4">
                          <Button 
                            type="button" 
                            onClick={nextStep}
                            disabled={!isStep1Valid()}
                            className="px-8 py-2 bg-primary hover:bg-primary/90"
                          >
                            Next Step
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Family Members */}
                    {registrationStep === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Users className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold text-gray-900">Family Members</h3>
                        </div>

                        {/* Add Family Member Form */}
                        <Card className="p-4 bg-gray-50 border-dashed border-2 border-gray-300">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Plus className="h-4 w-4 text-gray-600" />
                              <h4 className="font-medium text-gray-800">Add Family Member</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Name</Label>
                                <Input
                                  value={familyMemberForm.name}
                                  onChange={(e) => handleFamilyMemberInputChange("name", e.target.value)}
                                  placeholder="Full Name"
                                  className="mt-1 h-9 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Relation</Label>
                                <Select value={familyMemberForm.relation} onValueChange={(value) => handleFamilyMemberInputChange("relation", value)}>
                                  <SelectTrigger className="mt-1 h-9 text-sm">
                                    <SelectValue placeholder="Select Relation" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="spouse">Spouse</SelectItem>
                                    <SelectItem value="son">Son</SelectItem>
                                    <SelectItem value="daughter">Daughter</SelectItem>
                                    <SelectItem value="father">Father</SelectItem>
                                    <SelectItem value="mother">Mother</SelectItem>
                                    <SelectItem value="brother">Brother</SelectItem>
                                    <SelectItem value="sister">Sister</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Age</Label>
                                <Input
                                  type="number"
                                  value={familyMemberForm.age}
                                  onChange={(e) => handleFamilyMemberInputChange("age", e.target.value)}
                                  placeholder="Age"
                                  className="mt-1 h-9 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Occupation</Label>
                                <Input
                                  value={familyMemberForm.occupation}
                                  onChange={(e) => handleFamilyMemberInputChange("occupation", e.target.value)}
                                  placeholder="Occupation"
                                  className="mt-1 h-9 text-sm"
                                />
                              </div>
                              <div>
                                <Label className="text-xs font-medium text-gray-700">Phone</Label>
                                <Input
                                  value={familyMemberForm.phone}
                                  onChange={(e) => handleFamilyMemberInputChange("phone", e.target.value)}
                                  placeholder="Phone Number"
                                  className="mt-1 h-9 text-sm"
                                />
                              </div>
                            </div>
                            <Button type="button" onClick={addFamilyMember} size="sm" className="w-full">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Family Member
                            </Button>
                          </div>
                        </Card>

                        {/* Display Added Family Members */}
                        {registrationData.familyMembers.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-800">Added Family Members ({registrationData.familyMembers.length})</h4>
                            {registrationData.familyMembers.map((member) => (
                              <Card key={member.id} className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <h5 className="font-medium text-gray-900">{member.name}</h5>
                                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{member.relation}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-x-4">
                                      {member.age && <span>Age: {member.age}</span>}
                                      {member.occupation && <span>• {member.occupation}</span>}
                                      {member.phone && <span>• {member.phone}</span>}
                                    </div>
                                  </div>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => removeFamilyMember(member.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous
                          </Button>
                          <Button type="button" onClick={nextStep} className="px-8 py-2 bg-primary hover:bg-primary/90">
                            Next Step
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Business Details */}
                    {registrationStep === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <Building className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
                        </div>

                        <div>
                          <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">Occupation *</Label>
                          <Input
                            id="occupation"
                            value={registrationData.occupation}
                            onChange={(e) => handleRegistrationInputChange("occupation", e.target.value)}
                            placeholder="Current Occupation"
                            className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="employmentType" className="text-sm font-medium text-gray-700">Employment Type *</Label>
                          <Select value={registrationData.employmentType} onValueChange={(value) => handleRegistrationInputChange("employmentType", value)}>
                            <SelectTrigger className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary">
                              <SelectValue placeholder="Select Employment Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="business_owner">Business Owner</SelectItem>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="freelancer">Freelancer</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                              {registrationData.employmentType === "business_owner" ? "Business Name" : "Company Name"}
                            </Label>
                            <Input
                              id="companyName"
                              value={registrationData.companyName}
                              onChange={(e) => handleRegistrationInputChange("companyName", e.target.value)}
                              placeholder={registrationData.employmentType === "business_owner" ? "Business Name" : "Company/Organization Name"}
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                          </div>
                          <div>
                            <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
                              {registrationData.employmentType === "business_owner" ? "Business Role" : "Designation"}
                            </Label>
                            <Input
                              id="designation"
                              value={registrationData.designation}
                              onChange={(e) => handleRegistrationInputChange("designation", e.target.value)}
                              placeholder={registrationData.employmentType === "business_owner" ? "Owner/Founder/CEO" : "Job Title/Position"}
                              className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                            />
                          </div>
                        </div>

                        {registrationData.employmentType === "business_owner" && (
                          <>
                            <div>
                              <Label htmlFor="businessCategory" className="text-sm font-medium text-gray-700">Business Category</Label>
                              <Input
                                id="businessCategory"
                                value={registrationData.businessCategory}
                                onChange={(e) => handleRegistrationInputChange("businessCategory", e.target.value)}
                                placeholder="e.g., Technology, Healthcare, Retail"
                                className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                              />
                            </div>

                            <div>
                              <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-700">Business Description</Label>
                              <Textarea
                                id="businessDescription"
                                value={registrationData.businessDescription}
                                onChange={(e) => handleRegistrationInputChange("businessDescription", e.target.value)}
                                placeholder="Brief description of your business"
                                className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
                                rows={3}
                              />
                            </div>

                            <div>
                              <Label htmlFor="businessPhoto" className="text-sm font-medium text-gray-700">Business Photo</Label>
                              <div className="mt-1">
                                <input
                                  type="file"
                                  id="businessPhoto"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload("businessPhoto", e.target.files?.[0] || null)}
                                  className="hidden"
                                />
                                <Label 
                                  htmlFor="businessPhoto" 
                                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <Camera className="w-8 h-8 mb-2 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500">
                                      <span className="font-semibold">Click to upload</span> business photo
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                                    {registrationData.businessPhoto && (
                                      <p className="text-xs text-green-600 mt-2">
                                        ✓ {registrationData.businessPhoto.name}
                                      </p>
                                    )}
                                  </div>
                                </Label>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="businessAddress" className="text-sm font-medium text-gray-700">Business Address</Label>
                              <Textarea
                                id="businessAddress"
                                value={registrationData.businessAddress}
                                onChange={(e) => handleRegistrationInputChange("businessAddress", e.target.value)}
                                placeholder="Business Address"
                                className="mt-1 border-gray-200 focus:border-primary focus:ring-primary"
                                rows={2}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="businessCity" className="text-sm font-medium text-gray-700">Business City</Label>
                                <Input
                                  id="businessCity"
                                  value={registrationData.businessCity}
                                  onChange={(e) => handleRegistrationInputChange("businessCity", e.target.value)}
                                  placeholder="City"
                                  className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                                />
                              </div>
                              <div>
                                <Label htmlFor="businessState" className="text-sm font-medium text-gray-700">Business State</Label>
                                <Input
                                  id="businessState"
                                  value={registrationData.businessState}
                                  onChange={(e) => handleRegistrationInputChange("businessState", e.target.value)}
                                  placeholder="State"
                                  className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                                />
                              </div>
                              <div>
                                <Label htmlFor="businessPincode" className="text-sm font-medium text-gray-700">Business Pincode</Label>
                                <Input
                                  id="businessPincode"
                                  value={registrationData.businessPincode}
                                  onChange={(e) => handleRegistrationInputChange("businessPincode", e.target.value)}
                                  placeholder="Pincode"
                                  className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div className="flex justify-between pt-4">
                          <Button type="button" variant="outline" onClick={prevStep}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Previous
                          </Button>
                          <Button 
                            type="submit" 
                            disabled={loading || !registrationData.occupation || !registrationData.employmentType}
                            className="px-8 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Submit Registration
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
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