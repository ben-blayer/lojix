"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubjectProgressData } from '@/types';

interface SubjectProgressChartProps {
  data: SubjectProgressData[];
}

export const SubjectProgressChart: React.FC<SubjectProgressChartProps> = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 }}
  >
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="hebrew-font">התקדמות לפי נושא</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium hebrew-font">{subject.subject}</span>
                <span className="text-sm font-medium">{subject.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${subject.progress}%`,
                    backgroundColor: subject.fill
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);