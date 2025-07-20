import { ReactNode } from "react";
import { useAppContext, UserRole } from "@/contexts/AppContext";

interface RoleBasedWrapperProps {
  allowedRoles: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleBasedWrapper({ allowedRoles, children, fallback = null }: RoleBasedWrapperProps) {
  const { userRole } = useAppContext();

  if (!allowedRoles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
