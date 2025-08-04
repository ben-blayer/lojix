"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ExerciseHeaderProps {
  exerciseCount: number;
}

export const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ exerciseCount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <BookOpen className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
          תרגילי מתמטיקה
        </h1>
        <p className="text-gray-600 hebrew-font mt-2">
          {exerciseCount} תרגילים מחכים לך!
        </p>
      </div>
    </div>
  </motion.div>
);