import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Users, 
  Building, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Camera,
  UserPlus,
  ArrowLeft
} from "lucide-react";

export function RegistrationForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
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
    familyMembers: [] as Array<{
      id: number;
      name: string;
      relation: string;
      age: string;
      occupation: string;
      phone: string;
    }>,
    
    // Business Details (Step 3)
    occupation: "",
    employmentType: "",
    companyName: "",
    designation: "",
    businessCategory: "",
    businessDescription: "",
    businessPhoto: null as File | null,
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
  });

  const [familyMemberForm, setFamilyMemberForm] = useState({
    name: "",
    relation: "",
    age: "",
    occupation: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registration Submitted",
        description: "Your registration has been submitted successfully. We'll review and get back to you soon.",
      });
      
      // Reset form and navigate back to login
      setFormData({
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
        familyMembers: [] as Array<{
          id: number;
          name: string;
          relation: string;
          age: string;
          occupation: string;
          phone: string;
        }>,
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
      setCurrentStep(1);
      
      // Navigate to login page after successful registration
      setTimeout(() => {
        setLocation("/login");
      }, 2000);
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
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
      setFormData(prev => ({
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
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.filter(member => member.id !== id)
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = () => {
    return formData.firstName && 
           formData.lastName && 
           formData.email && 
           formData.phone && 
           formData.dateOfBirth &&
           formData.gender &&
           formData.fatherName &&
           formData.address &&
           formData.city &&
           formData.state;
  };

  const getProgressPercentage = () => {
    return ((currentStep - 1) / 2) * 100;
  };

  return (
    <Card className="shadow-lg border border-gray-200 bg-white">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>Step {currentStep} of 3</span>
              <span>{Math.round(getProgressPercentage())}% Complete</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span className={currentStep === 1 ? "text-primary font-medium" : ""}>Personal Details</span>
              <span className={currentStep === 2 ? "text-primary font-medium" : ""}>Family Members</span>
              <span className={currentStep === 3 ? "text-primary font-medium" : ""}>Business Details</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="First Name"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
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
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
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
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange("fatherName", e.target.value)}
                      placeholder="Father's Full Name"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="motherName" className="text-sm font-medium text-gray-700">Mother's Name</Label>
                    <Input
                      id="motherName"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange("motherName", e.target.value)}
                      placeholder="Mother's Full Name"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maritalStatus" className="text-sm font-medium text-gray-700">Marital Status</Label>
                    <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange("maritalStatus", value)}>
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
                      value={formData.spouseName}
                      onChange={(e) => handleInputChange("spouseName", e.target.value)}
                      placeholder="Spouse Full Name"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="familyBranch" className="text-sm font-medium text-gray-700">Family Branch *</Label>
                  <Input
                    id="familyBranch"
                    value={formData.familyBranch}
                    onChange={(e) => handleInputChange("familyBranch", e.target.value)}
                    placeholder="Family Branch/Group"
                    className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
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
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-gray-700">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
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
                    className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next Step
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Family Members */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-5 w-5 text-blue-600" />
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
                {formData.familyMembers.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-800">Added Family Members ({formData.familyMembers.length})</h4>
                    {formData.familyMembers.map((member) => (
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
                  <Button type="button" onClick={nextStep} className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white">
                    Next Step
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Business Details */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
                </div>

                <div>
                  <Label htmlFor="occupation" className="text-sm font-medium text-gray-700">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={(e) => handleInputChange("occupation", e.target.value)}
                    placeholder="Current Occupation"
                    className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="employmentType" className="text-sm font-medium text-gray-700">Employment Type *</Label>
                  <Select value={formData.employmentType} onValueChange={(value) => handleInputChange("employmentType", value)}>
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
                      {formData.employmentType === "business_owner" ? "Business Name" : "Company Name"}
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder={formData.employmentType === "business_owner" ? "Business Name" : "Company/Organization Name"}
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="designation" className="text-sm font-medium text-gray-700">
                      {formData.employmentType === "business_owner" ? "Business Role" : "Designation"}
                    </Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      placeholder={formData.employmentType === "business_owner" ? "Owner/Founder/CEO" : "Job Title/Position"}
                      className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>

                {formData.employmentType === "business_owner" && (
                  <>
                    <div>
                      <Label htmlFor="businessCategory" className="text-sm font-medium text-gray-700">Business Category</Label>
                      <Input
                        id="businessCategory"
                        value={formData.businessCategory}
                        onChange={(e) => handleInputChange("businessCategory", e.target.value)}
                        placeholder="e.g., Technology, Healthcare, Retail"
                        className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessDescription" className="text-sm font-medium text-gray-700">Business Description</Label>
                      <Textarea
                        id="businessDescription"
                        value={formData.businessDescription}
                        onChange={(e) => handleInputChange("businessDescription", e.target.value)}
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
                            {formData.businessPhoto && (
                              <p className="text-xs text-green-600 mt-2">
                                ✓ {formData.businessPhoto.name}
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
                        value={formData.businessAddress}
                        onChange={(e) => handleInputChange("businessAddress", e.target.value)}
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
                          value={formData.businessCity}
                          onChange={(e) => handleInputChange("businessCity", e.target.value)}
                          placeholder="City"
                          className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessState" className="text-sm font-medium text-gray-700">Business State</Label>
                        <Input
                          id="businessState"
                          value={formData.businessState}
                          onChange={(e) => handleInputChange("businessState", e.target.value)}
                          placeholder="State"
                          className="mt-1 h-10 border-gray-200 focus:border-primary focus:ring-primary"
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessPincode" className="text-sm font-medium text-gray-700">Business Pincode</Label>
                        <Input
                          id="businessPincode"
                          value={formData.businessPincode}
                          onChange={(e) => handleInputChange("businessPincode", e.target.value)}
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
                    disabled={loading || !formData.occupation || !formData.employmentType}
                    className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white"
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
      </CardContent>
    </Card>
  );
}


