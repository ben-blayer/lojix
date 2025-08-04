"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Trophy, Target } from 'lucide-react';
import { ChildData } from '@/types';

interface ParentDashboardStatsProps {
  child: ChildData;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
  >
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-sm font-medium ${color} hebrew-font`}>{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const ParentDashboardStats: React.FC<ParentDashboardStatsProps> = ({ child }) => {
  const weeklyProgress = (child.weekly_goal.current / child.weekly_goal.target) * 100;

  const stats = [
    {
      title: "נקודות השבוע",
      value: child.weekly_goal.current,
      icon: <Star className="w-6 h-6 text-yellow-600" />,
      color: "text-yellow-600",
      delay: 0.1
    },
    {
      title: "ימים רצופים",
      value: child.streak_days,
      icon: <Clock className="w-6 h-6 text-green-600" />,
      color: "text-green-600", 
      delay: 0.2
    },
    {
      title: "רמה נוכחית",
      value: child.current_level,
      icon: <Target className="w-6 h-6 text-blue-600" />,
      color: "text-blue-600",
      delay: 0.3
    },
    {
      title: "תגי הישגים",
      value: child.badges.length,
      icon: <Trophy className="w-6 h-6 text-purple-600" />,
      color: "text-purple-600",
      delay: 0.4
    }
  ];

  return (
    <div className="space-y-6">
      {/* Child Info Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl shadow-lg">
            {child.avatar}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 hebrew-font">{child.name}</h2>
            <p className="text-gray-600 hebrew-font">כיתה {child.grade} • פעילות אחרונה: {child.last_activity}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Weekly Goal Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="hebrew-font">יעד השבוע</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 hebrew-font">התקדמות</span>
                <span className="font-bold">
                  {child.weekly_goal.current}/{child.weekly_goal.target} נקודות
                </span>
              </div>
              <Progress value={weeklyProgress} className="h-3" />
              <p className="text-sm text-gray-500 hebrew-font">
                {weeklyProgress >= 100 
                  ? "יעד השבוע הושג! 🎉" 
                  : `עוד ${child.weekly_goal.target - child.weekly_goal.current} נקודות להשגת היעד`
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Badges */}
      {child.badges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="hebrew-font">תגי הישגים</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {child.badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 hebrew-font"
                  >
                    🏆 {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};