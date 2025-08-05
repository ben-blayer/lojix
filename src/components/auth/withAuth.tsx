"use client";

import React from 'react';
import { ProtectedRoute } from './ProtectedRoute';
import { UserRole } from '@/types';

interface WithAuthOptions {
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
  fallbackPath?: string;
}

/**
 * Higher-order component that wraps a component with authentication protection
 */
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) => {
  const {
    allowedRoles,
    requireAuth = true,
    fallbackPath
  } = options;

  const WithAuthComponent: React.FC<P> = (props) => {
    return (
      <ProtectedRoute
        allowedRoles={allowedRoles}
        requireAuth={requireAuth}
        fallbackPath={fallbackPath}
      >
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };

  // Set display name for debugging
  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithAuthComponent;
};

// Convenience wrappers for common protection patterns
export const withStudentAuth = <P extends object>(component: React.ComponentType<P>) =>
  withAuth(component, { allowedRoles: ['student'] });

export const withParentAuth = <P extends object>(component: React.ComponentType<P>) =>
  withAuth(component, { allowedRoles: ['parent'] });

export const withAdminAuth = <P extends object>(component: React.ComponentType<P>) =>
  withAuth(component, { allowedRoles: ['admin'] });

export const withStudentOrParentAuth = <P extends object>(component: React.ComponentType<P>) =>
  withAuth(component, { allowedRoles: ['student', 'parent'] });

export const withAnyAuth = <P extends object>(component: React.ComponentType<P>) =>
  withAuth(component, { allowedRoles: ['student', 'parent', 'admin'] });