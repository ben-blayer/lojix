"use client";

import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { ROUTES } from '@/utils/constants';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
  fallbackPath?: string;
}

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
      <p className="text-lg text-gray-600 hebrew-font">טוען...</p>
    </motion.div>
  </div>
);

const UnauthorizedAccess: React.FC<{ onGoToAuth: () => void }> = ({ onGoToAuth }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8"
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 hebrew-font">גישה לא מורשית</h2>
      <p className="text-gray-600 mb-6 hebrew-font">אין לך הרשאה לגשת לעמוד זה. יש להתחבר תחילה.</p>
      <button
        onClick={onGoToAuth}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg hebrew-font transition-colors"
      >
        עבור לכניסה
      </button>
    </motion.div>
  </div>
);

const RoleAccessDenied: React.FC<{ userRole: UserRole; requiredRoles: UserRole[] }> = ({ userRole, requiredRoles }) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8"
    >
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 hebrew-font">אין הרשאה</h2>
      <p className="text-gray-600 mb-4 hebrew-font">
        התפקיד שלך ({userRole === 'student' ? 'תלמיד' : userRole === 'parent' ? 'הורה' : 'מנהל'}) 
        אינו מורשה לגשת לעמוד זה.
      </p>
      <p className="text-sm text-gray-500 mb-6 hebrew-font">
        נדרשים תפקידים: {requiredRoles.map(role => 
          role === 'student' ? 'תלמיד' : role === 'parent' ? 'הורה' : 'מנהל'
        ).join(', ')}
      </p>
      <button
        onClick={() => window.history.back()}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg hebrew-font transition-colors"
      >
        חזור אחורה
      </button>
    </motion.div>
  </div>
);

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  requireAuth = true,
  fallbackPath = ROUTES.auth
}) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if we're still loading
    if (isLoading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const redirectUrl = `${fallbackPath}?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirectUrl);
      return;
    }

    // If user is authenticated but doesn't have the required role
    if (isAuthenticated && user && allowedRoles && !allowedRoles.includes(user.role)) {
      // Don't redirect, just show access denied message
      return;
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, requireAuth, router, pathname, fallbackPath]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Show unauthorized if auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <UnauthorizedAccess onGoToAuth={() => router.push(fallbackPath)} />;
  }

  // Show role access denied if user doesn't have required role
  if (isAuthenticated && user && allowedRoles && !allowedRoles.includes(user.role)) {
    return <RoleAccessDenied userRole={user.role} requiredRoles={allowedRoles} />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};