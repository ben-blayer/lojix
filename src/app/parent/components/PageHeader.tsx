"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export const PageHeader: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-8"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
        <Users className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-bold gradient-text hebrew-font">
          לוח בקרה הורים
        </h1>
        <p className="text-gray-600 hebrew-font mt-2">
          עקוב אחר התקדמות הילדים שלך
        </p>
      </div>
    </div>
  </motion.div>
);