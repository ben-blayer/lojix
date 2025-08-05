"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES, ROLE_REDIRECT_MAP } from '@/utils/constants';

export default function Home() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect authenticated users to their role-specific page
        const redirectPath = ROLE_REDIRECT_MAP[user.role];
        router.push(redirectPath);
      } else {
        // Redirect unauthenticated users to auth page
        router.push(ROUTES.auth);
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  // Show loading while determining redirect
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.h1 
          className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Lojix
        </motion.h1>
        <p className="text-gray-600 hebrew-font text-lg mb-8">פלטפורמת הלמידה החכמה שלך</p>
        
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"
        />
        
        <p className="text-gray-500 hebrew-font mt-4">טוען...</p>
      </motion.div>
    </div>
  );
}
