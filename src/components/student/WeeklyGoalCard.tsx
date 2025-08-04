"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { WeeklyGoal } from '@/types';

interface WeeklyGoalCardProps {
  weeklyGoal: WeeklyGoal;
}

export const WeeklyGoalCard: React.FC<WeeklyGoalCardProps> = ({ weeklyGoal }) => {
  const progressPercentage = (weeklyGoal.current / weeklyGoal.target) * 100;
  const remainingPoints = weeklyGoal.target - weeklyGoal.current;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 hebrew-font">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            יעד השבוע
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 hebrew-font">
                התקדמות השבוע
              </span>
              <span className="font-bold text-blue-600">
                {weeklyGoal.current}/{weeklyGoal.target} נקודות
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-3"
            />
            <p className="text-sm text-gray-500 hebrew-font">
              עוד {remainingPoints} נקודות להשגת היעד השבועי!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};