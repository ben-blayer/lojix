"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface StudentHeaderProps {
  studentName: string;
  motivationalMessage: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ studentName, motivationalMessage }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
              שלום {studentName || "תלמיד"}!
            </h1>
            <p className="text-gray-600 hebrew-font mt-2">
              {motivationalMessage}
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2 hebrew-font"
        >
          <LogOut className="w-4 h-4" />
          יציאה
        </Button>
      </div>
    </motion.div>
  );
};