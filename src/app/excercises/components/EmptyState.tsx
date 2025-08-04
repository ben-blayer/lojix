"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export const EmptyState: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-600 hebrew-font mb-2">
      לא נמצאו תרגילים
    </h3>
    <p className="text-gray-500 hebrew-font">
      נסה לשנות את הפילטרים או לחפש משהו אחר
    </p>
  </motion.div>
);