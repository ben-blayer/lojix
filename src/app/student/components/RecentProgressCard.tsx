"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Award } from 'lucide-react';
import { RecentProgress } from '@/types';
import { generateUniqueKey } from '@/utils/helpers';

interface RecentProgressCardProps {
  progress: RecentProgress[];
}

export const RecentProgressCard: React.FC<RecentProgressCardProps> = ({ progress }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6 }}
  >
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 hebrew-font">
          <Award className="w-5 h-5 text-green-500" />
          הישגים אחרונים
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progress.map((item, index) => (
            <div
              key={generateUniqueKey('progress', item.subject, index)}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium hebrew-font">{item.subject}</p>
                  <p className="text-sm text-gray-500 hebrew-font">{item.date}</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {item.score}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);