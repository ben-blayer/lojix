"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface StudentHeaderProps {
  studentName: string;
  motivationalMessage: string;
}

export const StudentHeader: React.FC<StudentHeaderProps> = ({ studentName, motivationalMessage }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
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
  </motion.div>
);