"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WeeklyProgressData } from '@/types';

interface WeeklyProgressChartProps {
  data: WeeklyProgressData[];
}

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.7 }}
  >
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="hebrew-font">התקדמות שבועית</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="exercises" fill="#3B82F6" name="תרגילים" />
            <Bar dataKey="points" fill="#10B981" name="נקודות" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </motion.div>
);