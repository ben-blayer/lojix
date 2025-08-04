"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, Target, Trophy } from 'lucide-react';
import { Student } from '@/types';

interface StudentStatsProps {
  student: Student;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay }}
  >
    <Card className={`card-hover border-0 shadow-lg ${gradient} text-white`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 hebrew-font">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const StudentStats: React.FC<StudentStatsProps> = ({ student }) => {
  const stats = [
    {
      title: "סך נקודות",
      value: student.total_points,
      icon: <Star className="w-8 h-8 text-yellow-300" />,
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      delay: 0.1
    },
    {
      title: "ימים רצופים", 
      value: student.streak_days,
      icon: <Clock className="w-8 h-8 text-green-200" />,
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
      delay: 0.2
    },
    {
      title: "רמה נוכחית",
      value: student.current_level,
      icon: <Target className="w-8 h-8 text-purple-200" />,
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600", 
      delay: 0.3
    },
    {
      title: "תגי הישגים",
      value: student.badges?.length || 0,
      icon: <Trophy className="w-8 h-8 text-orange-200" />,
      gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};