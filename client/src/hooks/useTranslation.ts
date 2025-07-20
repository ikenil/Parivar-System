import { useAppContext } from "@/contexts/AppContext";

const translations = {
  en: {
    // Header
    "Bhikadiya Parivar": "Bhikadiya Parivar",
    "Family Management System": "Family Management System",
    "Admin User": "Admin User",
    
    // Navigation
    "Dashboard": "Dashboard",
    "Members": "Members",
    "Gallery": "Gallery",
    "Students": "Students",
    "Notifications": "Notifications",
    "Notices": "Notices",
    "Registration": "Registration",
    
    // Dashboard
    "Total Members": "Total Members",
    "Upcoming Events": "Upcoming Events",
    "Total Donations": "Total Donations",
    "Recent Activity": "Recent Activity",
    "Quick Actions": "Quick Actions",
    "Add Member": "Add Member",
    "Create Event": "Create Event",
    "Send Notice": "Send Notice",
    "Upload Photos": "Upload Photos",
    
    // Members
    "Members Management": "Members Management",
    "Search members...": "Search members...",
    "Member": "Member",
    "Family": "Family",
    "Location": "Location",
    "Status": "Status",
    "Actions": "Actions",
    "Active": "Active",
    "Pending": "Pending",
    
    // Gallery
    "Family Gallery": "Family Gallery",
    "All Years": "All Years",
    "All Events": "All Events",
    "Upload": "Upload",
    "Photos": "Photos",
    "View Gallery": "View Gallery",
    
    // Students
    "Student Achievements": "Student Achievements",
    "All Standards": "All Standards",
    "Upload Marksheet": "Upload Marksheet",
    "View Details": "View Details",
    
    // Registration
    "Member Registration": "Member Registration",
    "Personal Information": "Personal Information",
    "Family Information": "Family Information",
    "Business Information": "Business Information",
    "First Name": "First Name",
    "Last Name": "Last Name",
    "Date of Birth": "Date of Birth",
    "Gender": "Gender",
    "Email Address": "Email Address",
    "Phone Number": "Phone Number",
    "Father's Name": "Father's Name",
    "Family Branch": "Family Branch",
    "Current Address": "Current Address",
    "City": "City",
    "State": "State",
    "Occupation": "Occupation",
    "Business Category": "Business Category",
    "Company/Business Name": "Company/Business Name",
    "Submit Registration": "Submit Registration",
    "Cancel": "Cancel",
    
    // Notifications
    "Notifications & Notices": "Notifications & Notices",
    "Create Notice": "Create Notice",
    "Create New Notification": "Create New Notification",
    "Title": "Title",
    "Category": "Category",
    "Description": "Description",
    "Target Date": "Target Date",
    "Create Notification": "Create Notification",
    
    // Common
    "Role:": "Role:",
    "EN": "EN",
    "Previous": "Previous",
    "Next": "Next",
    "Edit": "Edit",
    "View": "View",
    "Delete": "Delete",
    "Close": "Close",
  },
  gu: {
    // Header
    "Bhikadiya Parivar": "ભિકડિયા પરિવાર",
    "Family Management System": "કુટુંબ વ્યવસ્થાપન સિસ્ટમ",
    "Admin User": "એડમિન વપરાશકર્તા",
    
    // Navigation
    "Dashboard": "ડેશબોર્ડ",
    "Members": "સભ્યો",
    "Gallery": "ગેલેરી",
    "Students": "વિદ્યાર્થીઓ",
    "Notifications": "સૂચનાઓ",
    "Notices": "સૂચનાઓ",
    "Registration": "નોંધણી",
    
    // Dashboard
    "Total Members": "કુલ સભ્યો",
    "Upcoming Events": "આગામી કાર્યક્રમો",
    "Total Donations": "કુલ દાન",
    "Recent Activity": "તાજેતરની પ્રવૃત્તિ",
    "Quick Actions": "ઝડપી ક્રિયાઓ",
    "Add Member": "સભ્ય ઉમેરો",
    "Create Event": "કાર્યક્રમ બનાવો",
    "Send Notice": "સૂચના મોકલો",
    "Upload Photos": "ફોટા અપલોડ કરો",
    
    // Members
    "Members Management": "સભ્યો વ્યવસ્થાપન",
    "Search members...": "સભ્યોને શોધો...",
    "Member": "સભ્ય",
    "Family": "કુટુંબ",
    "Location": "સ્થળ",
    "Status": "સ્થિતિ",
    "Actions": "ક્રિયાઓ",
    "Active": "સક્રિય",
    "Pending": "પેન્ડિંગ",
    
    // Gallery
    "Family Gallery": "કુટુંબ ગેલેરી",
    "All Years": "તમામ વર્ષ",
    "All Events": "તમામ કાર્યક્રમો",
    "Upload": "અપલોડ",
    "Photos": "ફોટા",
    "View Gallery": "ગેલેરી જુઓ",
    
    // Students
    "Student Achievements": "વિદ્યાર્થીઓની સિદ્ધિઓ",
    "All Standards": "તમામ ધોરણ",
    "Upload Marksheet": "માર્કશીટ અપલોડ કરો",
    "View Details": "વિગતો જુઓ",
    
    // Registration
    "Member Registration": "સભ્ય નોંધણી",
    "Personal Information": "વ્યક્તિગત માહિતી",
    "Family Information": "કુટુંબની માહિતી",
    "Business Information": "વ્યવસાયની માહિતી",
    "First Name": "પ્રથમ નામ",
    "Last Name": "છેલ્લું નામ",
    "Date of Birth": "જન્મ તારીખ",
    "Gender": "લિંગ",
    "Email Address": "ઈમેલ સરનામું",
    "Phone Number": "ફોન નંબર",
    "Father's Name": "પિતાનું નામ",
    "Family Branch": "કુટુંબની શાખા",
    "Current Address": "વર્તમાન સરનામું",
    "City": "શહેર",
    "State": "રાજ્ય",
    "Occupation": "વ્યવસાય",
    "Business Category": "વ્યવસાયની શ્રેણી",
    "Company/Business Name": "કંપની/વ્યવસાયનું નામ",
    "Submit Registration": "નોંધણી સબમિટ કરો",
    "Cancel": "રદ કરો",
    
    // Notifications
    "Notifications & Notices": "સૂચનાઓ અને નોટિસ",
    "Create Notice": "નોટિસ બનાવો",
    "Create New Notification": "નવી સૂચના બનાવો",
    "Title": "શીર્ષક",
    "Category": "શ્રેણી",
    "Description": "વર્ણન",
    "Target Date": "લક્ષ્ય તારીખ",
    "Create Notification": "સૂચના બનાવો",
    
    // Common
    "Role:": "ભૂમિકા:",
    "EN": "ગુ",
    "Previous": "પહેલાનું",
    "Next": "આગળ",
    "Edit": "સંપાદિત કરો",
    "View": "જુઓ",
    "Delete": "ડિલીટ કરો",
    "Close": "બંધ કરો",
  },
};

export function useTranslation() {
  const { language } = useAppContext();

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return { t };
}
