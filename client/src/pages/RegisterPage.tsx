import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Users } from "lucide-react";

export default function RegisterPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/login")}
            className="mb-6 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Users className="h-10 w-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bhikadiya Parivar</h1>
                <p className="text-gray-600">Family Management System</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">New Member Registration</h2>
            <p className="text-gray-600 mt-2">Join our family by completing the registration process</p>
          </div>
        </div>

        {/* Registration Form */}
        <RegistrationForm />
      </div>
    </div>
  );
}